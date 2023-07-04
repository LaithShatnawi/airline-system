'use strict';
const { faker } = require('@faker-js/faker');
const event = require('./events');
require('./pilot');
require('./system');

setInterval(() => {
    const Flight = {
        event: 'new-flight',
        time: faker.date.future({ refDate: '2023-07-04T00:00:00.000Z' }),
        Details: {
            airLine: 'Royal Jordanian Airlines',
            destination: faker.location.city,
            pilot: faker.person.fullName(),
            flightID: faker.string.uuid(),
        },
    }
    console.log('...........................................................')
    console.log(`Manager: new flight with ID ${Flight.flightID} have been scheduled`);
    event.emit('new-flight', Flight);
    // if (Arrived) { console.log(`Manager: we’re greatly thankful for the amazing flight, ${Flight.flightID}`) }
}, 10000);