'use strict';

const Event = require('events');
const eventsPool = new Event();

module.exports = eventsPool;