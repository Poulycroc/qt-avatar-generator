const sharp = require("sharp");
const { parseSizeFactory } = require("avatars-utils");
const minSize = 40;
const maxSize = 400;

exports.parseSize = parseSizeFactory(minSize, maxSize);

exports.combine = face =>
  sharp(face.eyes)
    .composite([{ input: face.mouth }, { input: face.nose }])
    .flatten({ background: face.color });

exports.resize = rawSize => {
  const size = exports.parseSize(rawSize);
  return sharp().resize(size.width, size.height);
};
