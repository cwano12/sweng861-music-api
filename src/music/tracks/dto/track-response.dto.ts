/**
 * Class to define structure of track data
 * coming from Napster API
 *
 * @member {stirng} id - track id
 * @member {string} name - track title
 * @member {string} albumId - id of album track appears on; used to get album info
 * @member {string} albumName - name of album track appears on
 * @member {string} artistName - name of artist on track
 * @member {string} artistId - id of artist on track
 * @member {number} playbackSeconds - length of track audio in seconds
 * @member {string} previewURL - link to mp3 file with audio clip
 * @member {object} links - reference links to other resources associated with track; used for getting
 * genre info
 * @member {string} releaseDate - derived from album release date
 */
export class TrackResponseDto {
    id!: string;

    name!: string;

    albumName!: string;

    albumId!: string;

    artistName!: string;

    artistId!: string;

    playbackSeconds!: number;

    previewURL!: string;

    links!: {
        genres?: {
            ids: string[];
            names: string[];
        };
    };

    releaseDate!: string;
}
