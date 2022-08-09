const { getDb } = require("./db");
const uuid = require("uuid");
const { UserInputError } = require("apollo-server-express");

async function list(_, _, context) {
  const db = getDb();
  const result = await db
    .collection("categories")
    .find({ userUuid: context.user.uuid })
    .toArray();

  return result;
}

async function add(_, { category }, context) {
  await validate({ category });

  const db = getDb();
  const result = await db
    .collection("categories")
    .insertOne({ ...category, uuid: uuid.v4(), userUuid: context.user.uuid });

  const newCategory = await db
    .collection("categories")
    .findOne({ _id: result.insertedId });

  return newCategory;
}

async function remove(_, { uuid }, context) {
  const db = getDb();
  const result = await db
    .collection("categories")
    .deleteOne({ uuid, userUuid: context.user.uuid });

  return result;
}

async function validate({ category }) {
  const errors = [];

  if (category.name.length < 3 || category.name.length > 200) {
    errors.push("Wrong length of the name.");
  }

  const db = getDb();
  const categoryExists = await db
    .collection("categories")
    .findOne({ name: category.name });

  if (categoryExists) {
    errors.push("Name must be unique.");
  }

  if (errors.length) {
    throw new UserInputError("Invalid input", { errors });
  }
}

module.exports = { list, add, remove };
