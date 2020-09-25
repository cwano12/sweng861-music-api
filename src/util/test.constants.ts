import { Exception } from '@tsed/exceptions';
import { Artist } from '../music/artists/artist';
import { ArtistResponseDto } from '../music/artists/dto/artist-response.dto';
import { TrackResponseDto } from '../music/tracks/dto/track-response.dto';
import { Track } from '../music/tracks/track';
import { Album } from '../music/types/album';
import { Bio } from '../music/types/bio';
import { Genre } from '../music/types/genre';
import { Image } from '../music/types/image';
import { MusicRequestOptions } from './request/types/music-request-options';

// request info
export const TEST_URL: string = 'test url';
export const INVALID_URL: string = 'invalid url';

export const TEST_REQUEST_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: TEST_URL,
    resolveWithFullResponse: true
};

export const INVALID_URL_REQUEST_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: INVALID_URL,
    resolveWithFullResponse: true
};

// music
export const TEST_ALBUM_ID: string = 'test album id';
export const INVALID_ALBUM_ID: string = 'invalid album id';
export const TEST_ALBUM_NAME: string = 'test album name';
export const TEST_LINK: string = 'test link';
export const TEST_IMAGE_REF: string = 'test image ref';
export const INVALID_IMAGE_REF: string = 'invalid image ref';
export const TEST_GENRE_ID: string = 'test genre id';
export const INVALID_GENRE_ID: string = 'invalid genre id';
export const TEST_GENRE_NAME: string = 'test genre name';
export const TEST_ALBUM_RELEASE_DATE: string = 'Mon 1900-01-01T00:00:00';

export const TEST_ALBUM: Album = {
    id: TEST_ALBUM_ID,
    name: TEST_ALBUM_NAME,
    originallyReleased: TEST_ALBUM_RELEASE_DATE
};

export const TEST_GENRE: Genre = {
    id: TEST_GENRE_ID,
    name: TEST_GENRE_NAME
};

export const TEST_ALBUM_GROUPS = {
    main: [TEST_ALBUM_ID]
};

export const TEST_ALBUM_GROUPS_RESOLVED = {
    main: [TEST_ALBUM_NAME]
};

export const TEST_GENRES = {
    ids: [TEST_GENRE_ID],
    names: [TEST_GENRE_NAME]
};

export const TEST_IMAGE: Image = {
    url: TEST_LINK
};

// artists
export const TEST_ARTIST_ID: string = 'test artist id';
export const TEST_ARTIST_NAME: string = 'test artist name';
export const INVALID_ARTIST_NAME: string = 'invalid artist name';
export const TEST_FORMATTED_ARTIST_NAME: string = 'test-artist-name';
export const INVALID_FORMATTED_ARTIST_NAME: string = 'invalid-artist-name';
export const TEST_BIO: string = 'test bio';

export const TEST_BIO_OBJECT: Bio = {
    bio: TEST_BIO
};

export const TEST_ARTIST_DTO_WITH_BIO: ArtistResponseDto = {
    id: TEST_ARTIST_ID,
    name: TEST_ARTIST_NAME,
    bios: [TEST_BIO_OBJECT],
    albumGroups: TEST_ALBUM_GROUPS_RESOLVED,
    links: { images: { href: TEST_LINK } }
};

export const TEST_ARTIST_WITH_BIO: Artist = {
    id: TEST_ARTIST_ID,
    name: TEST_ARTIST_NAME,
    bio: TEST_BIO,
    albums: [TEST_ALBUM_NAME],
    image: TEST_LINK
};

export const TEST_ARTIST_DTO_NO_BIO: ArtistResponseDto = {
    id: TEST_ARTIST_ID,
    name: TEST_ARTIST_NAME,
    albumGroups: TEST_ALBUM_GROUPS_RESOLVED,
    links: { images: { href: TEST_LINK } }
};

export const TEST_ARTIST_NO_BIO: Artist = {
    id: TEST_ARTIST_ID,
    name: TEST_ARTIST_NAME,
    bio: '',
    albums: [TEST_ALBUM_NAME],
    image: TEST_LINK
};

export const TEST_ARTIST_DTO: ArtistResponseDto = {
    id: TEST_ARTIST_ID,
    name: TEST_ARTIST_NAME,
    bios: [TEST_BIO_OBJECT],
    albumGroups: TEST_ALBUM_GROUPS,
    links: { images: { href: TEST_IMAGE_REF } }
};

