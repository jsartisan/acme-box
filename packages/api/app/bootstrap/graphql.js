const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { fileLoader, mergeTypes, mergeResolvers } = require("merge-graphql-schemas");

const db = require("@app/models");

const types = fileLoader(path.join(__dirname, "../graphql/types"));

const typeDefs = mergeTypes(types);
const resolversArray = fileLoader(path.join(__dirname, "./../graphql/resolvers"));
const resolvers = mergeResolvers(resolversArray);

/**
 * lift ups apollo server
 *
 * @return {[type]} [description]
 */
const boot = app => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {},
    context: async ({ req }) => {
      return { req, db };
    }
  });

  server.applyMiddleware({ app, path: "/graphql", cors: true });
};

module.exports = {
  boot
};
