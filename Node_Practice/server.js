const logEvents = require('./LogEvents');
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('log', (message) => logEvents(message));

setTimeout(() => {
    emitter.emit('log', 'New log event emitted');
}, 2000);