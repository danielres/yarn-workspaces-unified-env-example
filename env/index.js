import { default as envalid, num, str } from "envalid";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dotEnvFile = ["development", "test"].includes(process.env.NODE_ENV)
  ? `.env.${process.env.NODE_ENV}.local`
  : null;

const env = envalid.cleanEnv(
  process.env,
  {
    API_GRAPHQL_ENDPOINT: str({ default: "/graphql" }),
    API_PORT: num({ default: process.env.PORT || 3100 }), // process.env.PORT is for Heroku
    UI_DEV_SERVER_PORT: num({ default: 1234 })
  },
  {
    dotEnvPath: path.join(__dirname, dotEnvFile),
    strict: true
  }
);

export default env;
