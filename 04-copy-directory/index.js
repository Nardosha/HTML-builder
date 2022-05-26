const fs = require('fs');
const fsPromises = require('node:fs/promises');
const path = require('path');

const destDir = path.join(__dirname, 'files-copy');
const srcDir = path.join(__dirname, 'files');

async function makeFolder() {
  const data = await fsPromises.mkdir(destDir, {recursive: true});
  console.log('data', data);

  const files = await fsPromises.readdir(srcDir, {withFileTypes: true});
  console.log('files', files);

  for (const file of files) {
    const copyFileName = `copy-${file.name}`;
    const srcPath = path.join(srcDir, file.name);
    const destPath = path.join(destDir, copyFileName);

    fs.copyFile(srcPath, destPath, err => console.log('jo',err));
  }
}
makeFolder();
