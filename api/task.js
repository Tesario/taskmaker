const { UserInputError, ApolloError } = require("apollo-server-express");
const { getDb, getNextSequence } = require("./db");

async function list(_, _, context) {
  const db = getDb();
  const tasks = await db
    .collection("tasks")
    .aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryUuid",
          foreignField: "uuid",
          as: "category",
        },
      },
      { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      {
        $match: { userUuid: context.user.uuid },
      },
    ])
    .toArray();

  return tasks;
}

async function get(_, { id }, context) {
  const db = getDb();
  const task = (
    await db
      .collection("tasks")
      .aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryUuid",
            foreignField: "uuid",
            as: "category",
          },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        {
          $match: { id },
        },
      ])
      .toArray()
  )[0];

  if (!task || task.userUuid !== context.user.uuid) {
    throw new ApolloError("Task not found.", "NOT_FOUND");
  }

  return task;
}

async function remove(_, { id }, context) {
  const db = getDb();
  const result = await db
    .collection("tasks")
    .deleteOne({ id, userUuid: context.user.uuid });

  return { deletedCount: result.deletedCount };
}

async function add(_, { task }, context) {
  validate({ task });
  task.created = new Date();
  task.id = await getNextSequence("tasks");

  const db = getDb();
  const result = await db
    .collection("tasks")
    .insertOne({ ...task, userUuid: context.user.uuid });

  const savedTask = (
    await db
      .collection("tasks")
      .aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryUuid",
            foreignField: "uuid",
            as: "category",
          },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        {
          $match: { _id: result.insertedId },
        },
      ])
      .toArray()
  )[0];

  return savedTask;
}

async function update(_, { id, task }, context) {
  validate({ task });

  const db = getDb();
  const result = await db
    .collection("tasks")
    .updateOne({ id, userUuid: context.user.uuid }, { $set: task });

  const updatedTask = (
    await db
      .collection("tasks")
      .aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryUuid",
            foreignField: "uuid",
            as: "category",
          },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        {
          $match: { id, userUuid: context.user.uuid },
        },
      ])
      .toArray()
  )[0];

  return { ...result, task: updatedTask };
}

async function stats(_, _, context) {
  const db = getDb();
  const totalCount = (
    await db
      .collection("tasks")
      .aggregate([
        { $match: { userUuid: context.user.uuid } },
        { $count: "totalCount" },
      ])
      .toArray()
  )[0];

  const completedCount = (
    await db
      .collection("tasks")
      .aggregate([
        { $match: { userUuid: context.user.uuid, completed: true } },
        { $count: "completedCount" },
      ])
      .toArray()
  )[0];

  const uncompletedCount = (
    await db
      .collection("tasks")
      .aggregate([
        {
          $match: {
            userUuid: context.user.uuid,
            completed: false,
            due: { $gt: new Date() },
          },
        },
        { $count: "uncompletedCount" },
      ])
      .toArray()
  )[0];

  const expiredCount = (
    await db
      .collection("tasks")
      .aggregate([
        {
          $match: {
            userUuid: context.user.uuid,
            completed: false,
            due: { $lt: new Date() },
          },
        },
        { $count: "expiredCount" },
      ])
      .toArray()
  )[0];

  const stats = {
    ...totalCount,
    ...completedCount,
    ...uncompletedCount,
    ...expiredCount,
  };

  return stats;
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

module.exports = { add, update, list, remove, get, stats };
