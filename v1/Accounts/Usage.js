'use strict';

// BASE: https://developer.jwplayer.com/jw-platform/reference/v1/methods/accounts/usage/
class Usage {

    constructor(client) {
        this._client = client;
    }

    // list.html
    list(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'accounts/usage/list', params);
        return client.makeRequest(url);
    }

    // show.html
    show(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'accounts/usage/show', params);
        return client.makeRequest(url);
    }

}

module.exports = Usage;