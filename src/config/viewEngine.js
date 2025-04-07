const express = require("express");

const configViewEngine = (app) => {
  // config viewengine
  app.set("view engine", "ejs");
  app.set("views", "./src/views");

  //config static file
  app.use("/public", express.static("./src" + "/public"));
};

module.exports = configViewEngine;
