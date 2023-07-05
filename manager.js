'use strict';
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const event = require('./events');
require('./pilot');
require('./system');

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
    event.emit('new-flight', Flight);
    event.emit('system-newFlight', Flight);
}, 10000);
event.on('thankYou', (payload) => {
    setTimeout(() => {
        console.log(`Manager: we’re greatly thankful for the amazing flight, ${payload.Details.pilot}`)
    }, 1000);
})