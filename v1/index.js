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
        status: () => new Promise((resolve, reject) => {
            // https://developer.jwplayer.com/jw-platform/reference/v1/methods/status.html
            const url = client.buildRequest('v1', 'status');
            client.makeRequest(url, {}, 'text')
                .then((data) => {
                    const dataLines = data.split('\n'),
                        response = {};
                    for (let i = 0; i < dataLines.length; i++) {
                        const dataLine = dataLines[i],
                            keyValue = dataLine.split(':');
                        if (keyValue.length === 2) {
                            const key = keyValue[0].trim();
                            let value = keyValue[1].trim();
                            if (key === 'timestamp')
                                value = parseInt(value);
                            else if (key === 'maintenance')
                                value = value === 'True';
                            response[key] = value;
                        }
                    }
                    resolve(response);
                })
                .catch(reject);
        }),
    };
};
