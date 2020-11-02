const { Hash, hashFactory, sumAndDiff } = require("avatars-utils");
const { eyeImages, noseImages, mouthImages } = require("./imageFiles");

class FaceFactory {
  constructor(colors, eyes, noses, mouths) {
    this.colorHash = new Hash(colors);
    this.eyeHash = new Hash(eyes);
    this.noseHash = new Hash(noses);
    this.mouthHash = new Hash(mouths, hashFactory(sumAndDiff));
  }
  create(string) {
    return {
      color: this.colorHash.get(string),
      eyes: this.eyeHash.get(string),
      nose: this.noseHash.get(string),
      mouth: this.mouthHash.get(string)
    };
  }
}
exports.FaceFactory = FaceFactory;
const defaultColors = [
  "#81bef1",
  "#ad8bf2",
  "#bff288",
  "#de7878",
  "#a5aac5",
  "#6ff2c5",
  "#f0da5e",
  "#eb5972",
  "#f6be5d"
];
module.exports = new FaceFactory(
  defaultColors,
  eyeImages,
  noseImages,
  mouthImages
);
