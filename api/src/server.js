import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3100;
const UI = path.resolve("../ui/dist");

app.use(express.static(UI));

app.get("*", (req, res) => res.sendFile(path.join(UI, "index.html")));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
