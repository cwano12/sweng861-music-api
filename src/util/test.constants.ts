import { Exception } from '@tsed/exceptions';
import { Artist } from '../music/artists/artist';
import { ArtistResponseDto } from '../music/artists/dto/artist-response.dto';
import { TrackResponseDto } from '../music/tracks/dto/track-response.dto';
import { Track } from '../music/tracks/track';
import { Bio } from '../music/types/bio';
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

// responses
export const TEST_RESPONSE: object = {
    data: {
        id: 2,
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg'
    },
    ad: {
        company: 'StatusCode Weekly',
        url: 'http://statuscode.org/',
        text:
            'A weekly newsletter focusing on software development, infrastructure, the server, performance, and the stack end of things.'
    }
};

// music
export const TEST_ALBUM_ID: string = 'test album id';
export const TEST_ALBUM_NAME: string = 'test album name';
export const TEST_LINK: string = 'test link';
export const TEST_GENRE_ID: string = 'test genre id';
export const TEST_GENRE_NAME: string = 'test genre name';
export const TEST_ALBUM_RELEASE_DATE: string = 'Mon 1900-01-01T00:00:00';

export const TEST_ALBUM_GROUPS = {
    main: [TEST_ALBUM_NAME]
};

export const TEST_GENRES = {
    ids: [TEST_GENRE_ID],
    names: [TEST_GENRE_NAME]
};

// artists
export const TEST_ARTIST_ID: string = 'test artist id';
export const TEST_ARTIST_NAME: string = 'test artist name';
export const TEST_BIO: string = 'test bio';

export const TEST_BIO_OBJECT: Bio = {
    bio: TEST_BIO
};

export const TEST_ARTIST_DTO_WITH_BIO: ArtistResponseDto = {
    id: TEST_ARTIST_ID,
    name: TEST_ARTIST_NAME,
    bios: [TEST_BIO_OBJECT],
    albumGroups: TEST_ALBUM_GROUPS,
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
    albumGroups: TEST_ALBUM_GROUPS,
    links: { images: { href: TEST_LINK } }
};

export const TEST_ARTIST_NO_BIO: Artist = {
    id: TEST_ARTIST_ID,
    name: TEST_ARTIST_NAME,
    bio: '',
    albums: [TEST_ALBUM_NAME],
    image: TEST_LINK
};

// tracks
export const TEST_TRACK_ID: string = 'test track id';
export const TEST_TRACK_NAME: string = 'test track name';
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
