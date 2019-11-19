import { User } from "db/queries";

export const typeDefs = /* GraphQL */ `
  type Query {
    hello(name: String): String!
    user: User!
  }
  type Mutation {
    addTenant(name: String): Tenant!
  }
  type Tenant {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String
  }
  type User {
    id: ID!
    name: String!
    email: String!
    spaces: [Tenant]!
    createdAt: String!
    updatedAt: String
  }
`;

export const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    user: (_, __, { user }) => user
  },
  User: {
    spaces: (_, __, { user }) => User.getTenants(user)
  },
  Mutation: {
    addTenant: (_, args, { user }) => User.createTenant(user, args)
  }
};
