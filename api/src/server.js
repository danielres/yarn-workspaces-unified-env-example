import env from "env";
import express from "express";
import { GraphQLServer } from "graphql-yoga";
import path from "path";
import authenticate from "./middlewares/authenticate";

const UI_DIR = path.resolve("../ui/dist");

const typeDefs = /* GraphQL */ `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  endpoint: "graphql",
  context: ctx => ctx,
  middlewares: [
    {
      Query: authenticate
      // Mutation: authenticate
    }
  ]
});

server.express.use(express.static(UI_DIR));

server.express.get("*", (req, res, next) =>
  req.url === env.API_GRAPHQL_ENDPOINT
    ? next()
    : res.sendFile(`${UI_DIR}/index.html`)
);

server.start(
  {
    port: env.API_PORT,
    endpoint: env.API_GRAPHQL_ENDPOINT,
    playground: env.API_GRAPHQL_ENDPOINT,
    subscriptions: env.API_GRAPHQL_ENDPOINT
  },
  () => {
    console.log(`[API] server:  http://localhost:${env.API_PORT}`);
    console.log(
      `[API] graphQL: http://localhost:${env.API_PORT}${env.API_GRAPHQL_ENDPOINT}`
    );
  }
);
