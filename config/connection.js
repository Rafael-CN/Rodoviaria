const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://admin:admin@ac-svc8zb7-shard-00-00.dyu5bnp.mongodb.net:27017,ac-svc8zb7-shard-00-01.dyu5bnp.mongodb.net:27017,ac-svc8zb7-shard-00-02.dyu5bnp.mongodb.net:27017/?ssl=true&replicaSet=atlas-vkzk86-shard-0&authSource=admin&retryWrites=true&w=majority"
);

module.exports = mongoose;
