import { getLogger, Logger, configure } from 'log4js';
import path from 'path';
import { LOGGING } from '../../config/logging.constants';
import { AppLoggerLevel } from './enum/app-logger-level.enum';

/**
 * Logger inmplementationm that is a wrapper for log4js logger
 * @class
 *
 * @member {string} fileName - The name of the file or class that is instantiating the logger
 * @member {Logger} logger - The instance of Logger from log4js package
 * @static @member {Array<AppLogger>} instances - static array to track all instances of logger created
 */
export class AppLogger {
    fileName: string;

    logger: Logger;

    // track all logger instances to change log level for all at the same time
    static instances: Array<AppLogger> = [];

    /**
     * @constructor
     * @param {string} fileName - The name of the file or class that is instantiating the logger
     */
    constructor(fileName: string, logToFile = LOGGING.LOG_OUTPUT_TO_FILE) {
        this.fileName = fileName;
        this.logger = getLogger(this.fileName);
        // default logging level to LOG_LEVEL env var
        this.logger.level = LOGGING.LOG_LEVEL;

        // if logs need to be output to file, configure log files
        if (logToFile) {
            configure({
                appenders: {
                    file: {
                        type: 'file',
                        filename: path.join(LOGGING.LOG_FILE_DIR, LOGGING.LOG_FILE_NAME),
                        category: 'default',
                        maxLogSize: LOGGING.LOG_MAX_SIZE,
                        backups: LOGGING.LOG_BACKUPS,
                        keepFileExt: true
                    }
                },
                categories: {
                    default: { appenders: ['file'], level: LOGGING.LOG_LEVEL }
                }
            });
        }

        AppLogger.instances.push(this);
    }

    /**
     * Identifies the calling function so that it can be included in the log message
     * @returns {string} - the name of the calling method or function
     */
    getCallingFunctionIdentifier(): string {
        // create an error object to access stacktrace
        const stack: string = new Error().stack as string;
        let callerId: string = '';
        if (
            stack.includes('async') &&
            (stack.includes('AppLogger.error') || stack.includes('AppLogger.warn'))
        ) {
            // message is logging an error; calling function will be lower in stacktrace
            callerId = stack
                .split('\n')[5]
                .trim()
                .split(' ')[2];
            callerId = callerId.split('.')[1] || callerId.split('.')[0];
        } else {
            callerId = stack
                .split('\n')[3]
                .trim()
                .split(' ')[1];
            callerId = callerId.split('.')[1] || callerId.split('.')[0];
        }

        return callerId;
    }

    /**
     * Validates passed in log level and interates through all logger instances to set
     * to the validated logging level
     * @param {string} logLevel - log level passed in from request
     * @returns {string} level - the level that the loggers have been set to
     */
    static setLogLevel(logLevel: string): string {
        const level: string = AppLogger.validateLogLevel(logLevel);

        // change log level for all instances of AppLogger
        AppLogger.instances.forEach(instance => {
            instance.logger.level = level;
        });

        return level;
    }

    /**
     * checks to see if passed in log level is in AppLoggerLevel enum
     * @param {string} logLevel - log level passed in from request
     * @returns {string} logLevel
     */
    private static validateLogLevel(logLevel: string): string {
        if (!(Object.values(AppLoggerLevel) as string[]).includes(logLevel.toLowerCase())) {
            // if not a valid log level, set to default
            logLevel = LOGGING.LOG_LEVEL;
        }
        return logLevel.toLowerCase();
    }

    trace(message: string): void {
        this.logger.trace(`${this.getCallingFunctionIdentifier()}: ${message}`);
    }

    debug(message: string): void {
        this.logger.debug(`${this.getCallingFunctionIdentifier()}: ${message}`);
    }

    info(message: string): void {
        this.logger.info(`${this.getCallingFunctionIdentifier()}: ${message}`);
    }

    warn(message: string): void {
        this.logger.warn(`${this.getCallingFunctionIdentifier()}: ${message}`);
    }

    error(message: string): void {
        this.logger.error(`${this.getCallingFunctionIdentifier()}: ${message}`);
    }

    fatal(message: string): void {
        this.logger.fatal(`${this.getCallingFunctionIdentifier()}: ${message}`);
    }
}
