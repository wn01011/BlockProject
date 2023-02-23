const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes/index.js");
const cors = require("cors");
dotenv.config();
const { BlockSetting } = require("./routes/web3");

const { sequelize } = require("./models/index.js");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.set(
  "port",
  process.env.NODE_ENV === "production"
    ? process.env.PORT
    : process.env.DEV_PORT
);

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/", express.static(path.join(__dirname, "build")));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session",
  })
);

app.use("/api", routes);

sequelize
  .sync({ force: true })
  .then(() => {
    BlockSetting();
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(app.get("port"), () => {
  console.log("serverstart", app.get("port"));
});
