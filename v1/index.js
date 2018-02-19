'use strict';

const Accounts = require('./Accounts'),
    Channels = require('./Channels'),
    Players = require('./Players'),
    Videos = require('./Videos');

module.exports = (client) => {
    return {
        accounts: new Accounts(client),
        channels: new Channels(client),
        players: new Players(client),
        videos: new Videos(client),
        status: () => {
            // https://developer.jwplayer.com/jw-platform/reference/v1/methods/status.html
            const url = client.buildRequest('v1', 'status');
            return client.makeRequest(url);
        },
    };
};