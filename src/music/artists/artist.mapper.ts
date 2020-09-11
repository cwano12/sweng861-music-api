import { ArtistResponseDto } from './dto/artist-response.dto';
import { Artist, ArtistProperties } from './artist';

export class ArtistMapper {
    toModel(artistResponse: ArtistResponseDto): Artist {
        const artistProperties: ArtistProperties = {
            id: artistResponse.id,
            name: artistResponse.name,
            bio: artistResponse.bios[0].bio,
            albums: artistResponse.albumGroups.main,
            image: artistResponse.links.images.href
        };

        return new Artist(artistProperties);
    }
}
