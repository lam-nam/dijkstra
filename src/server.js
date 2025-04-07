const express = require("express");
require("dotenv").config({ path: __dirname + "/.env" });
const webRouter = require("./routes/web");
const configViewEngine = require("./config/viewEngine");
const bodyParser = require("body-parser");

const app = express();

// Middleware;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3003;
configViewEngine(app);

app.use("/", webRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
