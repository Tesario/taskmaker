const fs = require("fs");
const { ApolloServer } = require("apollo-server-express");
const GraphQLDate = require("./graphqlDate.js");
const task = require("./task.js");
const user = require("./user.js");
const category = require("./category.js");

const resolvers = {
  Query: {
    taskList: task.list,
    taskGet: task.get,
    categoryList: category.list,
  },
  Mutation: {
    taskAdd: task.add,
    taskUpdate: task.update,
    taskRemove: task.remove,
    userLogin: user.login,
    categoryAdd: category.add,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(`./schema.graphql`, "utf-8"),
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const signIn = await user.isSignIn(token);
    return signIn;
  },
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  server.applyMiddleware({ app, path: "/graphql" });
}

module.exports = { installHandler };
