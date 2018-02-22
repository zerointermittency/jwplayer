'use strict';

// BASE: https://developer.jwplayer.com/jw-platform/reference/v1/methods/videos/tracks/
class Tracks {
    constructor(client) {
        this._client = client;
    }

    // create.html
    create(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'videos/tracks/create', params);
        return client.makeRequest(url);
    }

    // delete.html
    delete(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'videos/tracks/delete', params);
        return client.makeRequest(url);
    }

    // list.html
    list(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'videos/tracks/list', params);
        return client.makeRequest(url);
    }

    // show.html
    show(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'videos/tracks/show', params);
        return client.makeRequest(url);
    }

    // update.html
    update(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'videos/tracks/update', params);
        return client.makeRequest(url);
    }
}

module.exports = Tracks;