export const TEST_ARTIST: Artist = {
    id: TEST_ARTIST_ID,
    name: TEST_ARTIST_NAME,
    bio: TEST_BIO,
    albums: [TEST_ALBUM_NAME],
    image: TEST_LINK
};

// tracks
export const TEST_TRACK_ID: string = 'test track id';
export const TEST_TRACK_NAME: string = 'test track name';
export const TEST_TRACK_NAME_MULTIPLE: string = 'test multiple track name';
export const INVALID_TRACK_NAME: string = 'invalid track name';
export const TEST_PLAYBACK_TIME: number = 60;
export const TEST_PREVIEW_URL: string = 'test preview url';
export const TEST_TRACK_RELEASE_DATE: string = 'Mon Jan 01 1900';
export const TEST_TRACK_LENGTH: string = '1:00';

export const TEST_TRACK_DTO_WITH_GENRES: TrackResponseDto = {
    id: TEST_TRACK_ID,
    name: TEST_TRACK_NAME,
    albumName: TEST_ALBUM_NAME,
    albumId: TEST_ALBUM_ID,
    artistName: TEST_ARTIST_NAME,
    artistId: TEST_ARTIST_ID,
    playbackSeconds: TEST_PLAYBACK_TIME,
    previewURL: TEST_PREVIEW_URL,
    links: { genres: TEST_GENRES },
    releaseDate: TEST_ALBUM_RELEASE_DATE
};

export const TEST_TRACK_WITH_GENRES: Track = {
    id: TEST_TRACK_ID,
    name: TEST_TRACK_NAME,
    releaseDate: TEST_TRACK_RELEASE_DATE,
    albumName: TEST_ALBUM_NAME,
    artistName: TEST_ARTIST_NAME,
    length: TEST_TRACK_LENGTH,
    audioSnippet: TEST_PREVIEW_URL,
    genres: [TEST_GENRE_NAME]
};

export const TEST_TRACK_DTO_NO_GENRES: TrackResponseDto = {
    id: TEST_TRACK_ID,
    name: TEST_TRACK_NAME,
    albumName: TEST_ALBUM_NAME,
    albumId: TEST_ALBUM_ID,
    artistName: TEST_ARTIST_NAME,
    artistId: TEST_ARTIST_ID,
    playbackSeconds: TEST_PLAYBACK_TIME,
    previewURL: TEST_PREVIEW_URL,
    links: {},
    releaseDate: TEST_ALBUM_RELEASE_DATE
};

export const TEST_TRACK_NO_GENRES: Track = {
    id: TEST_TRACK_ID,
    name: TEST_TRACK_NAME,
    releaseDate: TEST_TRACK_RELEASE_DATE,
    albumName: TEST_ALBUM_NAME,
    artistName: TEST_ARTIST_NAME,
    length: TEST_TRACK_LENGTH,
    audioSnippet: TEST_PREVIEW_URL,
    genres: []
};

export const TEST_TRACK_DTO: TrackResponseDto = {
    id: TEST_TRACK_ID,
    name: TEST_TRACK_NAME,
    albumName: TEST_ALBUM_NAME,
    albumId: TEST_ALBUM_ID,
    artistName: TEST_ARTIST_NAME,
    artistId: TEST_ARTIST_ID,
    playbackSeconds: TEST_PLAYBACK_TIME,
    previewURL: TEST_PREVIEW_URL,
    links: { genres: TEST_GENRES },
    releaseDate: ''
};

export const TEST_TRACK: Track = {
    id: TEST_TRACK_ID,
    name: TEST_TRACK_NAME,
    releaseDate: TEST_TRACK_RELEASE_DATE,
    albumName: TEST_ALBUM_NAME,
    artistName: TEST_ARTIST_NAME,
    length: TEST_TRACK_LENGTH,
    audioSnippet: TEST_PREVIEW_URL,
    genres: [TEST_GENRE_NAME]
};

export const TEST_TRACK_DTO_TWO: TrackResponseDto = {
    id: 'test track id two',
    name: TEST_TRACK_NAME_MULTIPLE,
    albumName: TEST_ALBUM_NAME,
    albumId: TEST_ALBUM_ID,
    artistName: TEST_ARTIST_NAME,
    artistId: TEST_ARTIST_ID,
    playbackSeconds: TEST_PLAYBACK_TIME,
    previewURL: TEST_PREVIEW_URL,
    links: { genres: TEST_GENRES },
    releaseDate: ''
};

