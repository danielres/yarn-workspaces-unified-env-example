import { User } from "db/queries";
import NodeCache from "node-cache";

const dbUserCache = new NodeCache({ maxKeys: 100, stdTTL: 5 });

export default async (resolve, parent, args, ctx, info) => {
  const { user } = ctx;

  let dbUser;

  if (!dbUserCache.get(user.sub)) {
    dbUser = await User.findBySub(user.sub);
    if (!dbUser) {
      dbUser = await User.create({
        sub: user.sub,
        name: user.name,
        email: user.email
      });
    }
    dbUserCache.set(user.sub, dbUser);
  }

  const cached = dbUserCache.get(user.sub);

  ctx.user = {
    id: cached.id,
    name: cached.name,
    email: cached.name,
    createdAt: cached.createdAt,
    updatedAt: cached.updatedAt
  };

  return resolve();
};
