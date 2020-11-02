const path = require("path");
const { filePaths, fileNames } = require("avatars-utils");
const imageDir = path.join(__dirname, "..", "img");

exports.imageFilePaths = type => filePaths(path.join(imageDir, type));
exports.imageFileNames = type => fileNames(path.join(imageDir, type));

exports.eyeImages = exports.imageFilePaths("eyes");
exports.noseImages = exports.imageFilePaths("nose");
exports.mouthImages = exports.imageFilePaths("mouth");