export const TEST_TRACK_TWO: Track = {
    id: 'test track id two',
    name: TEST_TRACK_NAME_MULTIPLE,
    releaseDate: TEST_TRACK_RELEASE_DATE,
    albumName: TEST_ALBUM_NAME,
    artistName: TEST_ARTIST_NAME,
    length: TEST_TRACK_LENGTH,
    audioSnippet: TEST_PREVIEW_URL,
    genres: [TEST_GENRE_NAME]
};

export const TEST_TRACK_DTO_THREE: TrackResponseDto = {
    id: 'test track id three',
    name: TEST_TRACK_NAME_MULTIPLE,
    albumName: TEST_ALBUM_NAME,
    albumId: TEST_ALBUM_ID,
    artistName: TEST_ARTIST_NAME,
    artistId: TEST_ARTIST_ID,
    playbackSeconds: TEST_PLAYBACK_TIME,
    previewURL: TEST_PREVIEW_URL,
    links: { genres: TEST_GENRES },
    releaseDate: ''
};

export const TEST_TRACK_THREE: Track = {
    id: 'test track id three',
    name: TEST_TRACK_NAME_MULTIPLE,
    releaseDate: TEST_TRACK_RELEASE_DATE,
    albumName: TEST_ALBUM_NAME,
    artistName: TEST_ARTIST_NAME,
    length: TEST_TRACK_LENGTH,
    audioSnippet: TEST_PREVIEW_URL,
    genres: [TEST_GENRE_NAME]
};

// errors
export const NOT_FOUND_MESSAGE: string = 'not found';
export const BAD_REQUEST_MESSAGE: string = 'Missing information';
export const INTERNAL_SERVER_ERROR_MESSAGE: string = 'internal server error';
export const NOT_FOUND_ERROR: Exception = new Exception(404, NOT_FOUND_MESSAGE);
export const BAD_REQUEST_ERROR: Exception = new Exception(400, BAD_REQUEST_MESSAGE);
export const INTERNAL_SERVER_ERROR: Exception = new Exception(
    500,
    INTERNAL_SERVER_ERROR_MESSAGE
);

// logging
export const JEST_TEST_FUNCTION_NAME: string = 'asyncJestTest';
export const INVALID_LOG_LEVEL: string = 'invalid';

// url builder
export const TEST_URL_ARG: string = 'test arg ';
export const TEST_SECOND_URL_ARG: string = 'test arg two';
export const TEST_MULTI_ARG_URL_STRING: string = 'test arg test arg two';

// responses
export const TEST_ARTIST_RESPONSE: object = {
    artists: [TEST_ARTIST_DTO]
};

export const TEST_IMAGE_RESPONSE: object = {
    images: [TEST_IMAGE]
};

export const TEST_ALBUM_RESPONSE: object = {
    albums: [TEST_ALBUM]
};

export const TEST_GENRE_RESPONSE: object = {
    genres: [TEST_GENRE]
};

export const TEST_TRACK_RESPONSE_SINGLE: object = {
    meta: {
        totalCount: 1
    },
    search: {
        data: {
            tracks: [TEST_TRACK_DTO]
        }
    }
};

export const TEST_TRACK_RESPONSE_MULTIPLE: object = {
    meta: {
        totalCount: 2
    },
    search: {
        data: {
            tracks: [TEST_TRACK_DTO_TWO]
        }
    }
};

export const TEST_TRACK_PAGINATION_RESPONSE: object = {
    search: {
        data: {
            tracks: [TEST_TRACK_DTO_THREE]
        }
    }
};

