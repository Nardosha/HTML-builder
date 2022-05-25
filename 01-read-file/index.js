const { stdout } = process;
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'text.txt');
const code = 'utf-8';

const stream = fs.createReadStream(dir, code);
let data = '';

stream.on('data', chunk => stdout.write(data += chunk));
stream.on('error', error => stdout.write(error.message));
