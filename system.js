'use strict';

const event = require('./events');

event.on('system-newFlight', (payload) => {
    console.log('Flight: ', payload)
})
event.on('took-off-system', (payload) => {
    payload.event = 'took-off';
    console.log('Flight: ', payload)
})
event.on('Arrived-system', (payload) => {
    payload.event = 'arrived';
    console.log('Flight: ', payload)
})