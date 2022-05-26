const path = require('path');
const fs = require('fs/promises');
const {stdout} = process;

const dir = path.join(__dirname, 'secret-folder');

async function getDir() {
  const files = await fs.readdir(dir, { withFileTypes: true});
  for (let file of files) {
    if (file.isFile()) {
      const name = file.name;

      const filePath = path.join(__dirname, 'secret-folder', name);
      const stat = await fs.stat(filePath);

      const fileExt = path.extname(file.name);
      const fileName = name.replaceAll(fileExt, '');
      const fileSize = `${stat.size / 1000}kb`;
      stdout.write(`${fileName} - ${fileExt} - ${fileSize}\n`);
    }
  }
}

getDir();