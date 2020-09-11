/**
 * type to define structure of request options to send
 * via http request
 */
export type MusicRequestOptions = {
    method: string;
    uri: string;
    resolveWithFullResponse: boolean;
    json?: boolean;
};
