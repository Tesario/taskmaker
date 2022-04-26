db.tasks.deleteMany({});

const taskDB = [
  {
    id: 1,
    title: "Math test",
    desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque ipsum. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
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
    desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elitd. Pellentesque ipsum. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    status: "done",
    created: new Date("2022-04-4"),
    due: new Date("2022-04-4"),
    priority: 5,
  },
];

db.tasks.insertMany(taskDB);

const count = db.tasks.countDocuments();
print(`Inserted ${count} tasks`);

db.counters.deleteOne({ _id: "tasks" });
db.counters.insertOne({ _id: "tasks", current: count });
