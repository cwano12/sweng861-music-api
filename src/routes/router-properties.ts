import { Application } from 'express';
import { MusicService } from '../music/music.service';

export type RouterProperties = {
    app: Application;
    service: MusicService;
};
