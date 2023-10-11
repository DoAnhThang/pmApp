const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth");
const directoryRoutes = require("./routes/directory");
const managementRoutes = require("./routes/management");
const reportRoutes = require("./routes/report");

const app = express();
app.set("trust proxy", 1);
const store = new MongoDBStore({
  uri: process.env.DATABASE_URI,
  collection: "sessions",
});
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://pm-app-thangda.netlify.app"],
    method: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "secretsofthangda",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/auth", authRoutes);
app.use("/directory", directoryRoutes);
app.use("/management", managementRoutes);
app.use("/report", reportRoutes);

app.use((error, req, res, next) => {
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
  .connect(process.env.DATABASE_URI)
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server on " + process.env.PORT)
    )
  )
  .catch((err) => console.log(err));
