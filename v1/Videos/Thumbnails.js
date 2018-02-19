'use strict';

// BASE: https://developer.jwplayer.com/jw-platform/reference/v1/methods/videos/thumbnails/
class Thumbnails {

    constructor(client) {
        this._client = client;
    }

    // show.html
    show(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'videos/thumbnails/show', params);
        return client.makeRequest(url);
    }

    // update.html
    update(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'videos/thumbnails/update', params);
        return client.makeRequest(url);
    }

}

module.exports = Thumbnails;