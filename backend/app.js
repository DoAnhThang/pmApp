const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const User = require("./models/user");
const authRoutes = require("./routes/auth");
const directoryRoutes = require("./routes/directory");
const managementRoutes = require("./routes/management");
const reportRoutes = require("./routes/report");

const app = express();
// app.set("trust proxy", 1);
const store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: "sessions",
});
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "secretoffx19838", // a secret key used to encrypt the session cookie
    resave: false, // only save session when have the changes of session
    saveUninitialized: false, // prevent create empty session, so help performance
    store: store, // save session to database
    cookie: {
      // path: "/",
      httpOnly: true, // http only, prevents JavaScript cookie access
      sameSite: "lax", // allow the user to maintain a logged in status while arriving from an external link
      secure: false, // determine cookie will be used with HTTPS or not
      maxAge: 12 * 60 * 60 * 1000, // 12h
    },
  })
);

app.use("/auth", authRoutes);
app.use("/directory", directoryRoutes);
app.use("/management", managementRoutes);
app.use("/report", reportRoutes);

app.use((error, req, res, next) => {
  // console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ errorMsg: message, data: data });
});

app.use((req, res, next) => {
  res.statusMessage = "Route not found";
  res.status(404).json({ errorMsg: "Route not found" });
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then((result) =>
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server on " + process.env.PORT)
    )
  )
  .catch((err) => console.log(err));
