/**
 * Utility class for building urls based on
 * array of string args passed in.
 */
export class UrlBuilder {
    getUrl(...args: string[]): string {
        let url: string = '';
        args.forEach(arg => {
            url += arg;
        });
        return url;
    }
}
