import { IocContainer } from './ioc-container';
import { AppDependencies } from './app-dependencies';

describe('IocContainer', () => {
    const testContainer: IocContainer = new IocContainer();
    describe('getAppDependencies', () => {
        describe('getting app dependencies', () => {
            it('should return an dependencies that include an instance of MusicService', () => {
                const testDependencies: AppDependencies = testContainer.getAppDependencies();
                expect(testDependencies.service.constructor.name).toBe('MusicService');
            });
        });
    });
});
