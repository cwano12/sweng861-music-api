import { MusicRequestOptions } from '../util/request/types/music-request-options';
import { RequestWrapper } from '../util/request/request.wrapper';
import { UrlBuilder } from '../util/url.builder';
import { AppLogger } from '../util/logging/app.logger';
import { Artist } from './artists/artist';
import { MUSIC } from '../config/music.constants';
import { Track } from './tracks/track';
import { ArtistResponseDto } from './artists/dto/artist-response.dto';
import { ArtistMapper } from './artists/artist.mapper';
import { Album } from './types/album';
import { Image } from './types/image';
import { TrackResponseDto } from './tracks/dto/track-response.dto';
import { Genre } from './types/genre';
import { TrackMapper } from './tracks/track.mapper';

/**
 * service for interacting with Napster API; returns tracks and artists based on user input
 * @class
 *
 * @member {AppLogger} logger - logger for this class
 * @member {RequestWrapper} requestWrapper - utility wrapper class to handle sending requests
 * @member {UrlBuilder} urlBuilder - utility class to help construct urls
 * @member {MusicRequestOptions} options - request options to send to Napster API via request-promise-native
 */
export class MusicService {
    logger: AppLogger;

    requestWrapper: RequestWrapper;

    urlBuilder: UrlBuilder;

    options: MusicRequestOptions = {
        method: 'GET',
        uri: '',
        resolveWithFullResponse: true, // get full body of response
        json: true // ensure resonse from Napster is in JSON format
    };

    constructor() {
        this.logger = new AppLogger(this.constructor.name);
        this.requestWrapper = new RequestWrapper();
        this.urlBuilder = new UrlBuilder();
    }

    /**
     * This method takes in an artist's name and returns a list of
     * information about artists that match that name.
     *
     * @param artistName - name of artist to retun info about
     * @returns {Artist[]} - list of artist information
     */
    async getArtistByName(artistName: string): Promise<Artist[]> {
        this.logger.info(`getting artist with name ${artistName}`);
        const artists: Artist[] = [];

        // format artist name to include hyphens (this is expected by Napster API)
        const formattedName: string = artistName.split(' ').join('-');

        const artistsUrl: string = this.urlBuilder.getUrl(
            MUSIC.HOST,
            MUSIC.BASE_PATH,
            MUSIC.ARTISTS_URL,
            formattedName.toLowerCase(),
            `?apikey=${MUSIC.API_KEY}`
        );

        this.options.uri = artistsUrl;

        // pass a custom error message to request wrapper in the event of a failure
        const customErrorMessage: string = `failed to get artist with name ${artistName}`;

        // get raw response from Napster
        const results = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body;

        if (results.artists) {
            const artistResults: ArtistResponseDto[] = results.artists;

            await Promise.all(
                artistResults.map(async artistResult => {
                    // get the image link
                    artistResult.links.images.href = await this.getImageLink(
                        artistResult.links.images.href
                    );

                    // convert album ids to album names
                    const albums: Set<string> = new Set();
                    if (artistResult.albumGroups && artistResult.albumGroups.main) {
                        await Promise.all(
                            artistResult.albumGroups.main.map(async albumId => {
                                const albumName: string = (
                                    await this.getAlbumById(albumId)
                                ).name.replace('XX', '');
                                albums.add(albumName);
                            })
                        );
                    }

                    artistResult.albumGroups.main = Array.from(albums);
                    // convert raw response to Artist model
                    const artist: Artist = new ArtistMapper().toModel(artistResult);
                    artists.push(artist);
                })
            );
        }

        return artists;
    }

    /**
     * This method takes in a song title and returns a list of tracks
     * matching that title.
     *
     * @param trackName - name of song to search for
     * @returns {Track[]} - list of tracks matching song title
     */
    async getTracksByName(trackName: string): Promise<Track[]> {
        this.logger.info(`getting tracks matching song title ${trackName}`);

        const trackResults: TrackResponseDto[][] = (
            await this.getTrackResults(trackName)
        ).map(batch => batch.filter(track => track.name.toLocaleLowerCase() === trackName));

        const tracks: Track[] = await this.mapTrackProperties(trackResults);

        return tracks;
    }

    /**
     * This method takes in a song title and an artist name and returns a list of tracks
     * matching that title and artist.
     *
     * @param {string} trackName - name of song to search for
     * @param {string} artistName - name of artist of song to search for
     * @returns {Track[]} - list of tracks matching song title and artist name
     */
    async getTracksByNameAndArtist(trackName: string, artistName: string): Promise<Track[]> {
        this.logger.info(
            `getting tracks matching song title ${trackName} and artist ${artistName}`
        );

        const trackResults: TrackResponseDto[][] = (
            await this.getTrackResults(trackName)
        ).map(batch =>
            batch.filter(
                track =>
                    track.name.toLocaleLowerCase() === trackName &&
                    track.artistName === artistName
            )
        );

        const tracks: Track[] = await this.mapTrackProperties(trackResults);

        return tracks;
    }

