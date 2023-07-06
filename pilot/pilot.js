'use strict';
require('dotenv').config();
const port = process.env.PORT;
const io = require('socket.io-client');
let systemConnection = io.connect(`http://localhost:${port}/`);
let airlineConnection = io.connect(`http://localhost:${port}/airline`);

systemConnection.on('newFlight', (payload) => {
    setTimeout(() => {
        console.log(`Pilot: flight with ID ${payload.Details.flightID} took-off`);
        airlineConnection.emit('took-off', payload);
    }, 4000);
});
airlineConnection.on('tookOff', (payload) => {
    setTimeout(() => {
        console.log(`Pilot: flight with ID ${payload.Details.flightID} has arrived`);
        systemConnection.emit('Arrived', payload);
    }, 3000);
})
systemConnection.on('Arrived', (payload) => {
    systemConnection.emit('thankYou', payload);
});