import moment, { Duration } from 'moment';
import { TrackResponseDto } from './dto/track-response.dto';
import { Track, TrackProperties } from './track';

export class TrackMapper {
    toModel(trackResponse: TrackResponseDto): Track {
        const trackProperties: TrackProperties = {
            id: trackResponse.id,
            name: trackResponse.name,
            releaseDate: trackResponse.releaseDate.split('T')[0],
            albumName: trackResponse.albumName,
            artistName: trackResponse.artistName,
            length: this.parseTrackLengthMinutes(trackResponse.playbackSeconds),
            audioSnippet: trackResponse.previewURL,
            genres: trackResponse.links.genres.names
        };

        return new Track(trackProperties);
    }

    parseTrackLengthMinutes(playbackSeconds: number): string {
        const duration: Duration = moment.duration(playbackSeconds, 'seconds');
        const trackLength: string = `${duration.minutes()}:${
            duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds()
        }`;
        return trackLength;
    }
}
