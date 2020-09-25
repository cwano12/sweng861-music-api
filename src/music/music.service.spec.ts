import { mock, when, anything, anyString, instance, deepEqual } from 'ts-mockito';
import { MusicService } from './music.service';
import { RequestWrapper } from '../util/request/request.wrapper';
import {
    INVALID_ALBUM_ID,
    INVALID_ALBUM_OPTIONS,
    INVALID_ARTIST_NAME,
    INVALID_ARTIST_OPTIONS,
    INVALID_GENRE_ID,
    INVALID_GENRE_OPTIONS,
    INVALID_IMAGE_OPTIONS,
    INVALID_IMAGE_REF,
    INVALID_TRACK_NAME,
    INVALID_TRACK_OPTIONS,
    NOT_FOUND_ERROR,
    TEST_ALBUMS_URL,
    TEST_ALBUM_ID,
    TEST_ALBUM_NAME,
    TEST_ALBUM_OPTIONS,
    TEST_ALBUM_RESPONSE,
    TEST_API_KEY,
    TEST_ARTISTS_URL,
    TEST_ARTIST_NAME,
    TEST_ARTIST_OPTIONS,
    TEST_ARTIST_RESPONSE,
    TEST_BASE_URL,
    TEST_GENRE,
    TEST_GENRES_URL,
    TEST_GENRE_ID,
    TEST_GENRE_OPTIONS,
    TEST_GENRE_RESPONSE,
    TEST_HOST,
    TEST_IMAGE_OPTIONS,
    TEST_IMAGE_REF,
    TEST_IMAGE_RESPONSE,
    TEST_LIMIT,
    TEST_LIMIT_QUERY,
    TEST_LINK,
    TEST_MAX_RESULTS,
    TEST_OFFSET_QUERY,
    TEST_TRACK_NAME,
    TEST_TRACK_NAME_MULTIPLE,
    TEST_TRACK_OPTIONS_MULTIPLE,
    TEST_TRACK_OPTIONS_PAGINATE,
    TEST_TRACK_OPTIONS_SINGLE,
    TEST_TRACK_PAGINATION_RESPONSE,
    TEST_TRACK_RESPONSE_MULTIPLE,
    TEST_TRACK_RESPONSE_SINGLE
} from '../util/test.constants';
import { Artist } from './artists/artist';
import { MUSIC } from '../config/music.constants';
import { Album } from './types/album';
import { Genre } from './types/genre';
import { Track } from './tracks/track';

