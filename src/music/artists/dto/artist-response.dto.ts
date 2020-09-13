import { Bio } from '../../types/bio';

/**
 * Class to define structure of artist data
 * coming from Napster API
 *
 * @member {stirng} id - artist id
 * @member {string} name - aritst name
 * @member {Bio[]} bios - list of bios about the artist
 * @member {object} albumGroups - list of album categories associated with artist
 * @member {object} links - list of links to resources associated with artist; used to
 * get image of artist
 */
export class ArtistResponseDto {
    id!: string;

    name!: string;

    bios!: Bio[];

    albumGroups!: { main: string[] };

    links!: { images: { href: string } };
}
