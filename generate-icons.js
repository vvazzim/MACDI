import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  const svgPath = path.join(__dirname, 'public', 'favicon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const targets = [
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon.png', size: 64 }
  ];

  for (const target of targets) {
    const outPath = path.join(__dirname, 'public', target.name);
    await sharp(svgBuffer)
      .resize(target.size, target.size)
      .png()
      .toFile(outPath);
    console.log(`✅ Généré : ${target.name} (${target.size}x${target.size})`);
  }
}

generateIcons().catch((err) => {
  console.error('Erreur génération icons:', err);
  process.exit(1);
});
