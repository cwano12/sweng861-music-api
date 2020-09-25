import {
    TEST_ARTIST_WITH_BIO,
    TEST_ARTIST_DTO_WITH_BIO,
    TEST_ARTIST_DTO_NO_BIO,
    TEST_ARTIST_NO_BIO
} from '../../util/test.constants';
import { Artist } from './artist';
import { ArtistMapper } from './artist.mapper';

describe('ArtistMapper', () => {
    const testMapper: ArtistMapper = new ArtistMapper();
    describe('toModel', () => {
        describe('converting artist response dto with a bio to artist model', () => {
            it('should return an instance of Artist with a bio', () => {
                const testArtist: Artist = testMapper.toModel(TEST_ARTIST_DTO_WITH_BIO);
                expect(testArtist).toEqual(TEST_ARTIST_WITH_BIO);
            });
        });

        describe('converting artist response dto without a bio to artist model', () => {
            it('should return an instance of Artist with an empty string for bio', () => {
                const testArtist: Artist = testMapper.toModel(TEST_ARTIST_DTO_NO_BIO);
                expect(testArtist).toEqual(TEST_ARTIST_NO_BIO);
            });
        });
    });
});
