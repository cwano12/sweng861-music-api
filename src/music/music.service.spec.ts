import { mock, when, anything, anyString, instance } from 'ts-mockito';
import { MusicService } from './music.service';
import { RequestWrapper } from '../util/request/request.wrapper';
import { TEST_RESPONSE } from '../util/test.constants';

describe('HelloWorldService', () => {
    const testService: MusicService = new MusicService();
    const mockWrapper: RequestWrapper = mock(RequestWrapper);
    when(mockWrapper.sendRequest(anything(), anyString())).thenResolve({
        body: TEST_RESPONSE
    });
    testService.requestWrapper = instance(mockWrapper);

    describe('getHello', () => {
        describe('getting hello', () => {
            it('should return "Hello World!"', () => {
                const testMessage: string = testService.getHello();
                expect(testMessage).toBe('Hello World!');
            });
        });
    });

    describe('sendTestRequest', () => {
        describe('sending test request', () => {
            it('should return a response', async () => {
                const testResponse = await testService.sendTestRequest();
                expect(testResponse).toStrictEqual(TEST_RESPONSE);
            });
        });
    });
});
