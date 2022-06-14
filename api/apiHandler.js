const fs = require("fs");
const { ApolloServer } = require("apollo-server-express");

const GraphQLDate = require("./graphqlDate.js");
const task = require("./task.js");

const resolvers = {
  Query: {
    taskList: task.list,
    taskFilter: task.filter,
    taskSearch: task.search,
  },
  Mutation: {
    taskAdd: task.add,
    taskUpdate: task.update,
    taskRemove: task.remove,
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
