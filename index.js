const path = require("path");

const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const router = require("./routes/router.js");
app.use(router);

app.listen("3000");
