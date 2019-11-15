import TenantNotFoundError from "./TenantNotFoundError";

export default (resolve, parent, args, ctx, info) => {
  if (!["one", "two"].includes(ctx.request.headers.currentworkspace))
    return new TenantNotFoundError({
      data: { tenant: ctx.request.headers.currentworkspace }
    });

  ctx.currentWorkspace = ctx.request.headers.currentworkspace;

  return resolve();
};
