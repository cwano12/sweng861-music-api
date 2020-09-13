import { ArtistResponseDto } from './dto/artist-response.dto';
import { Artist, ArtistProperties } from './artist';

/**
 * Utility class used to convert raw track response
 * from Napster to Track model to be returned to user.
 */
export class ArtistMapper {
    /**
     * This method takes in a raw response from Napster API and converts to
     * Artist model.
     *
     * @param {ArtistResponseDto} artistResponse - the raw artist info from Napster API
     * @returns {Artist} - instance of Artist model class
     */
    toModel(artistResponse: ArtistResponseDto): Artist {
        // map raw data to equivalent field in model
        const artistProperties: ArtistProperties = {
            id: artistResponse.id,
            name: artistResponse.name,
            bio: artistResponse.bios ? artistResponse.bios[0].bio : '',
            albums: artistResponse.albumGroups.main,
            image: artistResponse.links.images.href
        };

        return new Artist(artistProperties);
    }
}
