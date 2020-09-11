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
 * Sample app service
 * @class
 *
 * @member {BotRegistry} registry - registry for interacting with keyvault-stored bot secrets
 * @member {RequestWrapper} requestWrapper - utility wrapper class to handle sending requests
 */
export class MusicService {
    logger: AppLogger;

    requestWrapper: RequestWrapper;

    urlBuilder: UrlBuilder;

    options: MusicRequestOptions = {
        method: 'GET',
        uri: '',
        resolveWithFullResponse: true,
        json: true
    };

    constructor() {
        this.logger = new AppLogger(this.constructor.name);
        this.requestWrapper = new RequestWrapper();
        this.urlBuilder = new UrlBuilder();
    }

    async getArtist(artistName: string): Promise<any> {
        const artistsUrl: string = this.urlBuilder.getUrl(
            MUSIC.HOST,
            MUSIC.BASE_PATH,
            MUSIC.ARTISTS_URL,
            artistName.toLowerCase(),
            `?apikey=${MUSIC.API_KEY}`
        );

        this.options.uri = artistsUrl;
        const customErrorMessage: string = `failed to get artist with name ${artistName}`;

        const artistResult: ArtistResponseDto = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body.artists[0];

        artistResult.links.images.href = (
            await this.getImage(artistResult.links.images.href)
        ).url;
        const albums: Set<string> = new Set();
        await Promise.all(
            artistResult.albumGroups.main.map(async albumId => {
                const albumName: string = (await this.getAlbum(albumId)).name.replace(
                    'XX',
                    ''
                );
                albums.add(albumName);
            })
        );

        artistResult.albumGroups.main = Array.from(albums);

        const artist: Artist = new ArtistMapper().toModel(artistResult);

        return artist;
    }

    async getTracksByName(trackName: string): Promise<Track[]> {
        const tracksUrl: string = this.urlBuilder.getUrl(
            MUSIC.HOST,
            MUSIC.BASE_PATH,
            '/search',
            `?apikey=${MUSIC.API_KEY}`,
            `&query=${trackName}&type=track`
        );

        this.options.uri = tracksUrl;
        const customErrorMessage: string = `failed to get track with name ${trackName}`;

        const trackResults: TrackResponseDto[] = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body.search.data.tracks;

        const tracks: Track[] = [];

        await Promise.all(
            trackResults.map(async trackResult => {
                trackResult.releaseDate = (
                    await this.getAlbum(trackResult.albumId)
                ).originallyReleased;
                trackResult.links.genres.names = [];
                await Promise.all(
                    trackResult.links.genres.ids.map(async genreId => {
                        const genreName = (await this.getGenre(genreId)).name;
                        trackResult.links.genres.names.push(genreName);
                    })
                );
                const track: Track = new TrackMapper().toModel(trackResult);
                tracks.push(track);
            })
        );

        return tracks;
    }

    async getAlbum(albumId: string): Promise<Album> {
        const albumUrl: string = this.urlBuilder.getUrl(
            MUSIC.HOST,
            MUSIC.BASE_PATH,
            MUSIC.ALBUMS_URL,
            albumId,
            `?apikey=${MUSIC.API_KEY}`
        );

        this.options.uri = albumUrl;
        const customErrorMessage: string = `failed to get album with id ${albumId}`;

        const album: Album = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body.albums[0];
        return album;
    }

    async getImage(imagesUrl: string): Promise<Image> {
        const url: string = this.urlBuilder.getUrl(imagesUrl, `?apikey=${MUSIC.API_KEY}`);
        this.options.uri = url;
        const customErrorMessage: string = 'failed to get image';

        const image: Image = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body.images[0];

        return image;
    }

    async getGenre(genreId: string): Promise<Genre> {
        const genresUrl: string = this.urlBuilder.getUrl(
            MUSIC.HOST,
            MUSIC.BASE_PATH,
            MUSIC.GENRES_URL,
            genreId,
            `?apikey=${MUSIC.API_KEY}`
        );

        this.options.uri = genresUrl;
        const customErrorMessage: string = `failed to get genre with id ${genreId}`;

        const genre: Genre = (
            await this.requestWrapper.sendRequest(this.options, customErrorMessage)
        ).body.genres[0];
        return genre;
    }
}

const service = new MusicService();
// eslint-disable-next-line no-console
//service.getArtist('jay-z').then(console.log);
service.getTracksByName('the takeover').then(console.log);
