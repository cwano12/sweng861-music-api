import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { mock, instance } from 'ts-mockito';
import { Level } from 'log4js';
import { AppRouter } from './router';
import { App } from '../app';
import { RouterProperties } from './router-properties';
import { AppLogger } from '../util/logging/app.logger';
import { AppLoggerLevel } from '../util/logging/enum/app-logger-level.enum';
import { INVALID_LOG_LEVEL } from '../util/test.constants';
import { MusicService } from '../music/music.service';
import { LOGGING } from '../config/logging.constants';

let mockRequest: any;
let mockResponse: any;
let testRouter: AppRouter;
describe('AppRouter', () => {
    beforeEach(() => {
        mockRequest = new Request() as any;
        mockResponse = new Response() as any;

        const mockService = mock(MusicService);

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
});
