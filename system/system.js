'use strict';

require('dotenv').config();
const port = process.env.PORT;
const ioSystem = require('socket.io')(port);
ioSystem.on('connection', (socket) => {
    console.log('server connected ', socket.id)
    socket.on('new-flight', (payload) => {
        console.log('Flight: ', payload)
        ioSystem.emit('newFlight', payload);
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
