// One-off: build frontend/app/favicon.ico (the file the external checker warns is 404) out of app/icon.svg.
// An ICO may legally carry PNG-compressed frames (Vista+), which is what every modern browser expects, so
// this needs no image toolchain beyond the `sharp` the frontend already ships with.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require(path.join(__dirname, 'node_modules', 'sharp'));

const SRC = path.join(__dirname, 'app', 'icon.svg');
const OUT = path.join(__dirname, 'app', 'favicon.ico');
const SIZES = [16, 32, 48];

const pngs = [];
(async () => {
  for (const size of SIZES) {
    pngs.push({ size, buf: await sharp(fs.readFileSync(SRC), { density: 384 }).resize(size, size).png().toBuffer() });
  }

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);          // reserved
  header.writeUInt16LE(1, 2);          // type 1 = icon
  header.writeUInt16LE(pngs.length, 4); // frame count

  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map(({ size, buf }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 means 256)
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2);                      // palette colours
    e.writeUInt8(0, 3);                      // reserved
    e.writeUInt16LE(1, 4);                   // colour planes
    e.writeUInt16LE(32, 6);                  // bits per pixel
    e.writeUInt32LE(buf.length, 8);          // size of the frame
    e.writeUInt32LE(offset, 12);             // where it starts
    offset += buf.length;
    return e;
  });

  fs.writeFileSync(OUT, Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]));
  console.log(`wrote ${OUT} — ${pngs.length} frames (${SIZES.join('/')}px), ${fs.statSync(OUT).size} bytes`);
})();
