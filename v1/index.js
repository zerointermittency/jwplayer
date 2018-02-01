'use strict';

const Videos = require('./Videos');

module.exports = (client) => {
    return {
        videos: new Videos(client),
    };
};