/**
 * One-off / maintenance: key out solid black or white backgrounds from PNGs.
 * Run: node scripts/make-transparent.mjs
 */
import sharp from "sharp";
import { readFileSync } from "fs";

const files = [
  "public/images/logo.png",
  "src/app/icon.png",
  "src/app/apple-icon.png",
];

function keyBlack(r, g, b) {
  const m = Math.max(r, g, b);
  if (m < 18) return 0;
  if (m < 58) return Math.round((255 * (m - 18)) / 40);
  return 255;
}

function keyWhite(r, g, b) {
  const min = Math.min(r, g, b);
  if (min > 248) return 0;
  if (min > 210) return Math.round((255 * (248 - min)) / 38);
  return 255;
}

async function processFile(relPath) {
  const input = await sharp(relPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = input;
  const { width, height, channels } = info;
  if (channels !== 4) {
    console.warn(`Skip ${relPath}: expected RGBA`);
    return;
  }

  // Sample corners to guess background
  const idx = (x, y) => (y * width + x) * 4;
  let sum = 0;
  for (const [x, y] of [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ]) {
    sum += data[idx(x, y)] + data[idx(x, y) + 1] + data[idx(x, y) + 2];
  }
  const avg = sum / 12;
  const whiteKey = avg > 200;
  console.log(`${relPath}: ${whiteKey ? "white" : "black"} key (corner avg ${avg.toFixed(0)})`);

  const out = new Uint8ClampedArray(data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const a = whiteKey ? keyWhite(r, g, b) : keyBlack(r, g, b);
    out[i + 3] = a;
  }

  await sharp(Buffer.from(out), {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(relPath);

  console.log(`  wrote ${relPath}`);
}

for (const f of files) {
  await processFile(f);
}