describe('MusicService', () => {
    const testService: MusicService = new MusicService();
    const mockWrapper: RequestWrapper = mock(RequestWrapper);

    // images
    when(mockWrapper.sendRequest(deepEqual(TEST_IMAGE_OPTIONS), anyString())).thenResolve({
        body: TEST_IMAGE_RESPONSE
    });
    when(mockWrapper.sendRequest(deepEqual(INVALID_IMAGE_OPTIONS), anyString())).thenReject(
        NOT_FOUND_ERROR
    );

    // albums
    when(mockWrapper.sendRequest(deepEqual(TEST_ALBUM_OPTIONS), anyString())).thenResolve({
        body: TEST_ALBUM_RESPONSE
    });
    when(mockWrapper.sendRequest(deepEqual(INVALID_ALBUM_OPTIONS), anyString())).thenReject(
        NOT_FOUND_ERROR
    );

    // artists
    when(mockWrapper.sendRequest(deepEqual(TEST_ARTIST_OPTIONS), anyString())).thenResolve({
        body: TEST_ARTIST_RESPONSE
    });
    when(mockWrapper.sendRequest(deepEqual(INVALID_ARTIST_OPTIONS), anyString())).thenReject(
        NOT_FOUND_ERROR
    );

    // genres
    when(mockWrapper.sendRequest(deepEqual(TEST_GENRE_OPTIONS), anyString())).thenResolve({
        body: TEST_GENRE_RESPONSE
    });
    when(mockWrapper.sendRequest(deepEqual(INVALID_GENRE_OPTIONS), anyString())).thenReject(
        NOT_FOUND_ERROR
    );

    // tracks
    when(
        mockWrapper.sendRequest(deepEqual(TEST_TRACK_OPTIONS_SINGLE), anyString())
    ).thenResolve({
        body: TEST_TRACK_RESPONSE_SINGLE
    });
    when(
        mockWrapper.sendRequest(deepEqual(TEST_TRACK_OPTIONS_MULTIPLE), anyString())
    ).thenResolve({
        body: TEST_TRACK_RESPONSE_MULTIPLE
    });
    when(
        mockWrapper.sendRequest(deepEqual(TEST_TRACK_OPTIONS_PAGINATE), anyString())
    ).thenResolve({
        body: TEST_TRACK_PAGINATION_RESPONSE
    });
    when(mockWrapper.sendRequest(deepEqual(INVALID_TRACK_OPTIONS), anyString())).thenReject(
        NOT_FOUND_ERROR
    );

    testService.requestWrapper = instance(mockWrapper);
    MUSIC.HOST = TEST_HOST;
    MUSIC.BASE_PATH = TEST_BASE_URL;
    MUSIC.ALBUMS_URL = TEST_ALBUMS_URL;
    MUSIC.ARTISTS_URL = TEST_ARTISTS_URL;
    MUSIC.GENRES_URL = TEST_GENRES_URL;
    MUSIC.API_KEY = TEST_API_KEY;
    MUSIC.LIMIT = TEST_LIMIT;
    MUSIC.LIMIT_QUERY = TEST_LIMIT_QUERY;
    MUSIC.OFFSET_QUERY = TEST_OFFSET_QUERY;

    describe('getImageLink', () => {
        describe('getting image link with valid image reference', () => {
            it('should return an image url', async () => {
                const testLink: string = await testService.getImageLink(TEST_IMAGE_REF);
                expect(testLink).toBe(TEST_LINK);
            });
        });

        describe('getting image link with invalid image reference', () => {
            it('should throw an error', async () => {
                await expect(testService.getImageLink(INVALID_IMAGE_REF)).rejects.toThrowError(
                    NOT_FOUND_ERROR
                );
            });
        });
    });

    describe('getAlbumById', () => {
        describe('getting album with valid album id', () => {
            it('should return an album', async () => {
                const testAlbum: Album = await testService.getAlbumById(TEST_ALBUM_ID);
                expect(testAlbum.name).toBe(TEST_ALBUM_NAME);
            });
        });

        describe('getting album with invalid album id', () => {
            it('should throw an error', async () => {
                await expect(testService.getAlbumById(INVALID_ALBUM_ID)).rejects.toThrowError(
                    NOT_FOUND_ERROR
                );
            });
        });
    });

    describe('getArtistsByName', () => {
        describe('getting artist with valid artist name', () => {
            it('should return a list of artists with name equal to artist name', async () => {
                const testArtists: Artist[] = await testService.getArtistsByName(
                    TEST_ARTIST_NAME
                );
                expect(testArtists[0].name).toEqual(TEST_ARTIST_NAME);
            });
        });

        describe('getting artist with invalid artist name', () => {
            it('should throw an error', async () => {
                await expect(
                    testService.getArtistsByName(INVALID_ARTIST_NAME)
                ).rejects.toThrowError(NOT_FOUND_ERROR);
            });
        });
    });

    describe('getGenreById', () => {
        describe('getting genre with valid genre id', () => {
            it('should return a genre', async () => {
                const testGenre: Genre = await testService.getGenreById(TEST_GENRE_ID);
                expect(testGenre).toEqual(TEST_GENRE);
            });
        });

        describe('getting genre with invalid genre id', () => {
            it('should throw an error', async () => {
                await expect(testService.getGenreById(INVALID_GENRE_ID)).rejects.toThrowError(
                    NOT_FOUND_ERROR
                );
            });
        });
    });

    describe('getTracksByName', () => {
        describe('getting tracks with valid track name', () => {
            it('should return a list of tracks with name equal to track name', async () => {
                const testTracks: Track[] = await testService.getTracksByName(TEST_TRACK_NAME);
                expect(testTracks[0].name).toEqual(TEST_TRACK_NAME);
            });
        });

        describe('getting tracks with valid track name that returns multiple results', () => {
            it('should return a list of multple tracks with name matching track name', async () => {
                const testTracks: Track[] = await testService.getTracksByName(
                    TEST_TRACK_NAME_MULTIPLE
                );

                expect(testTracks.length).toBeGreaterThan(1);
                testTracks.map(testTrack =>
                    expect(testTrack.name).toEqual(TEST_TRACK_NAME_MULTIPLE)
                );
            });
        });

        describe('getting tracks with valid track name that returns multiple results greater than max results', () => {
            it('should return a list of size equal to max results wiht tracks with name matching track name', async () => {
                MUSIC.MAX_RESULTS = TEST_MAX_RESULTS;
                const testTracks: Track[] = await testService.getTracksByName(
                    TEST_TRACK_NAME_MULTIPLE
                );

                expect(testTracks.length).toEqual(TEST_MAX_RESULTS);
                testTracks.map(testTrack =>
                    expect(testTrack.name).toEqual(TEST_TRACK_NAME_MULTIPLE)
                );
            });
        });

        describe('getting tracks with invalid track name', () => {
            it('should throw an error', async () => {
                await expect(
                    testService.getTracksByName(INVALID_TRACK_NAME)
                ).rejects.toThrowError(NOT_FOUND_ERROR);
            });
        });
    });

    describe('getTracksByNameAndArtist', () => {
        describe('getting tracks with valid track name and valid artist name', () => {
            it('should return a list of tracks with name equal to track name and artistName equal to artist name', async () => {
                const testTracks: Track[] = await testService.getTracksByNameAndArtist(
                    TEST_TRACK_NAME,
                    TEST_ARTIST_NAME
                );
                testTracks.forEach(testTrack => {
                    expect(testTrack.name).toEqual(TEST_TRACK_NAME);
                    expect(testTrack.artistName).toEqual(TEST_ARTIST_NAME);
                });
            });
        });

        describe('getting tracks with invalid artist name', () => {
            it('should return an empty list', async () => {
                const testTracks: Track[] = await testService.getTracksByNameAndArtist(
                    TEST_TRACK_NAME,
                    INVALID_ARTIST_NAME
                );
                expect(testTracks.length).toBe(0);
            });
        });
    });
});
