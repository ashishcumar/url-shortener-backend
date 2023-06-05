const express = require("express");
const app = express();
var cors = require("cors");
const dotenv = require("dotenv").config();
const router = require("./routes/url");
// const bodyParser = require("body-parser");
const connectDb = require("./dbConfig/mongoDbConnection");

connectDb();
app.use(cors());
app.use(express.json())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", router);

app.listen(process.env.PORT, () =>
  console.log("server is running on port:-", process.env.PORT)
);
