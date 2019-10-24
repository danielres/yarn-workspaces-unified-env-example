import envalid from "envalid";
const { str, email, json, num } = envalid;

const env = envalid.cleanEnv(
  process.env,
  {
    PORT: num({ default: 3100 }),
    API_GRAPHQL_ENDPOINT: str({ default: "/graphql" })
  },
  { strict: true }
);

export default env;
