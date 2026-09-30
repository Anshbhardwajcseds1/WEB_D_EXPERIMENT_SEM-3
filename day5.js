console.log('1: Start(sync)');
setTimeout(()=>{
    console.log('2: Inside setTimeout(macrotask-run Last)');
},0);
setImmediate(()=>{
    console.log('3: Inside setImmediate(macrotask-run Before setTimeout)');
});
process.nextTick(()=>{
    console.log('4: Inside process.nextTick (microTask-runs Before setTimeout)');
});
Promise.resolve().then(()=>{
    console.log('5: Inside Promise.then (microTask-runs Before setTimeout)');
});
console.log('6: End (sync)');   