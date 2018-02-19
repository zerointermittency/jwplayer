'use strict';

// BASE: https://developer.jwplayer.com/jw-platform/reference/v1/methods/players/
class Players {

    constructor(client) {
        this._client = client;
    }

    // create.html
    create(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'players/create', params);
        return client.makeRequest(url);
    }

    // delete.html
    delete(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'players/delete', params);
        return client.makeRequest(url);
    }

    // list.html
    list(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'players/list', params);
        return client.makeRequest(url);
    }

    // show.html
    show(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'players/show', params);
        return client.makeRequest(url);
    }

    // update.html
    update(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'players/update', params);
        return client.makeRequest(url);
    }

}

module.exports = Players;