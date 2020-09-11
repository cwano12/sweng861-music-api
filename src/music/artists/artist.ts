export interface ArtistProperties {
    id: string;
    name: string;
    bio: string;
    albums: string[];
    image: string;
}

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
