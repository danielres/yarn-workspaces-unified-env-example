import { User } from "db/queries";

export default async (resolve, parent, args, ctx, info) => {
  const { user } = ctx;

  let dbUser;

  dbUser = await User.findBySub(user.sub);

  if (!dbUser) {
    dbUser = await User.create({
      sub: user.sub,
      name: user.name,
      email: user.email
    });
  }

  ctx.user = {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.name,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt
  };

  return resolve();
};
