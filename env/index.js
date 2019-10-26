import { default as envalid, num, str } from "envalid";
import loadLocal from "./loadLocalEnv";

const ENV = process.env.NODE_ENV || "development";
loadLocal(ENV);

const env = envalid.cleanEnv(
  process.env,
  {
    AUTH0_AUDIENCE: str(),
    AUTH0_DOMAIN: str(),
    AUTH0_ISSUER: str(),
    UI_AUTH0_CLIENT_ID: str({ description: "used only by UI" }),
    API_GRAPHQL_ENDPOINT: str({ default: "/graphql" }),
    API_PORT: num({ default: parseInt(process.env.PORT) || 3100 }), // process.env.PORT is for Heroku
    UI_DEV_SERVER_PORT: num({ default: 1234 })
  },
  {
    strict: true
  }
);

Object.entries(env).map(([k, v]) => (process.env[k] = v));
