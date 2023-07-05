'use strict';

const event = require('./events');
let Arrived = false;
event.on('new-flight', (payload) => {
    setTimeout(() => {
        event.emit('took-off', payload);
        console.log(`Pilot: flight with ID ${payload.Details.flightID} took-off`);
        event.emit('took-off-system', payload)
    }, 4000);
});
event.on('took-off', (payload) => {
    setTimeout(() => {
        console.log(`Pilot: flight with ID ${payload.Details.flightID} has arrived`);
        event.emit('Arrived', payload);
        event.emit('Arrived-system', payload)
    }, 3000);
})
event.on('Arrived', (payload) => {
    event.emit('thankYou', payload);
});