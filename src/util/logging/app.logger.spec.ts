import { AppLogger } from './app.logger';
import { JEST_TEST_FUNCTION_NAME } from '../test.constants';

describe('AppLogger', () => {
    const testLogger: AppLogger = new AppLogger('test');
    describe('getCallingFunctionIdentifier', () => {
        describe('getting calling function identifier', () => {
            it('should return name of jest test function', () => {
                const testCallerId: string = testLogger.getCallingFunctionIdentifier();
                expect(testCallerId).toBe(JEST_TEST_FUNCTION_NAME);
            });
        });
    });
});