    /**
     * This method takes in a song title and returns the raw track results from Napster
     * in batches.
     *
     * @param {string} trackName - title of song to search for
     * @returns {TrackResponseDto[][]} - batches of raw track results from Napster
     */
    private async getTrackResults(trackName: string): Promise<TrackResponseDto[][]> {
        // hold tracks in batches of 20
        const trackResults: TrackResponseDto[][] = [];

        const tracksUrl: string = this.urlBuilder.getUrl(
            MUSIC.HOST,
            MUSIC.BASE_PATH,
            '/search',
            `?apikey=${MUSIC.API_KEY}`,
            `&query=${trackName}&type=track`
        );

        this.options.uri = tracksUrl;

        // pass a custom error message to request wrapper in the event of a failure
        const customErrorMessage: string = `failed to get track with name ${trackName}`;

        // get raw response from Napster
        const results = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body;

        // get total count
        const count: number = results.meta.totalCount;

        // get results from initial query
        trackResults.push(results.search.data.tracks as TrackResponseDto[]);
        // paginate through the rest of the results and add them
        trackResults.push(
            ...((await this.paginateTrackResults(
                count,
                customErrorMessage,
                tracksUrl
            )) as TrackResponseDto[][])
        );

        return trackResults;
    }

    /**
     * This method maps raw track results to formatted track results.
     *
     * @param {TrackResponseDto[][]} trackBatches - batches of raw track results
     * @returns {Track[]} - list of formatted tracks
     */
    private async mapTrackProperties(trackBatches: TrackResponseDto[][]): Promise<Track[]> {
        const tracks: Track[] = [];

        // loop through each track in each batch and map genre and album information
        await Promise.all(
            // process no more than MUSIC.MAX_REUSLTS
            trackBatches.slice(0, MUSIC.MAX_RESULTS).map(async batch => {
                await Promise.all(
                    batch.map(async trackResult => {
                        // get release date from album
                        trackResult.releaseDate = (
                            await this.getAlbumById(trackResult.albumId)
                        ).originallyReleased;

                        // convert genre ids to genre names
                        if (trackResult.links.genres) {
                            trackResult.links.genres.names = [];
                            if (trackResult.links.genres && trackResult.links.genres.ids) {
                                await Promise.all(
                                    trackResult.links.genres.ids.map(async genreId => {
                                        const genreName = (await this.getGenreById(genreId))
                                            .name;
                                        (trackResult.links.genres as any).names.push(
                                            genreName
                                        );
                                    })
                                );
                            }
                        }

                        // convert raw response to Track model
                        const track: Track = new TrackMapper().toModel(trackResult);
                        tracks.push(track);
                    })
                );
            })
        );

        return tracks;
    }

    /**
     * This method gets album information based on the id passed in.
     *
     * @param albumId - id of the album to lookup
     */
    async getAlbumById(albumId: string): Promise<Album> {
        const albumUrl: string = this.urlBuilder.getUrl(
            MUSIC.HOST,
            MUSIC.BASE_PATH,
            MUSIC.ALBUMS_URL,
            albumId,
            `?apikey=${MUSIC.API_KEY}`
        );

        this.options.uri = albumUrl;

        // pass a custom error message to request wrapper in the event of a failure
        const customErrorMessage: string = `failed to get album with id ${albumId}`;

        const album: Album = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body.albums[0];
        return album;
    }

    /**
     * This method uses an images reference url to get a link for one image. The
     * reference url passed in will return a list of images; return the link to the
     * first one.
     *
     * @param imagesUrl - images reference url
     */
    async getImageLink(imagesUrl: string): Promise<string> {
        const url: string = this.urlBuilder.getUrl(imagesUrl, `?apikey=${MUSIC.API_KEY}`);
        this.options.uri = url;

        // pass a custom error message to request wrapper in the event of a failure
        const customErrorMessage: string = 'failed to get image';

        const image: Image = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body.images[0];

        // return a url if it exists, else return empty string
        if (image) {
            return image.url;
        }

        return '';
    }

    /**
     * This method gets genre information based on the id
     * passed in.
     *
     * @param genreId - id of the genre to lookup
     */
    async getGenreById(genreId: string): Promise<Genre> {
        const genresUrl: string = this.urlBuilder.getUrl(
            MUSIC.HOST,
            MUSIC.BASE_PATH,
            MUSIC.GENRES_URL,
            genreId,
            `?apikey=${MUSIC.API_KEY}`
        );

        this.options.uri = genresUrl;

        // pass a custom error message to request wrapper in the event of a failure
        const customErrorMessage: string = `failed to get genre with id ${genreId}`;

        const genre: Genre = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body.genres[0];

        return genre;
    }

    /**
     * This method paginates through all track results and returns the results
     * in batches with size of MUSIC.LIMIT.  This is necessary because Napster
     * only returns no more than 20 results at a time.
     *
     * @param {number} count - total count returned from original query
     * @param {string} customErrorMessage - error message to pass to request wrapper in the event of failure
     * @param {string} musicUrl - track url from original query
     */
    private async paginateTrackResults(
        count: number,
        customErrorMessage: string,
        musicUrl: string
    ): Promise<TrackResponseDto[][] | ArtistResponseDto[][]> {
        const results: any[][] = [];

        if (count > MUSIC.LIMIT) {
            let offset = MUSIC.LIMIT;
            while (offset < count) {
                const url = this.urlBuilder.getUrl(
                    musicUrl,
                    `&${MUSIC.LIMIT_QUERY}${MUSIC.LIMIT}&`,
                    `${MUSIC.OFFSET_QUERY}${offset}`
                );

                this.options.uri = url;

                const offsetResults = (
                    await this.requestWrapper.sendRequest(this.options, customErrorMessage)
                ).body;

                if (offsetResults.search) {
                    results.push(offsetResults.search.data.tracks as TrackResponseDto[]);
                }

                offset += MUSIC.LIMIT;
            }
        }

        return results;
    }
}
