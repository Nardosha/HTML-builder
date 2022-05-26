const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'bundle.css');


async function getBundle() {
  await fs.writeFile(destPath, '', () => console.log('gotovo!'));

  const files = await fs.promises.readdir(srcPath, {withFileTypes: true});

  for (const file of files) {
    if (file.isFile() && path.extname(`${file.name}`) === '.css') {

      const srcFilePath = path.join(srcPath, file.name);
      const input = fs.createReadStream(srcFilePath, 'utf-8');

      input.on('data', (data) => {
        fs.appendFile(destPath, data, err => {
          if (err) throw err;
        });
      });
    }
  }
}

getBundle();
