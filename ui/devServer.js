import express from "express";
import proxy from "http-proxy-middleware";
import Bundler from "parcel-bundler";

const [, , ...args] = process.argv;
const isCacheEnabled = args.includes("cache:true");

const config = {
  devServerPort: process.env.UI_DEV_SERVER_PORT,
  endpoint: process.env.API_GRAPHQL_ENDPOINT,
  port: process.env.API_PORT
};

const bundler = new Bundler("src/index.html", {
  cache: isCacheEnabled,
  autoInstall: false
});

const app = express();

app.use(
  config.endpoint,
  proxy({
    target: `http://localhost:${config.port}`,
    ws: true
  })
);

app.use(bundler.middleware());

app.listen(config.devServerPort, () => {
  console.log(
    `[UI:devServer] ${process.env.NODE_ENV} | ${args} | http://localhost:${config.devServerPort}`
  );
});