// request options
export const TEST_HOST: string = 'test host';
export const TEST_BASE_URL: string = 'test base url';
export const TEST_ARTISTS_URL: string = 'test artists url';
export const TEST_ALBUMS_URL: string = 'test albums url';
export const TEST_API_KEY: string = 'test api key';
export const TEST_LIMIT_QUERY: string = 'test limit query';
export const TEST_OFFSET_QUERY: string = 'test offset query';
export const TEST_GENRES_URL: string = 'test genres url';
export const TEST_LIMIT: number = 1;
export const TEST_MAX_RESULTS: number = 1;
export const TEST_ARTIST_URI: string = `${TEST_HOST}${TEST_BASE_URL}${TEST_ARTISTS_URL}${TEST_FORMATTED_ARTIST_NAME}?apikey=${TEST_API_KEY}`;
export const INVALID_ARTIST_URI: string = `${TEST_HOST}${TEST_BASE_URL}${TEST_ARTISTS_URL}${INVALID_FORMATTED_ARTIST_NAME}?apikey=${TEST_API_KEY}`;
export const TEST_IMAGE_URI: string = `${TEST_IMAGE_REF}?apikey=${TEST_API_KEY}`;
export const INVALID_IMAGE_URI: string = `${INVALID_IMAGE_REF}?apikey=${TEST_API_KEY}`;
export const TEST_ALBUM_URI: string = `${TEST_HOST}${TEST_BASE_URL}${TEST_ALBUMS_URL}${TEST_ALBUM_ID}?apikey=${TEST_API_KEY}`;
export const INVALID_ALBUM_URI: string = `${TEST_HOST}${TEST_BASE_URL}${TEST_ALBUMS_URL}${INVALID_ALBUM_ID}?apikey=${TEST_API_KEY}`;
export const TEST_GENRE_URI: string = `${TEST_HOST}${TEST_BASE_URL}${TEST_GENRES_URL}${TEST_GENRE_ID}?apikey=${TEST_API_KEY}`;
export const INVALID_GENRE_URI: string = `${TEST_HOST}${TEST_BASE_URL}${TEST_GENRES_URL}${INVALID_GENRE_ID}?apikey=${TEST_API_KEY}`;
export const TEST_TRACK_URI_SINGLE: string = `${TEST_HOST}${TEST_BASE_URL}/search?apikey=${TEST_API_KEY}&query=${TEST_TRACK_NAME}&type=track`;
export const TEST_TRACK_URI_MULTIPLE: string = `${TEST_HOST}${TEST_BASE_URL}/search?apikey=${TEST_API_KEY}&query=${TEST_TRACK_NAME_MULTIPLE}&type=track`;
export const TEST_TRACK_PAGINATE_URI: string = `${TEST_TRACK_URI_MULTIPLE}&${TEST_LIMIT_QUERY}${TEST_LIMIT}&${TEST_OFFSET_QUERY}${TEST_LIMIT}`;
export const INVALID_TRACK_URI: string = `${TEST_HOST}${TEST_BASE_URL}/search?apikey=${TEST_API_KEY}&query=${INVALID_TRACK_NAME}&type=track`;

export const TEST_IMAGE_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: TEST_IMAGE_URI,
    resolveWithFullResponse: true,
    json: true
};

export const INVALID_IMAGE_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: INVALID_IMAGE_URI,
    resolveWithFullResponse: true,
    json: true
};

export const TEST_ALBUM_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: TEST_ALBUM_URI,
    resolveWithFullResponse: true,
    json: true
};

export const INVALID_ALBUM_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: INVALID_ALBUM_URI,
    resolveWithFullResponse: true,
    json: true
};

export const TEST_ARTIST_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: TEST_ARTIST_URI,
    resolveWithFullResponse: true,
    json: true
};

export const INVALID_ARTIST_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: INVALID_ARTIST_URI,
    resolveWithFullResponse: true,
    json: true
};

export const TEST_GENRE_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: TEST_GENRE_URI,
    resolveWithFullResponse: true,
    json: true
};

export const INVALID_GENRE_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: INVALID_GENRE_URI,
    resolveWithFullResponse: true,
    json: true
};

export const TEST_TRACK_OPTIONS_SINGLE: MusicRequestOptions = {
    method: 'GET',
    uri: TEST_TRACK_URI_SINGLE,
    resolveWithFullResponse: true,
    json: true
};

export const TEST_TRACK_OPTIONS_MULTIPLE: MusicRequestOptions = {
    method: 'GET',
    uri: TEST_TRACK_URI_MULTIPLE,
    resolveWithFullResponse: true,
    json: true
};

export const TEST_TRACK_OPTIONS_PAGINATE: MusicRequestOptions = {
    method: 'GET',
    uri: TEST_TRACK_PAGINATE_URI,
    resolveWithFullResponse: true,
    json: true
};

export const INVALID_TRACK_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: INVALID_TRACK_URI,
    resolveWithFullResponse: true,
    json: true
};
