const connection = require("../config/connection.js");

const ViagemSchema = new connection.Schema({
  motorista: {
    type: connection.Schema.Types.ObjectId,
    ref: "Motorista",
  },
  dataPartida: Date,
  dataChegada: Date,
  cidadeOrigem: String,
  cidadeDestino: String,
});

module.exports = connection.model("Viagem", ViagemSchema);
