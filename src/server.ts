/**
 * @fileoverview
 * gets the dependencies needed to create the app,
 * creates the app, and starts it
 */
import { App } from './app';
import { AppLogger } from './util/logging/app.logger';
import { AppDependencies } from './app-dependencies';
import { IocContainer } from './ioc-container';

const logger: AppLogger = new AppLogger('server');
const appDependencies: AppDependencies = new IocContainer().getAppDependencies();
const app = new App(appDependencies);

const server = app.start(logger);

export default server;
