// src/decoder.js
export function decodeBlobToValues(buf) {
  if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
  const values = [];
  for (let i = 0; i + 3 < buf.length; i += 4) {
    const val = buf.readInt32BE(i) / 1000; // Big-endian, ÷1000 per spec
    values.push(val);
  }
  return values;
}
