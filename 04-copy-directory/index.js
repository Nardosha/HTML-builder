const fs = require('fs');
const path = require('path');

const destDir = path.join(__dirname, 'files-copy');
const srcDir = path.join(__dirname, 'files');

(async () => {
  await fs.promises.rm(destDir, { recursive: true, force: true });
  await fs.promises.mkdir(destDir, { recursive: true });
  const copyFiles = await fs.promises.readdir(srcDir, { withFileTypes: true });
  const files = copyFiles.filter(file => file.isFile());

  for (let file of files) {
    const srcPath = path.join(srcDir, file.name);
    const destPath = path.join(destDir, file.name);

    await fs.promises.copyFile(srcPath, destPath);
    // checkUpdate(srcPath, destPath);
  }
})();

// function checkUpdate(pathSrc, destPath) {
//   const input = fs.createReadStream(pathSrc, 'utf-8');
//   const out = fs.createWriteStream(destPath);
//
//   input.pipe(out);
// }

