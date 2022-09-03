require('./lib/config');

const express = require("express");
const pino = require("pino-http");
const { postgrator, pool } = require("./lib/db");
const { uploadedFilesFolderName } = require("./middlewares/multipart");

const app = express();
/**
 * Log levels:
 * Debug
 * Info
 * Warn
 * Error
 */
app.use(pino({ level: process.env.LOG_LEVEL }));
app.use(express.json());
app.use(require("cors")());

// all GET requests to /public/... will be served as files
app.use("/" + uploadedFilesFolderName, express.static(uploadedFilesFolderName));

app.use("/products", require("./routes/products"));
app.use("/users", require("./routes/users"));

app.get("/", (req, res) => {
  req.log.debug(req.params);
  res.send("Hello world from production");
});

const host = process.env.HOST;
const port = +process.env.PORT;

module.exports = app;

postgrator
  .migrate()
  .then((result) => {
    console.log(`migrated db successfully:`, result);
    if (process.env.NODE_ENV !== "test") {
      app.listen(port, host, () => {
        console.log(`server is listening at http://${host}:${port}`);
      });
    }
  })
  .catch((error) => {
    // pool.end()
    console.error(error)
  });
