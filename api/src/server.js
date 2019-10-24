import express from "express";
import yoga from "graphql-yoga";
import path from "path";

const { GraphQLServer } = yoga;

const env = {
  API_PORT: process.env.PORT || 3100,
  GRAPHQL_ENDPOINT: "/graphql"
};

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
  req.url === env.GRAPHQL_ENDPOINT
    ? next()
    : res.sendFile(`${UI_DIR}/index.html`)
);

server.start(
  {
    port: env.API_PORT,
    endpoint: env.GRAPHQL_ENDPOINT,
    playground: env.GRAPHQL_ENDPOINT,
    subscriptions: env.GRAPHQL_ENDPOINT
  },
  () =>
    console.log(
      `Server running on http://localhost:${env.API_PORT}${env.GRAPHQL_ENDPOINT}`
    )
);
