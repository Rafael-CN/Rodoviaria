const connection = require("../config/connection.js");

const CompraSchema = new connection.Schema({
  cliente: {
    type: connection.Schema.Types.ObjectId,
    ref: "Cliente",
  },
  passagem: {
    type: connection.Schema.Types.ObjectId,
    ref: "Passagem",
  },
  dataCompra: Date,
});

module.exports = connection.model("Compra", CompraSchema);
