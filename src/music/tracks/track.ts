/**
 * @interface
 * Interface to define structure of properties used to
 * instantiate instance of Track.
 */
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

/**
 * @class
 * Model of track information to return to user.
 *
 * @member {string} id - track id
 * @member {string} name - track title
 * @member {string} releaseDate - date track was released (based on album release date)
 * @member {string} albumName - name of album track appears on
 * @member {string} artistName - name of artist on track
 * @member {string} length - length of track in minutes
 * @member {string} audioSnippet - link to mp3 file with 30-second audio clip
 * @member {string[]} genres - list of genres track fits into
 */
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
