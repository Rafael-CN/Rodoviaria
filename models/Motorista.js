const connection = require("../config/connection.js");

const MotoristaSchema = new connection.Schema({
  cpf: String,
  nome: String,
  numRegistro: String,
  telefone: String,
});

module.exports = connection.model("Motorista", MotoristaSchema);
