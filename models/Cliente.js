const connection = require("../config/connection.js");

const ClienteSchema = new connection.Schema({
  cpf: String,
  nome: String,
  email: String,
  dataNascimento: Date,
});

module.exports = connection.model("Cliente", ClienteSchema);
