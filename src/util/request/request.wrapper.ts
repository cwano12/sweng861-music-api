import { Exception } from '@tsed/exceptions';
import { AppLogger } from '../logging/app.logger';
import { MusicRequestOptions } from './types/music-request-options';

import rpn = require('request-promise-native');

/**
 * Wrapper class around request-promise-native; isolates request logic to a single
 * location and makes unit testing easier
 */
export class RequestWrapper {
    logger: AppLogger = new AppLogger(this.constructor.name);

    /**
     * Sends the request using request-promise-native
     * @param {MusicRequestOptions} options - request options; modeled off of options from request package
     * @param {string} customMessage - custom message to use in the event of an error
     * @returns {rpn.FullResponse} response
     *
     * @throws {HttpException}
     */
    async sendRequest(options: MusicRequestOptions, customMessage: string): Promise<any> {
        try {
            const response: rpn.FullResponse = await rpn(options);
            return response;
        } catch (err) {
            this.logger.error(`${customMessage}: ${err.message}`);
            throw new Exception(err.status || err.statusCode || 500, err.message);
        }
    }
}
