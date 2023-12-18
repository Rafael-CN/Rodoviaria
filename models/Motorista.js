const connection = require("../config/connection.js");
const Viagem = require("./Viagem.js");

const MotoristaSchema = new connection.Schema({
  cpf: String,
  nome: String,
  numRegistro: String,
  telefone: String,
});

MotoristaSchema.pre("findOneAndDelete", async function (next) {
  const viagens = await Viagem.find({ motorista: this._conditions._id });

  for (let i = 0; i <= viagens.length - 1; i++) {
    let viagem = viagens[i];
    await Viagem.findByIdAndDelete(viagem._id);
  }

  next();
});

module.exports = connection.model("Motorista", MotoristaSchema);
