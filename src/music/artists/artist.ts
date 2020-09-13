/**
 * @interface
 * Interface to define structure of properties used to
 * instantiate instance of Artist.
 */
export interface ArtistProperties {
    id: string;
    name: string;
    bio: string;
    albums: string[];
    image: string;
}

/**
 * @class
 * Model of artist information to return to user.
 *
 * @member {string} id - artist id
 * @member {string} name - artist name
 * @member {string} bio - information about the artist
 * @member {string[]} albums - list of albums in artist's discography
 * @member {string} image - link to image of artist
 */
export class Artist {
    id: string;

    name: string;

    bio: string;

    albums: string[];

    image: string;

    constructor(properties: ArtistProperties) {
        this.id = properties.id;
        this.name = properties.name;
        this.bio = properties.bio;
        this.albums = properties.albums;
        this.image = properties.image;
    }
}
