import * as dotenv from 'dotenv';

dotenv.config();

export const LOGGING = {
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    LOG_OUTPUT_TO_FILE: process.env.LOG_OUTPUT_TO_FILE || undefined,
    LOG_FILE_NAME: process.env.LOG_FILE_NAME || '',
    LOG_FILE_DIR: process.env.LOG_FILE_DIR || './logs',
    LOG_MAX_SIZE: Number(process.env.LOG_MAX_SIZE) || 1048576, // 1MB
    LOG_BACKUPS: Number(process.env.LOG_BACKUPS) || 10
};
