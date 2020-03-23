const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const publicRoute = require("./routes/public");
const { URL, LOCALHOST } = require("./utils/constants");

const MONGODB_URI = process.env.MONGODB_URI || URL;
const PORT = process.env.PORT || LOCALHOST;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);

  next();
});

app.use("/", publicRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);

if (process.env.Node_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// for ALL routes that don't match, serve our react bundle.
// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", function(req, res) {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT || PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
