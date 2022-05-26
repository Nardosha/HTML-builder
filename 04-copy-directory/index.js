const fs = require('fs');
const fsPromises = require('node:fs/promises');
const path = require('path');

const destDir = path.join(__dirname, 'files-copy');
const srcDir = path.join(__dirname, 'files');

async function makeFolder() {
  await fsPromises.mkdir(destDir, {recursive: true});

  const files = await fsPromises.readdir(srcDir, {withFileTypes: true});

  for (const file of files) {
    const copyFileName = `copy-${file.name}`;
    const srcPath = path.join(srcDir, file.name);
    const destPath = path.join(destDir, copyFileName);

    fs.copyFile(srcPath, destPath, err => console.log(err));
    checkUpdate(srcPath, destPath);
  }
}
makeFolder();

function checkUpdate(pathSrc, destPath) {
  const input = fs.createReadStream(pathSrc, 'utf-8');
  const out = fs.createWriteStream(destPath);

  input.pipe(out);
}

