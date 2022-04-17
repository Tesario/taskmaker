const express = require("express");
const { ApolloServer, UserInputError } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

const url = process.env.MONGO_URI || "mongodb://localhost:27017/taskmaker";
let db;

const connectToDb = async () => {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log(`Database is connected at ${url}`);
  db = client.db();
};

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
    taskList,
  },
  Mutation: {
    taskAdd,
    taskFilter,
  },
  GraphQLDate,
};

async function getNextSequence(collection) {
  const result = await db
    .collection("counters")
    .findOneAndUpdate(
      { _id: collection },
      { $inc: { current: 1 } },
      { returnDocument: "after" }
    );
  return result.value.current;
}

async function taskList() {
  const tasks = await db.collection("tasks").find({}).toArray();
  return tasks;
}

async function taskFilter(_, { filter }) {
  const tasks = await db
    .collection("tasks")
    .find()
    .sort({ [filter.filter]: [filter.order] })
    .toArray();
  return tasks;
}

async function taskAdd(_, { task }) {
  validateTasks({ task });
  task.created = new Date();
  task.id = await getNextSequence("tasks");

  const result = await db.collection("tasks").insertOne(task);

  const savedTask = await db
    .collection("tasks")
    .findOne({ _id: result.insertedId });
  return savedTask;
}

function validateTasks({ task }) {
  const errors = [];
  if (task.title.length < 3 || task.title.length > 200) {
    errors.push("Wrong length of the title.");
  }
  if (task.desc.length > 2000) {
    errors.push("Wrong length of the description.");
  }
  if (task.due < new Date()) {
    errors.push("The due must be in the past.");
  }
  if (!["created", "expired", "done"].includes(task.status)) {
    errors.push("The status does not have valid value.");
  }
  if (task.priority < 0 || task.priority > 5) {
    errors.push("The priority must be between 1 and 5.");
  }

  if (errors.length) {
    throw new UserInputError("Invalid input(s)", { errors });
  }
}

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

const server = new ApolloServer({
  typeDefs: fs.readFileSync(`./schema.graphql`, "utf-8"),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

server.applyMiddleware({ app, path: "/graphql" });

(async function () {
  try {
    await connectToDb();
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `App is running on port ${5000}, GraphQL: http:/localhost:5000/graphql`
      );
    });
  } catch (error) {
    console.log(error);
  }
})();
