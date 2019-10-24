import env from "env";
import express from "express";
import proxy from "http-proxy-middleware";
import Bundler from "parcel-bundler";

const bundler = new Bundler("src/index.html", {
  cache: true,
  autoInstall: false
});

const app = express();

app.use(
  env.API_GRAPHQL_ENDPOINT,
  proxy({
    target: `http://localhost:${env.API_PORT}`,
    ws: true
  })
);

app.use(bundler.middleware());

app.listen(env.UI_DEV_SERVER_PORT, () => {
  console.log(`[UI] devServer: http://localhost:${env.UI_DEV_SERVER_PORT}`);
});
