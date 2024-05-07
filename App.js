const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require('morgan');

// const path=require("path")
require("dotenv").config();
let env = process.env;

const app = express();
// const PORT= 8080;


app.use(express.json());
app.use(express.urlencoded())
app.use("/public", express.static(__dirname + "/public"));
app.use(cors());


app.use(morgan("dev"));



mongoose.connect('mongodb+srv://hassanrazashah82:hassan@cluster0.e32oaiy.mongodb.net/entrepreneurship?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once("open", () => {
    console.log("Yahooo! Connection is Established.");
  })
  .on("error", (err) => {
    console.log("Err: ", err);
  });



  
  const TitleRoute=require('./router/app');
  app.use('/', TitleRoute);


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node Js API is Listening on port: ${port}`);
});