import {
    TEST_TRACK_WITH_GENRES,
    TEST_TRACK_DTO_WITH_GENRES,
    TEST_TRACK_DTO_NO_GENRES,
    TEST_TRACK_NO_GENRES
} from '../../util/test.constants';
import { Track } from './track';
import { TrackMapper } from './track.mapper';

describe('TrackMapper', () => {
    const testMapper: TrackMapper = new TrackMapper();
    describe('toModel', () => {
        describe('converting track response dto with genres to track model', () => {
            it('should return an instance of track with genres', () => {
                const testTrack: Track = testMapper.toModel(TEST_TRACK_DTO_WITH_GENRES);
                expect(testTrack).toEqual(TEST_TRACK_WITH_GENRES);
            });
        });

        describe('converting track response dto without genres to track model', () => {
            it('should return an instance of track without genres', () => {
                const testTrack: Track = testMapper.toModel(TEST_TRACK_DTO_NO_GENRES);
                expect(testTrack).toEqual(TEST_TRACK_NO_GENRES);
            });
        });
    });

    describe('parseTrackLengthMinutes', () => {
        describe('parsing track length minutes with playback seconds less than 10', () => {
            it('should return a value in seconds prepended with 0', () => {
                const testLength: string = testMapper.parseTrackLengthMinutes(
                    Math.floor(Math.random() * 10)
                );

                expect(testLength.split(':')[1].charAt(0)).toBe('0');
            });
        });

        describe('parsing track length minutes with playback seconds less than 60', () => {
            it('should return a value less than one minute', () => {
                const testLength: string = testMapper.parseTrackLengthMinutes(
                    Math.floor(Math.random() * 60)
                );

                expect(Number(testLength.split(':')[0])).toBeLessThan(1);
            });
        });

        describe('parsing track length minutes with playback seconds greater than 60', () => {
            it('should return a value greater than one minute', () => {
                const testLength: string = testMapper.parseTrackLengthMinutes(61);

                expect(Number(testLength.split(':')[1])).toBeGreaterThan(0);
                expect(Number(testLength.split(':')[0])).toBeGreaterThanOrEqual(1);
            });
        });
    });
});
