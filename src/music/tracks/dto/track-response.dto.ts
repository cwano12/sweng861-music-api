import { Genre } from '../../types/genre';

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
        genres: {
            ids: string[];
            names: string[];
        };
    };

    releaseDate!: string;
}
