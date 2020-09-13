import * as dotenv from 'dotenv';

dotenv.config();

export const APP = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.APP_HOST || 'http://localhost'
};
