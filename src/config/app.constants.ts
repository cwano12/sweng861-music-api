import * as dotenv from 'dotenv';

dotenv.config();

export const APP = {
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
    PORT: process.env.PORT || 3000,
    HOST: process.env.APP_HOST || 'http://localhost',
    CG: {
        CONTROLLER_URI: process.env.CG_CONTROLLER_URI,
        CONTROLLER_HEALTH_URI: process.env.CG_CONTROLLER_HEALTH_URI
    }
};
