import env from "env";
import express from "express";
import yoga from "graphql-yoga";
import path from "path";

const { GraphQLServer } = yoga;

const UI_DIR = path.resolve("../ui/dist");

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`
  }
};

const server = new GraphQLServer({ typeDefs, resolvers, endpoint: "graphql" });

server.express.use(express.static(UI_DIR));

server.express.get("*", (req, res, next) =>
  req.url === env.API_GRAPHQL_ENDPOINT
    ? next()
    : res.sendFile(`${UI_DIR}/index.html`)
);

server.start(
  {
    port: env.PORT,
    endpoint: env.API_GRAPHQL_ENDPOINT,
    playground: env.API_GRAPHQL_ENDPOINT,
    subscriptions: env.API_GRAPHQL_ENDPOINT
  },
  () =>
    console.log(
      `Server running on http://localhost:${env.PORT}${env.API_GRAPHQL_ENDPOINT}`
    )
);
