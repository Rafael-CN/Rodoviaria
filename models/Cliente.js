const connection = require("../config/connection.js");
const Compra = require("./Compra.js");
const Passagem = require("./Passagem.js");

const ClienteSchema = new connection.Schema({
  cpf: String,
  nome: String,
  email: String,
  dataNascimento: Date,
});

ClienteSchema.pre("findOneAndDelete", async function (next) {
  const compras = await Compra.find({ cliente: this._conditions._id });

  for (let i = 0; i <= compras.length - 1; i++) {
    let compra = compras[i];
    await Passagem.findByIdAndUpdate(compra.passagem._id, {
      status: "DISPONÍVEL",
    });

    await Compra.findByIdAndDelete(compra._id);
  }

  next();
});

module.exports = connection.model("Cliente", ClienteSchema);
