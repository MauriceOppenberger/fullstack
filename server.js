const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const publicRoute = require("./routes/public");

// Define env variables
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 8080;

// Init Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);

  next();
});
// Define Routes
app.use("/", publicRoute);
app.use("/auth", authRoute);
app.use("/admin", adminRoute);

//Serve static assests in production
if (process.env.Node_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// Init error handling middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// Connect to database and start server
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
