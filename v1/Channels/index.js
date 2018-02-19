'use strict';

const Videos = require('./Videos.js');

// BASE: https://developer.jwplayer.com/jw-platform/reference/v1/methods/channels/
class Channels {

    constructor(client) {
        this._client = client;

        // videos/index.html
        this.videos = new Videos(client);
    }

    // create.html
    create(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'channels/create', params);
        return client.makeRequest(url);
    }

    // delete.html
    delete(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'channels/delete', params);
        return client.makeRequest(url);
    }

    // list.html
    list(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'channels/list', params);
        return client.makeRequest(url);
    }

    // show.html
    show(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'channels/show', params);
        return client.makeRequest(url);
    }

    // update.html
    update(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'channels/update', params);
        return client.makeRequest(url);
    }

}

module.exports = Channels;