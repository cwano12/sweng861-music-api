import { Exception } from '@tsed/exceptions';
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
