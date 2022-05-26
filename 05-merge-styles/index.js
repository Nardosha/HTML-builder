const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'bundle.css');


(async () => {
  const files = await fs.promises.readdir(srcPath, { withFileTypes: true });
  const filesCss = files
    .filter(file => file.isFile())
    .filter(file => path.extname(file.name) === '.css');

  const output = fs.createWriteStream(destPath);

  for (let file of filesCss) {
    const srcFilePath = path.join(srcPath, file.name);
    const input = fs.createReadStream(srcFilePath);

    input.pipe(output);
  }
})();