/* eslint-disable @typescript-eslint/unbound-method */
import express, { Request, Response, Application, Router } from 'express';
import { MusicService } from '../music/music.service';
import { AppLogger } from '../util/logging/app.logger';
import { RouterProperties } from './router-properties';

/**
 * wrapper for express router implementation
 * @class
 *
 * @member {AppLogger} logger - logger for this class
 * @member {experss.Router} router - express router implementation
 * @static @member {MusicService} service - instance of MusicService to be used by the route handlers
 * @static @member {AppRouter} instance - class field to track instances of this class;
 * helps to enforce Singleton pattern
 */
export class AppRouter {
    logger: AppLogger = new AppLogger(this.constructor.name);

    router: Router = express.Router();

    static app: Application;

    static service: MusicService;

    static instance: AppRouter;

    private constructor(routerProperties: RouterProperties) {
        AppRouter.app = routerProperties.app;
        AppRouter.service = routerProperties.service;
    }

    /**
     * static create method to enforce Singleton pattern
     * @static
     * @param routerProperties - the propreties needed to create the router;
     * { app: express.Application, service: any }
     */
    static create(routerProperties: RouterProperties): AppRouter {
        if (AppRouter.instance) {
            return AppRouter.instance;
        }
        AppRouter.instance = new AppRouter(routerProperties);
        return AppRouter.instance;
    }

    /**
     * route handler for healthcheck
     * @param {express.Request} req - request object
     * @param {express.Response} res - response object
     */
    healthcheckHandler(req: Request, res: Response): void {
        res.status(200).send('Health is good');
    }

    /**
     * route handler for changing log level
     * @param {express.Request} req - request object
     * @param {express.Response} res - response object
     */
    loggingHandler(req: Request, res: Response): void {
        const logLevel: string = AppLogger.setLogLevel(req.params.logLevel);
        const responseMessage: string = `Log level is now set to ${logLevel}.`;

        res.send(responseMessage);
    }

    /**
     * route handler for getting tracks by title
     * @param {express.Request} req - request object
     * @param {express.Response} res - response object
     */
    async tracksByTitleHandler(req: Request, res: Response): Promise<void> {
        req.setTimeout(300000);
        try {
            res.status(200).send(
                await AppRouter.service.getTracksByName(req.params.songTitle)
            );
        } catch (error) {
            // some error types have status; others have statusCode; some have no status - default to 500
            res.status(error.status || error.statusCode || 500).send(error.message);
        }
    }

    /**
     * route handler for getting tracks by title
     * @param {express.Request} req - request object
     * @param {express.Response} res - response object
     */
    async tracksByTitleAndArtistHandler(req: Request, res: Response): Promise<void> {
        req.setTimeout(300000);
        try {
            res.status(200).send(
                await AppRouter.service.getTracksByNameAndArtist(
                    req.params.songTitle,
                    req.params.artistName
                )
            );
        } catch (error) {
            // some error types have status; others have statusCode; some have no status - default to 500
            res.status(error.status || error.statusCode || 500).send(error.message);
        }
    }

    /**
     * route handler for getting artists
     * @param {express.Request} req - request object
     * @param {express.Response} res - response object
     */
    async artistsHandler(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).send(
                await AppRouter.service.getArtistsByName(req.params.artistName)
            );
        } catch (error) {
            // some error types have status; others have statusCode; some have no status - default to 500
            res.status(error.status || error.statusCode || 500).send(error.message);
        }
    }

    /**
     * initializer for AppRouter; sets up route mappings
     * @param {express.Application} app - instance of express application; used to
     * add this router as middleware
     */
    init(): void {
        /**
         * tracks by title route
         * @route 'GET /tracks/:songTitle'
         */
        this.router.get('/tracks/:songTitle', this.tracksByTitleHandler);

        /**
         * tracks by title and artist route
         * @route 'GET /tracks/:songTitle/:artistName'
         */
        this.router.get('/tracks/:songTitle/:artistName', this.tracksByTitleAndArtistHandler);

        /**
         * artists route
         * @route 'GET /artist/:artistName'
         */
        this.router.get('/artist/:artistName', this.artistsHandler);

        /**
         * healthcheck route
         * @route 'GET /healthcheck'
         */
        this.router.get('/healthcheck', this.healthcheckHandler);

        /**
         * admin route for changing log level on the fly
         * @route 'GET /admin/logging/:logLevel'
         */
        this.router.get('/admin/logging/:logLevel', this.loggingHandler);

        AppRouter.app.use('/', this.router);
    }
}
