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
     * This method takes in an artist's name and returns information
     * about that artist.
     *
     * @param artistName - name of artist to retun info about
     * @returns {Artist} - artist information
     */
    async getArtistByName(artistName: string): Promise<Artist> {
        this.logger.info(`getting artist with name ${artistName}`);

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
        const artistResult: ArtistResponseDto = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body.artists[0];

        // get the image link
        artistResult.links.images.href = await this.getImageLink(
            artistResult.links.images.href
        );

        // convert album ids to album names
        const albums: Set<string> = new Set();
        await Promise.all(
            artistResult.albumGroups.main.map(async albumId => {
                const albumName: string = (await this.getAlbumById(albumId)).name.replace(
                    'XX',
                    ''
                );
                albums.add(albumName);
            })
        );

        artistResult.albumGroups.main = Array.from(albums);

        // convert raw response to Artist model
        const artist: Artist = new ArtistMapper().toModel(artistResult);

        return artist;
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
        const trackResults: TrackResponseDto[] = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body.search.data.tracks;

        const tracks: Track[] = [];

        await Promise.all(
            trackResults.map(async trackResult => {
                // get release date from album
                trackResult.releaseDate = (
                    await this.getAlbumById(trackResult.albumId)
                ).originallyReleased;

                // convert genre ids to genre names
                trackResult.links.genres.names = [];
                await Promise.all(
                    trackResult.links.genres.ids.map(async genreId => {
                        const genreName = (await this.getGenreById(genreId)).name;
                        trackResult.links.genres.names.push(genreName);
                    })
                );

                // convert raw response to Track model
                const track: Track = new TrackMapper().toModel(trackResult);
                tracks.push(track);
            })
        );

        return tracks;
    }

    /**
     * This method gets an album information based on the id passed in.
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
}
