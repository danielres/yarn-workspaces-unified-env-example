import env from "env";
import getUserInfo from "./getUserInfo";
import verify from "./verify";

const config = {
  audience: env.AUTH0_AUDIENCE,
  domain: env.AUTH0_DOMAIN,
  issuer: env.AUTH0_ISSUER
};

export default async (resolve, parent, args, ctx, info) => {
  const { audience, domain, issuer } = config;
  const accessToken =
    ctx.request && ctx.request.headers && ctx.request.headers.authorization
      ? ctx.request.headers.authorization
      : null;
  if (!accessToken) throw new Error(`Access token is missing`);
  const user = await verify({ accessToken, audience, domain, issuer });
  const userInfo = await getUserInfo({ accessToken, domain: config.domain });
  ctx.user = userInfo;
  return resolve();
};
