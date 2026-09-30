//import EventEmitter class 
const EventEmitter = require('events');
// create Button class 
class Button extends EventEmitter {}
//create object
const button = new Button ();
//click Event listener
button.on('click',() =>{
    console.log("Button Clicked!");
});
//mouseover event listener
button.on('mouseover',() =>{
    console.log("mouse is over the button.");
});
//trigger events 
button.emit('click');
button.emit('mouseover');
