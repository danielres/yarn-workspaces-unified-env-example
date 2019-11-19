const { knex } = require("../index");

module.exports = {
  create: async args =>
    (
      await knex("User")
        .insert(args)
        .returning("*")
    )[0],

  findBySub: sub =>
    knex("User")
      .where("sub", sub)
      .first(),

  getTenants: ({ id }) =>
    knex("Tenant")
      .select(
        "Tenant.*",
        "TenantUserRelation.type",
        "TenantUserRelation.createdAt as joinedAt"
      )
      .leftJoin(
        "TenantUserRelation",
        "Tenant.id",
        "TenantUserRelation.tenantId"
      )
      .where("TenantUserRelation.userId", id),

  createTenant: (user, args) => {
    return knex.transaction(async tx => {
      const tenant = (
        await knex("Tenant")
          .transacting(tx)
          .insert(args)
          .returning("*")
      )[0];
      const relation = await knex("TenantUserRelation")
        .transacting(tx)
        .insert({
          userId: user.id,
          tenantId: tenant.id,
          type: "owner"
        });
      return tenant;
    });
  }
};
