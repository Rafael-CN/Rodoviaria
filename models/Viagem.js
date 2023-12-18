const connection = require("../config/connection.js");
const Passagem = require("./Passagem.js");

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

ViagemSchema.pre("findOneAndDelete", async function (next) {
  const passagens = await Passagem.find({ viagem: this._conditions._id });

  for (let i = 0; i <= passagens.length - 1; i++) {
    let passagem = passagens[i];
    await Passagem.findByIdAndDelete(passagem._id);
  }

  next();
});

module.exports = connection.model("Viagem", ViagemSchema);
