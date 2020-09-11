import * as dotenv from 'dotenv';

dotenv.config();

export const MUSIC = {
    HOST: process.env.MUSIC_HOST || 'https://api.napster.com',
    BASE_PATH: process.env.MUSCIC_BASE_PATH || '/v2.2',
    TRACKS_URL: process.env.TRACKS_URL || '/tracks/',
    ARTISTS_URL: process.env.ARTISTS_URL || '/artists/',
    ALBUMS_URL: process.env.ALBUMS_URL || '/albums/',
    GENRES_URL: process.env.GENRES_URL || '/genres/',
    API_KEY: process.env.API_KEY
}