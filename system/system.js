'use strict';

require('dotenv').config();
const port = process.env.PORT;
const { v4: uuidv4 } = require('uuid');
const ioSystem = require('socket.io')(port);

const queue = {
    flights: {

    }
}
ioSystem.on('connection', (socket) => {
    console.log('server connected ', socket.id)
    socket.on('new-flight', (payload) => {
        console.log('Flight: ', payload)
        ioSystem.emit('newFlight', payload);

        const id = uuidv4();
        queue.flights[id] = payload;
        console.log('queue v1 = ', queue);

    })
    socket.on('get-all', () => {
        Object.keys(queue.flights).forEach(id => {
            ioSystem.emit('flight', {
                id: id,
                payload: queue.flights[id]
            })
        });
    })
    socket.on('received', (flight) => {
        delete queue.flights[flight.id];
        console.log('queue v2 = ', queue);
    })
    socket.on('Arrived', (payload) => {
        payload.event = 'arrived';
        console.log('Flight: ', payload)
        ioSystem.emit('thankYou', payload);
    })
})

const airlineSystem = ioSystem.of('/airline');

airlineSystem.on('connection', (socket) => {
    console.log('connected to airline system ', socket.id)

    socket.on('took-off', (payload) => {
        payload.event = 'took-off';
        console.log('Flight: ', payload)
        airlineSystem.emit('tookOff', payload);
    })
})
