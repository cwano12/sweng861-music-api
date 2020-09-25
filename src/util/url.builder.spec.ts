import { UrlBuilder } from './url.builder';
import {
    TEST_URL_ARG,
    TEST_SECOND_URL_ARG,
    TEST_MULTI_ARG_URL_STRING
} from './test.constants';

describe('UrlBuilder', () => {
    const testBuilder: UrlBuilder = new UrlBuilder();
    describe('getUrl', () => {
        describe('getting url with no args', () => {
            it('should return an empty string', () => {
                const testUrl: string = testBuilder.getUrl();
                expect(testUrl).toEqual('');
            });
        });

        describe('getting url with one arg', () => {
            it('should return the arg unchanged', () => {
                const testUrl: string = testBuilder.getUrl(TEST_URL_ARG);
                expect(testUrl).toEqual(TEST_URL_ARG);
            });
        });

        describe('getting url with multiple args', () => {
            it('should return a concatenated string of the args', () => {
                const testUrl: string = testBuilder.getUrl(TEST_URL_ARG, TEST_SECOND_URL_ARG);
                expect(testUrl).toEqual(TEST_MULTI_ARG_URL_STRING);
            });
        });
    });
});
