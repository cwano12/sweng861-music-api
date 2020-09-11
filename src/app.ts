import express, { Application } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { Server } from 'http';
import { AppRouter } from './routes/router';
import * as swaggerDocument from './api/swagger.json';
import { AppLogger } from './util/logging/app.logger';
import { APP } from './config/app.constants';
import { AppDependencies } from './app-dependencies';
import { RouterProperties } from './routes/router-properties';

/**
 * Sample express Application implementation
 */
export class App {
    app: Application = express();

    logger: AppLogger = new AppLogger(this.constructor.name);

    /**
     * @constructor
     * Sets port and host; sets up middleware and router
     */
    constructor(appDependencies: AppDependencies) {
        this.app.set('port', APP.PORT);
        this.app.set('host', APP.HOST);

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        // implement swagger
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        // set up the router
        const routerProperties: RouterProperties = {
            app: this.app,
            service: appDependencies.service
        };
        AppRouter.create(routerProperties).init();
    }

    /**
     * Starts the app and logs start message
     */
    public start = (logger: AppLogger): Server => {
        return this.app.listen(this.app.get('port'), () => {
            logger.info(
                ` App is running at ${this.app.get('host')}:${this.app.get(
                    'port'
                )} in ${this.app.get('env')} mode`
            );
            logger.info(' Press CTRL-C to stop\n');
        });
    };
}
