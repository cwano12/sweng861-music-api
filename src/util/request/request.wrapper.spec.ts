import {
    TEST_REQUEST_OPTIONS,
    NOT_FOUND_ERROR,
    NOT_FOUND_MESSAGE,
    UNAUTHORIZED_MESSAGE,
    INVALID_URL_REQUEST_OPTIONS,
    INVALID_AUTH_REQUEST_OPTIONS,
    UNAUTHORIZED_ERROR
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
            case JSON.stringify(INVALID_AUTH_REQUEST_OPTIONS): {
                return Promise.reject({ statusCode: 401, message: UNAUTHORIZED_MESSAGE });
            }
            default:
                return Promise.reject({ statusCode: 500, message: 'internal server error' });
        }
    });
});

describe('RequestWrapper', () => {
    const testWrapper: RequestWrapper = new RequestWrapper();
    describe('sendRequest', () => {
        describe('sending request with valid url and auth', () => {
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

        describe('sending request with invalid auth', () => {
            it('should throw an error with status 401', async () => {
                await expect(
                    testWrapper.sendRequest(INVALID_AUTH_REQUEST_OPTIONS, '')
                ).rejects.toThrowError(UNAUTHORIZED_ERROR);
            });
        });
    });
});
