'use strict';

const event = require('./events');
let Arrived = false;
event.on('new-flight', (payload) => {
    setInterval(() => {
        event.emit('took-off', payload);
        console.log(`Pilot: flight with ID ${payload.flightID} took-off`);
    }, 4000);
});
event.on('took-off', (payload) => {
    setInterval(() => {
        event.emit('Arrived', payload);
        console.log(`Pilot: flight with ID ${payload.flightID} has arrived`);
    }, 3000);
})
event.on('Arrived', (payload) => {
    Arrived = true;
});