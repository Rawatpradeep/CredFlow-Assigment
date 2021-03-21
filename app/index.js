import Database from "../libs/postgres";
import UserApi from "../routes/index";

const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const Config = require("./config/config");
Config();

Database.init();

const app = express();

app.use(express.json({ limit: "50mb" }));
// app.use(
//   express.urlencoded({
//     extended: true,
//     limit: "50mb",
//   })
// );
app.use(cookieParser());
app.use(cors());
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: JSON.parse(process.config.cookieKey),
//   })
// );

// app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", UserApi);

const port = process.config.APP_PORT;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
