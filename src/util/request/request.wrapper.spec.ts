import {
    TEST_REQUEST_OPTIONS,
    NOT_FOUND_ERROR,
    NOT_FOUND_MESSAGE,
    INVALID_URL_REQUEST_OPTIONS
} from '../test.constants';
import { RequestWrapper } from './request.wrapper';
import { MusicRequestOptions } from './types/music-request-options';

jest.mock('request-promise-native', () => {
    return jest.fn().mockImplementation((options: MusicRequestOptions) => {
        switch (JSON.stringify(options)) {
            case JSON.stringify(TEST_REQUEST_OPTIONS): {
                return Promise.resolve({
                    body: {}
                });
            }
            case JSON.stringify(INVALID_URL_REQUEST_OPTIONS): {
                return Promise.reject({ statusCode: 404, message: NOT_FOUND_MESSAGE });
            }
            default:
                return Promise.reject({ statusCode: 500, message: 'internal server error' });
        }
    });
});

describe('RequestWrapper', () => {
    const testWrapper: RequestWrapper = new RequestWrapper();
    describe('sendRequest', () => {
        describe('sending request with valid url', () => {
            it('should return a response body', async () => {
                const testResponse = await testWrapper.sendRequest(TEST_REQUEST_OPTIONS, '');
                expect(testResponse.body).toBeDefined();
            });
        });

        describe('sending request with invalid url', () => {
            it('should throw an error with status 404', async () => {
                await expect(
                    testWrapper.sendRequest(INVALID_URL_REQUEST_OPTIONS, '')
                ).rejects.toThrowError(NOT_FOUND_ERROR);
            });
        });
    });
});
