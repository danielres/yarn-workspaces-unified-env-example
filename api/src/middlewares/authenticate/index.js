import NodeCache from "node-cache";
import getUserInfo from "./getUserInfo";
import verify from "./verify";

const userInfoCache = new NodeCache({ maxKeys: 100 });

const config = {
  audience: process.env.AUTH0_AUDIENCE,
  domain: process.env.AUTH0_DOMAIN,
  issuer: process.env.AUTH0_ISSUER
};

export default async (resolve, parent, args, ctx, info) => {
  const { audience, domain, issuer } = config;
  const accessToken =
    ctx.request && ctx.request.headers && ctx.request.headers.authorization
      ? ctx.request.headers.authorization
      : null;
  if (!accessToken) throw new Error(`Access token is missing`);

  if (!userInfoCache.get(accessToken)) {
    const user = await verify({ accessToken, audience, domain, issuer });
    const userInfo = await getUserInfo({ accessToken, domain: config.domain });
    userInfoCache.set(accessToken, userInfo);
  }

  ctx.user = userInfoCache.get(accessToken);

  return resolve();
};
