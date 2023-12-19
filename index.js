const path = require("path");

const express = require("express");
const app = express();

const moment = require("moment");
moment.locale("pt-br");
app.locals.moment = moment;

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const router = require("./routes/router.js");
app.use(router);

console.log("O servidor está iniciando...");
app.listen("3000");
