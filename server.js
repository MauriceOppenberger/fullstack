const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const publicRoute = require("./routes/public");
const { URL, PORT } = require("./utils/constants");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", true);

  next();
});
app.use("/", publicRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.get("*", (req, res) => {
  res.status(404).send("Sorry, that web page doesn't exist 🤷🏻‍");
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
