/**
 * Builds transparent favicons from the site logo WITHOUT modifying public/images/logo.png
 * (header/footer stay unchanged). Run: node scripts/generate-transparent-favicons.mjs
 */
import sharp from "sharp";

const LOGO_SRC = "public/images/logo.png";
const OUT_ICON = "src/app/icon.png";
const OUT_APPLE = "src/app/apple-icon.png";

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

async function logoToTransparentBuffer() {
  const input = await sharp(LOGO_SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = input;
  const { width, height, channels } = info;
  if (channels !== 4) throw new Error("Expected RGBA");

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
  console.log(`Source ${LOGO_SRC}: ${whiteKey ? "white" : "black"} key (corner avg ${avg.toFixed(0)})`);

  const out = new Uint8ClampedArray(data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    out[i + 3] = whiteKey ? keyWhite(r, g, b) : keyBlack(r, g, b);
  }

  return sharp(Buffer.from(out), {
    raw: { width, height, channels: 4 },
  }).png({ compressionLevel: 9 });
}

const transparent = await logoToTransparentBuffer();
const buf = await transparent.toBuffer();

await sharp(buf)
  .resize(32, 32, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(OUT_ICON);
console.log(`Wrote ${OUT_ICON}`);

await sharp(buf)
  .resize(180, 180, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(OUT_APPLE);
console.log(`Wrote ${OUT_APPLE}`);
console.log("Note: public/images/logo.png was not modified.");
