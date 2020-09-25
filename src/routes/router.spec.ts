import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { mock, instance, when } from 'ts-mockito';
import { Level } from 'log4js';
import { AppRouter } from './router';
import { App } from '../app';
import { RouterProperties } from './router-properties';
import { AppLogger } from '../util/logging/app.logger';
import { AppLoggerLevel } from '../util/logging/enum/app-logger-level.enum';
import {
    INVALID_LOG_LEVEL,
    TEST_ARTIST_NAME,
    TEST_ARTIST_WITH_BIO,
    TEST_TRACK_NAME,
    TEST_TRACK_WITH_GENRES
} from '../util/test.constants';
import { MusicService } from '../music/music.service';
import { LOGGING } from '../config/logging.constants';

let mockRequest: any;
let mockResponse: any;
let testRouter: AppRouter;
describe('AppRouter', () => {
    beforeEach(() => {
        mockRequest = new Request() as any;
        mockResponse = new Response() as any;

        mockRequest.setTimeout = (): void => {};

        const mockService = mock(MusicService);
        when(mockService.getTracksByName(TEST_TRACK_NAME)).thenResolve([
            TEST_TRACK_WITH_GENRES
        ]);
        when(mockService.getTracksByName('')).thenReject(new Error('error'));

        when(
            mockService.getTracksByNameAndArtist(TEST_TRACK_NAME, TEST_ARTIST_NAME)
        ).thenResolve([TEST_TRACK_WITH_GENRES]);
        when(mockService.getTracksByNameAndArtist('', '')).thenReject(new Error('error'));

        when(mockService.getArtistsByName(TEST_ARTIST_NAME)).thenResolve([
            TEST_ARTIST_WITH_BIO
        ]);
        when(mockService.getArtistsByName('')).thenReject(new Error('error'));

        const mockApp = mock(App).app;
        const mockProps: RouterProperties = {
            app: instance(mockApp),
            service: instance(mockService)
        };

        testRouter = AppRouter.create(mockProps);
    });

    afterEach(() => {
        mockResponse.resetMocked();
    });

    describe('healthcheckHandler', () => {
        describe('getting healthcheck', () => {
            it('should return a message stating "Health is good"', () => {
                testRouter.healthcheckHandler(mockRequest, mockResponse);
                expect(mockResponse.send).toHaveBeenCalledWith('Health is good');
            });

            it('should return status of 200', () => {
                testRouter.healthcheckHandler(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            });
        });
    });

    describe('loggingHandler', () => {
        describe('changing log level with a valid log level', () => {
            it('should change all loggers to the passed in level', () => {
                const randomLogLevel: string =
                    AppLoggerLevel[
                        Object.keys(AppLoggerLevel)[
                            Math.floor(Math.random() * Object.keys(AppLoggerLevel).length)
                        ]
                    ];
                mockRequest.params.logLevel = randomLogLevel;
                testRouter.loggingHandler(mockRequest, mockResponse);

                expect(
                    ((AppLogger.instances[0].logger.level as unknown) as Level).levelStr
                ).toBe((mockRequest.params.logLevel as string).toUpperCase());
            });
        });

        describe('changing log level with an invalid log level', () => {
            it('should default to "LOGGING.LOG_LEVEL"', () => {
                LOGGING.LOG_LEVEL = 'info';
                const invalidLogLevel: string = INVALID_LOG_LEVEL;
                mockRequest.params.logLevel = invalidLogLevel;
                testRouter.loggingHandler(mockRequest, mockResponse);
                expect(
                    ((AppLogger.instances[0].logger.level as unknown) as Level).levelStr
                ).toBe(LOGGING.LOG_LEVEL.toUpperCase());
            });
        });
    });

    describe('tracksByTitleHandler', () => {
        describe('getting tracks by title without external error', () => {
            it('should return a list of tracks with name equal to passed in song title', async () => {
                mockRequest.params.songTitle = TEST_TRACK_NAME;
                await testRouter.tracksByTitleHandler(mockRequest, mockResponse);
                expect(mockResponse.send).toHaveBeenCalledWith([TEST_TRACK_WITH_GENRES]);
                expect(TEST_TRACK_WITH_GENRES.name).toEqual(TEST_TRACK_NAME);
            });

            it('should return status of 200', async () => {
                mockRequest.params.songTitle = TEST_TRACK_NAME;
                await testRouter.tracksByTitleHandler(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            });
        });

        describe('getting tracks by title with external error', () => {
            it('should return an error message', async () => {
                mockRequest.params.songTitle = '';
                await testRouter.tracksByTitleHandler(mockRequest, mockResponse);
                expect(mockResponse.send).toHaveBeenCalledWith('error');
            });

            it('should return status of 500', async () => {
                mockRequest.params.songTitle = '';
                await testRouter.tracksByTitleHandler(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            });
        });
    });

    describe('tracksByTitleAndArtistHandler', () => {
        describe('getting tracks by title and artist without external error', () => {
            it('should return a list of tracks with name equal to passed in song title and artistName equal to passed in artist name', async () => {
                mockRequest.params.songTitle = TEST_TRACK_NAME;
                mockRequest.params.artistName = TEST_ARTIST_NAME;
                await testRouter.tracksByTitleAndArtistHandler(mockRequest, mockResponse);
                expect(mockResponse.send).toHaveBeenCalledWith([TEST_TRACK_WITH_GENRES]);
                expect(TEST_TRACK_WITH_GENRES.name).toEqual(TEST_TRACK_NAME);
                expect(TEST_TRACK_WITH_GENRES.artistName).toEqual(TEST_ARTIST_NAME);
            });

            it('should return status of 200', async () => {
                mockRequest.params.songTitle = TEST_TRACK_NAME;
                mockRequest.params.artistName = TEST_ARTIST_NAME;
                await testRouter.tracksByTitleAndArtistHandler(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            });
        });

        describe('getting tracks by title and artist with external error', () => {
            it('should return an error message', async () => {
                mockRequest.params.songTitle = '';
                mockRequest.params.artistName = '';
                await testRouter.tracksByTitleAndArtistHandler(mockRequest, mockResponse);
                expect(mockResponse.send).toHaveBeenCalledWith('error');
            });

            it('should return status of 500', async () => {
                mockRequest.params.songTitle = '';
                mockRequest.params.artistName = '';
                await testRouter.tracksByTitleAndArtistHandler(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            });
        });
    });

    describe('artistsHandler', () => {
        describe('getting artists by name without external error', () => {
            it('should return a list of artists with name equal to passed in artist name', async () => {
                mockRequest.params.artistName = TEST_ARTIST_NAME;
                await testRouter.artistsHandler(mockRequest, mockResponse);
                expect(mockResponse.send).toHaveBeenCalledWith([TEST_ARTIST_WITH_BIO]);
                expect(TEST_ARTIST_WITH_BIO.name).toEqual(TEST_ARTIST_NAME);
            });

            it('should return status of 200', async () => {
                mockRequest.params.artistName = TEST_ARTIST_NAME;
                await testRouter.artistsHandler(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            });
        });

        describe('getting tracks by title and artist with external error', () => {
            it('should return an error message', async () => {
                mockRequest.params.artistName = '';
                await testRouter.artistsHandler(mockRequest, mockResponse);
                expect(mockResponse.send).toHaveBeenCalledWith('error');
            });

            it('should return status of 500', async () => {
                mockRequest.params.artistName = '';
                await testRouter.artistsHandler(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(500);
            });
        });
    });
});
