db.tasks.deleteMany({});
db.users.deleteMany({});
db.categories.deleteMany({});
db.counters.deleteMany({});

db.counters.insertOne({ _id: "tasks", current: 0 });
