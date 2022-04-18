const express = require("express");
const path = require("path");
const { installHandler } = require("./api/apiHandler");
const { connectToDb } = require("./api/db");
require("dotenv").config();

const app = express();
installHandler(app);

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

(async function () {
  try {
    await connectToDb();

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(
        `App is running on port ${port}, GraphQL: http:/localhost:${port}/graphql`
      );
    });
  } catch (error) {
    console.log(error);
  }
})();
