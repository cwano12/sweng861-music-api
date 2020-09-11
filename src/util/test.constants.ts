import { Exception } from '@tsed/exceptions';
import { MusicRequestOptions } from './request/types/music-request-options';

// bots
export const TEST_BOT_KEY: string = 'test-bots';
export const INVALID_BOT_KEY: string = 'invalid-bots';
export const TEST_BOT_ID: string = '1';
export const INVALID_BOT_ID: string = 'invalid bot id';
export const TEST_BOT_OWNER: string = 'test bot owner';
export const TEST_BOT_NAME: string = 'test bot';
export const TEST_WORKSPACE_ID: string = 'test workspace id';
export const INVALID_WORKSPACE_ID: string = 'invalid workspace id';
export const TEST_CG_LOG_LEVEL: string = 'test cg log level';
export const TEST_STATUS: string = 'test status';

// request info
export const TEST_URL: string = 'test url';
export const INVALID_URL: string = 'invalid url';
export const TEST_AUTH: string = 'test auth';
export const INVALID_AUTH: string = 'invalid auth';

export const TEST_REQUEST_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: TEST_URL,
    headers: {
        Authorization: TEST_AUTH,
        'Content-Type': 'application/json'
    },
    resolveWithFullResponse: true
};

export const INVALID_URL_REQUEST_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: INVALID_URL,
    headers: {
        Authorization: TEST_AUTH,
        'Content-Type': 'application/json'
    },
    resolveWithFullResponse: true
};

export const INVALID_AUTH_REQUEST_OPTIONS: MusicRequestOptions = {
    method: 'GET',
    uri: TEST_URL,
    headers: {
        Authorization: INVALID_AUTH,
        'Content-Type': 'application/json'
    },
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
export const UNAUTHORIZED_MESSAGE: string = 'unauthorized';
export const BAD_REQUEST_MESSAGE: string = 'Missing bot information from cg_context';
export const INTERNAL_SERVER_ERROR_MESSAGE: string = 'internal server error';
export const NOT_FOUND_ERROR: Exception = new Exception(404, NOT_FOUND_MESSAGE);
export const UNAUTHORIZED_ERROR: Exception = new Exception(401, UNAUTHORIZED_MESSAGE);
export const BAD_REQUEST_ERROR: Exception = new Exception(400, BAD_REQUEST_MESSAGE);
export const INTERNAL_SERVER_ERROR: Exception = new Exception(
    500,
    INTERNAL_SERVER_ERROR_MESSAGE
);

// logging
export const JEST_TEST_FUNCTION_NAME: string = 'asyncJestTest';
export const INVALID_LOG_LEVEL: string = 'invalid';
