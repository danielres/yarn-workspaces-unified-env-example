import { default as envalid, num, str } from "envalid";

const env = envalid.cleanEnv(
  process.env,
  {
    API_GRAPHQL_ENDPOINT: str({ default: "/graphql" }),
    API_PORT: num({ default: process.env.PORT || 3100 }), // process.env.PORT is for Heroku
    UI_DEV_SERVER_PORT: num({ default: 1234 })
  },
  { strict: true }
);

export default env;
