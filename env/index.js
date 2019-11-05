// Example usages:
//
// to just validate env vars (ex: on prebuild):
// $ node -r esm env
//
// to validate env vars + pass them to a script:
// node -r esm -r env api/server.js
// node -r esm -r env ui/build.js
// node -r esm -r env ui/devServer.js

import { default as envalid, num, str } from "envalid";
import loadLocal from "./loadLocalEnv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const { NODE_ENV } = process.env;
const isDev = NODE_ENV === "development";
const isTest = NODE_ENV === "test";

loadLocal(NODE_ENV);

const env = envalid.cleanEnv(
  process.env,
  {
    AUTH0_AUDIENCE: str(),
    AUTH0_DOMAIN: str(),
    AUTH0_ISSUER: str(),
    API_GRAPHQL_ENDPOINT: str({ default: "/graphql" }),
    API_PORT: num({
      default: isDev ? 3100 : isTest ? 3101 : parseInt(process.env.PORT) // PORT provided by Heroku
    }),
    UI_AUTH0_CLIENT_ID: str({ description: "used by UI + e2e tests" }),

    ...(isDev && {
      UI_DEV_SERVER_PORT: num({ default: 1234 })
    }),

    ...(isTest && {
      AUTH0_CLIENT_SECRET: str(),
      AUTH0_PASSWORD: str(),
      AUTH0_USERNAME: str(),
      UI_DEV_SERVER_PORT: num({ default: 1235 })
    })
  },
  {
    strict: true
  }
);

Object.entries(env).map(([k, v]) => (process.env[k] = v));
