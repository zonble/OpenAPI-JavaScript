import { CHARTS as ENDPOINT } from '../Endpoint'
import Fetcher from './Fetcher'

/**
 * The fetcher that can fetch chart playlists.
 * @see https://docs-en.kkbox.codes/v1.1/reference#charts
 */
export default class ChartFetcher extends Fetcher {
    /**
     * @ignore
     */
    constructor(http, territory = 'TW') {
        super(http, territory)

        /**
         * @ignore
         */
        this.playlistID = undefined
    }

    /**
     * Fetch chart playlists.
     *
     * @return {Promise}
     * @example api.chartFetcher.fetchCharts()
     * @see https://docs-en.kkbox.codes/v1.1/reference#charts_1
     */
    fetchCharts() {
        return this.http.get(ENDPOINT, {
            territory: this.territory
        })
    }

    /**
     * Init the chart fetcher.
     *
     * @param {string} playlistID - The playlist ID.
     * @return {ChartFetcher}
     * @see https://docs-en.kkbox.codes/v1.1/reference#charts-playlist_id
     */
    setPlaylistID(playlistID) {
        this.playlistID = playlistID
        return this
    }

    /**
     * Fetch playlist of the chart you set.
     *
     * @return {Promise}
     * @example api.chartFetcher.setPlaylistID('4mJSYXvueA8t0odsny').fetchMetadata()
     * @see https://docs-en.kkbox.codes/v1.1/reference#charts-playlist_id
     */
    fetchMetadata() {
        return this.http.get(ENDPOINT + '/' + this.playlistID, {
            territory: this.territory
        })
    }

    /**
     * Fetch tracks of the playlist with the chart fetcher you init. Result will be paged.
     *
     * @param {number} [limit] - The size of one page.
     * @param {number} [offset] - The offset index for first element.
     * @return {Promise}
     * @example api.chartFetcher.setPlaylistID('4mJSYXvueA8t0odsny').fetchTracks()
     * @see https://docs-en.kkbox.codes/v1.1/reference#charts-playlist_id-tracks
     */
    fetchTracks(limit = undefined, offset = undefined) {
        return this.http.get(ENDPOINT + '/' + this.playlistID + '/tracks', {
            territory: this.territory,
            limit: limit,
            offset: offset
        })
    }
}
