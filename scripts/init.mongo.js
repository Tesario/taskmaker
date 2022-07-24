db.tasks.deleteMany({});
db.counters.deleteMany({});

db.counters.insertOne({ _id: "tasks", current: 0 });
