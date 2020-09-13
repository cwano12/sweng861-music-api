import { mock, when, anything, anyString, instance } from 'ts-mockito';
import { MusicService } from './music.service';
import { RequestWrapper } from '../util/request/request.wrapper';
import { TEST_RESPONSE } from '../util/test.constants';

describe('MusicService', () => {
    const testService: MusicService = new MusicService();
    const mockWrapper: RequestWrapper = mock(RequestWrapper);
    when(mockWrapper.sendRequest(anything(), anyString())).thenResolve({
        body: TEST_RESPONSE
    });
    testService.requestWrapper = instance(mockWrapper);
});
