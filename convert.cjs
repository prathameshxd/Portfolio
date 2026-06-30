const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const convertDir = async (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await convertDir(fullPath);
    } else if (file.endsWith('.jpg') || file.endsWith('.png')) {
      const parsed = path.parse(fullPath);
      const newPath = path.join(parsed.dir, `${parsed.name}.webp`);
      await sharp(fullPath).webp({ quality: 80 }).toFile(newPath);
      console.log(`Converted ${file} to .webp`);
      fs.unlinkSync(fullPath); // Delete old file
    }
  }
};

const replaceInFiles = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInFiles(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/\.png/g, '.webp').replace(/\.jpg/g, '.webp');
      fs.writeFileSync(fullPath, content);
    }
  }
};

(async () => {
  await convertDir('./public');
  replaceInFiles('./src');
  console.log('Conversion and replacement complete.');
})();
