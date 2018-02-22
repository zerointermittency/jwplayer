'use strict';

const querystring = {
        stringify: require('querystring').stringify,
    },
    crypto = {
        createHash: require('crypto').createHash,
    },
    Agent = {
        http: require('http').Agent,
        https: require('https').Agent,
    },
    fetch = require('node-fetch'),
    NonceFast = require('nonce-fast'),
    packageVersion = require('../package.json').version,
    errors = require('./errors.js'),
    debug = require('debug')('zi-jwplayer:client');

class Client {
    constructor(key, secret, opts = {}) {
        this._key = key || process.env.JWPLAYER_API_KEY;
        this._secret = secret || process.env.JWPLAYER_API_SECRET;
        this._nonce = NonceFast(opts.nonceLength || process.env.JWPLAYER_NONCE_LENGTH);

        this._protocol = opts.protocol || 'https';
        this._host = opts.host || 'api.jwplatform.com';
        this._userAgent = `node-jwplayer/${opts.userAgent || '@zerointermittency'}`;
        this._apiFormat = 'json';

        const ProtocolAgent = Agent[this._protocol];
        this._agent = new ProtocolAgent({keepAlive: true});
    }

    _sortParams(params) {
        const sortedParams = {},
            keysToOrder = Object.keys(params).sort();

        for (let keyIndex = 0; keyIndex < keysToOrder.length; keyIndex++) {
            const keyToOrder = keysToOrder[keyIndex];
            sortedParams[keyToOrder] = params[keyToOrder];
        }

        return sortedParams;
    }

    buildRequest(apiVersion, path, params) {
        const url = `${this._protocol}://${this._host}/${apiVersion}/${path}`;
        debug(url, params);

        params = (params != undefined) ? Object.assign({}, params) : {};

        params['api_nonce'] = this._nonce();
        params['api_timestamp'] = Math.floor(Date.now() / 1000);
        params['api_key'] = this._key;
        params['api_format'] = this._apiFormat;
        params['api_kit'] = `${this._userAgent}-${packageVersion}`;
        params = this._sortParams(params);

        const paramsUrlEncoded = querystring.stringify(params),
            hash = crypto.createHash('sha1'),
            data = paramsUrlEncoded + this._secret;

        params['api_signature'] = hash.update(data, 'utf8').digest('hex');
        params = querystring.stringify(params);

        return `${url}?${params}`;
    }

    makeRequest(url, headers = {}) {
        debug(url);
        return new Promise((resolve, reject) => {
            headers = Object.assign({}, headers);
            headers['User-Agent'] = this._userAgent;

            let response;
            fetch(url, {method: 'GET', headers, agent: this._agent})
                .then((res) => {
                    debug(`Status code: ${res.status}`);
                    response = res;
                    return response.json();
                })
                .then((data) => {
                    if (response.status !== 200) {
                        if (data.status === 'error') {
                            debug(`JWPlayer error - Message: ${data['message']}`);
                            const JWPlayerError = errors[`JWPlatform${data['code']}Error`];
                            if (JWPlayerError)
                                return reject(
                                    JWPlayerError(data['message'])
                                );
                            return reject(
                                errors.JWPlatformUnknownError(data['message'])
                            );
                        }
                        const dataText = JSON.stringify(data);
                        debug(`JWPlayer unknown error - Message: ${dataText}`);
                        return reject(
                            errors.JWPlatformUnknownError(dataText)
                        );
                    }
                    resolve(data);
                })
                .catch((error) => {
                    if (error.type === 'invalid-json')
                        return reject(errors.JWPlatformInvalidJSON(error.message));

                    if (error.type === 'body-timeout')
                        return reject(errors.JWPlatformTimeout(error.message));

                    reject(error);
                });
        });
    }
}

module.exports = Client;
