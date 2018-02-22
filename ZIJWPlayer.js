'use strict';

class ZIJWPlayer {
    constructor(client) {
        this._client = client;
        this._api = {};
    }

    _loadApi(version) {
        let apiVersion = this._api[version];
        if (apiVersion == undefined) {
            apiVersion = require(`./${version}`)(this._client);
            this._api[version] = apiVersion;
        }
        return apiVersion;
    }

    get v1() {
        return this._loadApi('v1');
    }

    get v2() {
        return this._loadApi('v2');
    }
}

module.exports = ZIJWPlayer;
module.exports.Client = require('./libs/Client.js');
