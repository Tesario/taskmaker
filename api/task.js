const { UserInputError } = require("apollo-server-express");
const { getDb, getNextSequence } = require("./db");

async function list(_, { id }) {
  if (isNaN(id) || !id) {
    return [];
  }
  const db = getDb();
  const tasks = await db
    .collection("tasks")
    .find(id ? { id } : {})
    .toArray();
  return tasks;
}

async function filter(_, { filter }) {
  const db = getDb();
  const tasks = await db
    .collection("tasks")
    .find()
    .sort({ [filter.filter]: [filter.order] })
    .toArray();
  return tasks;
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

function validate({ task }) {
  const errors = [];
  if (task.title.length < 3 || task.title.length > 200) {
    errors.push("Wrong length of the title.");
  }
  if (task.desc && task.desc.length > 2000) {
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

module.exports = { add, list, filter, remove };
