import { TrackMapper } from './track.mapper';

describe('TrackMapper', () => {
    const testMapper: TrackMapper = new TrackMapper();
    // describe('toModel', () => {
    //     describe('converting track response dto to track model', () => {
    //         it('should return an instance of track', () => {
    //             const testTrack: Track = testMapper.toModel;
    //         });
    //     });
    // });

    describe('parseTrackLengthMinutes', () => {
        describe('parsing track length minutes with playback seconds less than 10', () => {
            it('should return a value in seconds prepended with 0', () => {
                const testLength: string = testMapper.parseTrackLengthMinutes(Math.floor(Math.random() * 10));
                console.log(testLength);
                expect(testLength.split(':')[1].charAt(0)).toBe('0');
            });
        });

        describe('parsing track length minutes with playback seconds less than 60', () => {
            it('should return a value less than one minute', () => {
                const testLength: string = testMapper.parseTrackLengthMinutes(
                    Math.floor(Math.random() * 60)
                );
                console.log(testLength);
                expect(Number(testLength.split(':')[0])).toBeLessThan(1);
            });
        });

        describe('parsing track length minutes with playback seconds greater than 60', () => {
            it('should return a value greater than one minute', () => {
                const testLength: string = testMapper.parseTrackLengthMinutes(61);
                console.log(testLength);
                expect(Number(testLength.split(':')[1])).toBeGreaterThan(0);
                expect(Number(testLength.split(':')[0])).toBeGreaterThanOrEqual(1);
            });
        });
    });
});
