import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { mock, instance, when } from 'ts-mockito';
import { Level } from 'log4js';
import { AppRouter } from './router';
import { App } from '../app';
import { RouterProperties } from './router-properties';
import { AppLogger } from '../util/logging/app.logger';
import { AppLoggerLevel } from '../util/logging/enum/app-logger-level.enum';
import { INVALID_LOG_LEVEL, TEST_RESPONSE } from '../util/test.constants';
import { APP } from '../config/app.constants';
import { MusicService } from '../music/music.service';

let mockRequest: any;
let mockResponse: any;
let testRouter: AppRouter;
describe('AppRouter', () => {
    beforeEach(() => {
        mockRequest = new Request() as any;
        mockResponse = new Response() as any;

        const mockService = mock(MusicService);
        when(mockService.getHello()).thenReturn('Hello World!');
        when(mockService.sendTestRequest()).thenResolve(TEST_RESPONSE);

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
            it('should default to "APP.LOG_LEVEL"', () => {
                APP.LOG_LEVEL = 'info';
                const invalidLogLevel: string = INVALID_LOG_LEVEL;
                mockRequest.params.logLevel = invalidLogLevel;
                testRouter.loggingHandler(mockRequest, mockResponse);
                expect(
                    ((AppLogger.instances[0].logger.level as unknown) as Level).levelStr
                ).toBe(APP.LOG_LEVEL.toUpperCase());
            });
        });
    });

    describe('helloWorldHandler', () => {
        describe('getting hello world message', () => {
            it('should return a status of 200', () => {
                testRouter.helloWorldHandler(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            });

            it('should return hello world message', () => {
                testRouter.helloWorldHandler(mockRequest, mockResponse);
                expect(mockResponse.send).toHaveBeenCalledWith('Hello World!');
            });
        });
    });

    describe('testRequestHandler', () => {
        describe('testing sending a request', () => {
            it('should return status of 200', async () => {
                await testRouter.testRequestHandler(mockRequest, mockResponse);
                expect(mockResponse.status).toHaveBeenCalledWith(200);
            });

            it('should return a response', async () => {
                await testRouter.testRequestHandler(mockRequest, mockResponse);
                expect(mockResponse.send).toHaveBeenCalledWith(TEST_RESPONSE);
            });
        });
    });
});
