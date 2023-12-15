const connection = require("../config/connection.js");

const PassagemSchema = new connection.Schema({
  viagem: {
    type: connection.Schema.Types.ObjectId,
    ref: "Viagem",
  },
  numAssento: Number,
  preco: Number,
  status: String,
});

module.exports = connection.model("Passagem", PassagemSchema);
