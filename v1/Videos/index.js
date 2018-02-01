'use strict';

const Conversions = require('./Conversions.js'),
    url = {
        format: require('url').format,
    };

// BASE: https://developer.jwplayer.com/jw-platform/reference/v1/methods/videos/
class Videos {

    constructor(client) {
        this._client = client;

        // conversions/index.html
        this.conversions = new Conversions(client);
    }

    // create.html
    create(params) {
        const client = this._client,
            url = this._client.buildRequest('v1', 'videos/create', params);
        return client.makeRequest(url);
    }

    // delete.html
    delete(params) {
        const client = this._client,
            url = this._client.buildRequest('v1', 'videos/delete', params);
        return client.makeRequest(url);
    }

    // list.html
    list(params) {
        const client = this._client,
            url = client.buildRequest('v1', 'videos/list', params);
        return client.makeRequest(url);
    }

    // show.html
    show(params) {
        const client = this._client,
            url = this._client.buildRequest('v1', 'videos/show', params);
        return client.makeRequest(url);
    }

    // update.html
    update() {
        const client = this._client,
            url = this._client.buildRequest('v1', 'videos/update', null);
        return client.makeRequest(url);
    }

    getUploadUrl(params = {}) {
        return this.create(params)
            .then((response) => {
                const link = response.link;
                return {
                    uploadUrl: url.format({
                        protocol: link.protocol,
                        hostname: link.address,
                        pathname: link.path,
                        query: {
                            api_format: 'json',
                            key: link.query.key,
                            token: link.query.token,
                        },
                    }),
                    progressUrl: url.format({
                        protocol: link.protocol,
                        hostname: link.address,
                        pathname: 'progress',
                        query: {
                            token: link.query.token,
                            key: link.query.key,
                        },
                    }),
                };
            });
    }

}

module.exports = Videos;