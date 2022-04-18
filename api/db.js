const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI || "mongodb://localhost:27017/taskmaker";
let db;

const connectToDb = async () => {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log(`Database is connected at ${url}`);
  db = client.db();
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

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };
