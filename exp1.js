const EventEmitter = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('greet', (name) => {
    console.log(`hello, ${name}! Welcome to Node.js`);
});
myEmitter.on('exit', () => {
    console.log("application is closed.");
});
myEmitter.emit('greet', 'Ankit yadav');
myEmitter.emit('exit');

