const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3100;

const distDir = "../../ui/dist";
app.use(express.static(path.join(__dirname, distDir)));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, distDir, "index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
