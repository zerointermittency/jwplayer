'use strict';

const Tags = require('./Tags.js'),
    Templates = require('./Templates.js'),
    Usage = require('./Usage.js');

// BASE: https://developer.jwplayer.com/jw-platform/reference/v1/methods/accounts/
class Accounts {

    constructor(client) {
        this._client = client;

        // tags/index.html
        this.tags = new Tags(client);
        // templates/index.html
        this.templates = new Templates(client);
        // usage/index.html
        this.usage = new Usage(client);
    }

    // show.html
    show(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'accounts/show', params);
        return client.makeRequest(url);
    }

    // update.html
    update(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'accounts/update', params);
        return client.makeRequest(url);
    }

}

module.exports = Accounts;