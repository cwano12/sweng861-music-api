import { instance, mock } from 'ts-mockito';
import { Server } from 'http';
import { App } from './app';
import { AppLogger } from './util/logging/app.logger';
import { AppDependencies } from './app-dependencies';
import { MusicService } from './music/music.service';

let testServer: Server;
let testLogger: AppLogger;
describe('App', () => {
    const mockService: MusicService = mock(MusicService);
    const testDependencies: AppDependencies = { service: instance(mockService) };
    const testApp = new App(testDependencies);
    const mockLogger = mock(AppLogger);
    testLogger = instance(mockLogger);

    afterAll(() => {
        testServer.close();
    });

    describe('start', () => {
        describe('starting the app', () => {
            it('should return an instance of Http Server', () => {
                testServer = testApp.start(testLogger);
                expect(testServer.constructor.name).toBe('Server');
            });
        });
    });
});
