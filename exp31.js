const fs = require('fs');

// CREATE
fs.writeFileSync('data.txt', 'Hello World');
console.log('File created successfully.');

// READ
const data = fs.readFileSync('data.txt', 'utf8');
console.log('File content:', data);

// UPDATE
fs.appendFileSync('data.txt', '\nThis is updated content.');
console.log('File updated successfully.');

// READ after UPDATE
const updatedData = fs.readFileSync('data.txt', 'utf8');
console.log('Updated content:', updatedData);

// DELETE
fs.unlinkSync('data.txt');
console.log('File deleted successfully.');