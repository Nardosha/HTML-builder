const {stdin: input, stdout: output} = process;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dir = path.join(__dirname, 'text.txt');

const line1 = readline.createInterface({input, output});
const out = fs.createWriteStream(dir);
let text = '';


fs.writeFile(dir, text, ()=> {
  console.log('Здравствуйте! Введите послание!');
});

line1.on('line', line => {
  if (line === 'exit') {
    line1.close();
    process.exit();
  }
  text += line + ' ';
  out.write(line);
});

process.on('exit', () => {
  output.write('Прощайте');
});








