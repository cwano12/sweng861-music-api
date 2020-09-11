export interface TrackProperties {
    id: string;
    name: string;
    releaseDate: string;
    albumName: string;
    artistName: string;
    length: string;
    audioSnippet: string;
    genres: string[];
}

export class Track {
    id: string;

    name: string;

    releaseDate: string;

    albumName: string;

    artistName: string;

    length: string;

    audioSnippet: string;

    genres: string[];

    constructor(properties: TrackProperties) {
        this.id = properties.id;
        this.name = properties.name;
        this.releaseDate = properties.releaseDate;
        this.albumName = properties.albumName;
        this.artistName = properties.artistName;
        this.length = properties.length;
        this.audioSnippet = properties.audioSnippet;
        this.genres = properties.genres;
    }
}
