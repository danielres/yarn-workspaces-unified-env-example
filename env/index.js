import { default as envalid, num, str } from "envalid";
import loadLocal from "./loadLocalEnv";

// Example usages:
//
// to just validate env vars (ex: on prebuild):
// $ node -r esm env
//
// to validate env vars + pass them to a script:
// node -r esm -r env api/server.js
// node -r esm -r env ui/build.js
// node -r esm -r env ui/devServer.js

const ENV = process.env.NODE_ENV || "development";
loadLocal(ENV);
const env = envalid.cleanEnv(
  process.env,
  {
    AUTH0_AUDIENCE: str(),
    AUTH0_DOMAIN: str(),
    AUTH0_ISSUER: str(),
    ...(process.env === "test" && {
      AUTH0_CLIENT_SECRET: str(),
      AUTH0_PASSWORD: str(),
      AUTH0_USERNAME: str()
    }),
    API_GRAPHQL_ENDPOINT: str({ default: "/graphql" }),
    API_PORT: num({ default: parseInt(process.env.PORT) || 3100 }), // process.env.PORT is for Heroku
    UI_AUTH0_CLIENT_ID: str({ description: "used by UI + e2e tests" }),
    UI_DEV_SERVER_PORT: num({ default: 1234 })
  },
  {
    strict: true
  }
);

Object.entries(env).map(([k, v]) => (process.env[k] = v));
