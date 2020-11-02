const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");

const Adorable = require("./router");

const app = express();
const port = process.env.AVATARS_PORT || 3002;

const faviconPath = path.join(__dirname, "favicon.ico");
app.use(favicon(faviconPath));

app.use("/avatars", Adorable);

app.listen(port, () => {
  console.log(`Adorable Avatars server started on port ${port}`);
});
