import { AppDependencies } from './app-dependencies';
import { MusicService } from './music/music.service';

/**
 * class to instantiate app dependencies to be injected by server
 */
export class IocContainer {
    /**
     * instantiates required dependencies and returns them
     * @returns {AppDependencies} - structure that holds all dependencies needed
     * to start the app
     */
    getAppDependencies(): AppDependencies {
        const service: MusicService = new MusicService();

        return { service };
    }
}
