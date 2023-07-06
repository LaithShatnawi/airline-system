'use strict';
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT;
const io = require('socket.io-client');
let systemConnection = io.connect(`http://localhost:${port}/`);

setInterval(() => {
    const Flight = {
        event: 'new-flight',
        time: faker.date.future({ refDate: '2023-07-04T00:00:00.000Z' }),
        Details: {
            airLine: 'Royal Jordanian Airlines',
            destination: faker.location.country(),
            pilot: faker.person.fullName(),
            flightID: uuidv4(),
        },
    }
    console.log('...........................................................')
    console.log(`Manager: new flight with ID ${Flight.Details.flightID} have been scheduled`);
    systemConnection.emit('new-flight', Flight);
    systemConnection.emit('system-newFlight', Flight);
}, 10000);

systemConnection.on('thankYou', (payload) => {
    setTimeout(() => {
        console.log(`Manager: we’re greatly thankful for the amazing flight, ${payload.Details.pilot}`)
    }, 1000);
})