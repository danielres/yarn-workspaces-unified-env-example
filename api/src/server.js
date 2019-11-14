import express from "express";
import { GraphQLServer } from "graphql-yoga";
import path from "path";
import authenticate from "./middlewares/authenticate";

const config = {
  port: process.env.API_PORT,
  endpoint: process.env.API_GRAPHQL_ENDPOINT,
  uiDir: path.resolve("../ui/dist")
};

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

server.express.use(express.static(config.uiDir));

server.express.get("*", (req, res, next) =>
  req.url === config.endpoint
    ? next()
    : res.sendFile(`${config.uiDir}/index.html`)
);

server.start(
  {
    port: config.port,
    endpoint: config.endpoint,
    playground: config.endpoint,
    subscriptions: config.endpoint
  },
  () => {
    console.log(`[API] server:  http://localhost:${config.port}`);
    console.log(
      `[API] graphQL: http://localhost:${config.port}${config.endpoint}`
    );
  }
);
