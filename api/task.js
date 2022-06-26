const { UserInputError } = require("apollo-server-express");
const { getDb, getNextSequence } = require("./db");

async function list(_) {
  const db = getDb();
  const tasks = await db.collection("tasks").find({}).toArray();
  return tasks;
}

async function get(_, { id }) {
  const db = getDb();
  const task = await db.collection("tasks").findOne({ id });
  return task;
}

async function remove(_, { id }) {
  const db = getDb();
  const result = await db.collection("tasks").deleteOne({ id });
  return { deletedCount: result.deletedCount };
}

async function add(_, { task }) {
  validate({ task });
  task.created = new Date();
  task.id = await getNextSequence("tasks");

  const db = getDb();
  const result = await db.collection("tasks").insertOne(task);

  const savedTask = await db
    .collection("tasks")
    .findOne({ _id: result.insertedId });
  return savedTask;
}

async function update(_, { id, task }) {
  validate({ task });

  const db = getDb();
  const result = await db.collection("tasks").updateOne({ id }, { $set: task });
  const updatedTask = await db.collection("tasks").findOne({ id });
  return { ...result, task: updatedTask };
}

function validate({ task }) {
  const errors = [];
  if (task.title.length < 3 || task.title.length > 200) {
    errors.push("Wrong length of the title.");
  }
  if (task.desc && task.desc.length > 2000) {
    errors.push("Wrong length of the description.");
  }
  if (task.desc === "") {
    delete task.desc;
  }
  if (task.priority < 0 || task.priority > 5) {
    errors.push("The priority must be between 1 and 5.");
  }

  if (errors.length) {
    throw new UserInputError("Invalid input(s)", { errors });
  }
}

module.exports = { add, update, list, remove, get };
