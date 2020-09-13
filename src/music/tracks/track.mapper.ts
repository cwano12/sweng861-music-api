import moment, { Duration } from 'moment';
import { TrackResponseDto } from './dto/track-response.dto';
import { Track, TrackProperties } from './track';

/**
 * Utility class used to convert raw track response
 * from Napster to Track model to be returned to user.
 */
export class TrackMapper {
    /**
     * This method takes in a raw response from Napster API and converts to
     * Track model.
     *
     * @param {TrackResponseDto} trackResponse - the raw track info from Napster API
     * @returns {Track} - instance of Track model class
     */
    toModel(trackResponse: TrackResponseDto): Track {
        // map raw data to equivalent field in model
        const trackProperties: TrackProperties = {
            id: trackResponse.id,
            name: trackResponse.name,
            releaseDate: new Date(trackResponse.releaseDate.split('T')[0]).toDateString(),
            albumName: trackResponse.albumName,
            artistName: trackResponse.artistName,
            length: this.parseTrackLengthMinutes(trackResponse.playbackSeconds),
            audioSnippet: trackResponse.previewURL,
            genres: trackResponse.links.genres.names
        };

        return new Track(trackProperties);
    }

    /**
     * This method takes in number of seconds and converts it to minutes.
     *
     * @param {number} playbackSeconds - length of track audio in secons
     * @returns {string} - track audio lenght in format minutes:seconds
     */
    parseTrackLengthMinutes(playbackSeconds: number): string {
        const duration: Duration = moment.duration(playbackSeconds, 'seconds');
        const trackLength: string = `${duration.minutes()}:${
            duration.seconds() < 10 ? `0${duration.seconds()}` : duration.seconds()
        }`;
        return trackLength;
    }
}
