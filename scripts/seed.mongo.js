const faker = require("@faker-js/faker").faker;

db.tasks.deleteMany({});

for (let i = 1; i <= 30; i++) {
  const task = {
    id: i,
    title: faker.random.words(3),
    desc: faker.lorem.lines(faker.datatype.number({ min: 1, max: 15 })),
    completed: faker.datatype.boolean(),
    created: faker.date.past(1),
    due: faker.date.future(1.25),
    priority: faker.datatype.number({ min: 1, max: 5 }),
  };

  db.tasks.insertOne(task);
}

const count = db.tasks.countDocuments();
print(`Inserted ${count} tasks`);

db.counters.deleteOne({ _id: "tasks" });
db.counters.insertOne({ _id: "tasks", current: count });
