'use strict';

// BASE: https://developer.jwplayer.com/jw-platform/reference/v1/methods/videos/tags/
class Tags {

    constructor(client) {
        this._client = client;
    }

    // list.html
    list(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'videos/tags/list', params);
        return client.makeRequest(url);
    }

}

module.exports = Tags;