const express = require("express");
const uuid = require("uuid");

const { imageFileNames, imageFilePaths } = require("./../lib/imageFiles");
const { combine, resize } = require("./../lib/imaging");
const FaceFactory = require("./../lib/FaceFactory");

const imageTypes = ["eyes", "nose", "mouth"];

const router = express.Router();

const pngResponse = response => {
  response.setHeader("Expires", new Date(Date.now() + 604800000).toUTCString());
  return response.type("image/png");
};

router.get("/list", (req, res) => {
  const face = {};
  imageTypes.forEach(type => (face[type] = imageFileNames(type)));

  res.set("Content-Type", "application/json").send({ face });
});

router.get("/:size?/random", (req, res) => {
  const { size } = req.params;
  const face = FaceFactory.create(uuid.v4());

  combine(face)
    .png()
    .pipe(resize(size))
    .pipe(pngResponse(res));
});

router.get("/:size?/:id", (req, res, next) => {
  const { id, size } = req.params;
  const face = FaceFactory.create(id);

  combine(face)
    .png()
    .pipe(resize(size))
    .pipe(pngResponse(res));
});

router.get("/face/:eyes/:nose/:mouth/:color/:size?", (req, res, next) => {
  const { color, size } = req.params;
  const face = { color: `#${color}` };

  imageTypes.forEach(type => {
    const requestedName = req.params[type];
    const paths = imageFilePaths(type);
    face[type] = paths.find(path => !!path.match(requestedName)) || paths[0];

    if (requestedName === "x") {
      face[type] = "";
    }
  });

  combine(face)
    .png()
    .pipe(resize(size))
    .pipe(pngResponse(res));
});

module.exports = router;
