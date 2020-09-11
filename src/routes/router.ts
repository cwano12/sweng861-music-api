/* eslint-disable @typescript-eslint/unbound-method */
import express, { Request, Response, Application, Router } from 'express';
import { AppLogger } from '../util/logging/app.logger';
import { RouterProperties } from './router-properties';

/**
 * wrapper for express router implementation
 * @class
 *
 * @member {AppLogger} logger - logger for this class
 * @member {experss.Router} router - express router implementation
 * @static @member service - service to be used by the route handlers
 * @static @member instance - class field to track instances of this class;
 * helps to enforce Singleton pattern
 */
export class AppRouter {
    logger: AppLogger = new AppLogger(this.constructor.name);

    router: Router = express.Router();

    static app: Application;

    static service: any;

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
     * route handler for displaying 'Hello World!'
     * @param {express.Request} req - request object
     * @param {express.Response} res  - response object
     */
    helloWorldHandler(req: Request, res: Response): void {
        res.status(200).send(AppRouter.service.getHello());
    }

    /**
     * route handler for sending test request to reqres.in test API;
     * demonstrates the use of RequestPromiseWrapper to send requests
     * @param {express.Request} req - request object
     * @param {express.Response} res - response object
     */
    async testRequestHandler(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).send(await AppRouter.service.sendTestRequest());
        } catch (error) {
            // some error types have status; others have statusCode; some have no status - default to 500
            res.status(error.status || error.statusCode || 500).send(error.message);
        }
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
     * initializer for AppRouter; sets up route mappings
     * @param {express.Application} app - instance of express application; used to
     * add this router as middleware
     */
    init(): void {
        /**
         * route for displaying 'Hello World!'
         * @route 'GET /'
         */
        this.router.get('/', this.helloWorldHandler);

        /**
         * route for demonstrating sending a request; hits a test API called reqres.in
         * @route 'GET /request'
         */
        this.router.get('/request', this.testRequestHandler);

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
