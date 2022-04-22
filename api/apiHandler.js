const fs = require("fs");
const { ApolloServer } = require("apollo-server-express");

const GraphQLDate = require("./graphqlDate.js");
const task = require("./task.js");

const resolvers = {
  Query: {
    taskList: task.list,
  },
  Mutation: {
    taskAdd: task.add,
    taskFilter: task.filter,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(`./schema.graphql`, "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  server.applyMiddleware({ app, path: "/graphql" });
}

module.exports = { installHandler };