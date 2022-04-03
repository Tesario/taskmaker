const express = require("express");
const { ApolloServer, UserInputError } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");
const fs = require("fs");

let aboutMessage = "TaskMaker";

const app = express();

const taskDB = [
  {
    id: 1,
    title: "Math test",
    status: "expired",
    created: new Date("2019-01-15"),
    due: new Date("2021-04-4"),
    priority: 1,
  },
  {
    id: 2,
    title: "Physic test",
    status: "done",
    created: new Date("2022-04-4"),
    due: new Date("2022-04-4"),
    priority: 3,
  },
  {
    id: 3,
    title: "Science test",
    desc: "fasdfdsa fdsa fdas fasd fasdf as",
    status: "done",
    created: new Date("2022-04-4"),
    due: new Date("2022-04-4"),
    priority: 5,
  },
];

const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  description: "A Date() type in GraphQL as a scalar",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    taskList: () => taskDB,
  },
  Mutation: {
    setAboutMessage,
    taskAdd,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return (aboutMessage = message);
}

function taskAdd(_, { task }) {
  validateTasks({ task });
  task.created = new Date();
  task.id = taskDB.length + 1;

  taskDB.push(task);
  return task;
}

function validateTasks({ task }) {
  const errors = [];

  if (task.title.length < 3 || task.title.length > 100) {
    errors.push("Wrong length of the title.");
  }

  if (errors.length) {
    throw new UserInputError("Invalid input(s)", { errors });
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(`./schema.graphql`, "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `App is running on port ${5000}, GraphQL: http:/localhost:5000/graphql`
  );
});
