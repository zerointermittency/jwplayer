'use strict';

// BASE: https://developer.jwplayer.com/jw-platform/reference/v1/methods/channels/videos/
class Videos {
    constructor(client) {
        this._client = client;
    }

    // create.html
    create(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'channels/videos/create', params);
        return client.makeRequest(url);
    }

    // delete.html
    delete(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'channels/videos/delete', params);
        return client.makeRequest(url);
    }

    // list.html
    list(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'channels/videos/list', params);
        return client.makeRequest(url);
    }

    // show.html
    show(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'channels/videos/show', params);
        return client.makeRequest(url);
    }

    // update.html
    update(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'channels/videos/update', params);
        return client.makeRequest(url);
    }
}

module.exports = Videos;
