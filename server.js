const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./app/router/router");

const app = express();

app.use(cors());

//morgan
app.use(morgan("dev"));

//parse requests of content-type : application/json
app.use(bodyParser.json());

//parse requests of content-type: application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

//set port, listen for request
app.listen(4000, () => {
  console.log("Sever is running port 4000");
});
