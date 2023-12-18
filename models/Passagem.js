const connection = require("../config/connection.js");
const Compra = require("./Compra.js");

const PassagemSchema = new connection.Schema({
  viagem: {
    type: connection.Schema.Types.ObjectId,
    ref: "Viagem",
  },
  numAssento: Number,
  preco: Number,
  status: String,
});

PassagemSchema.pre("findOneAndDelete", async function (next) {
  const compras = await Compra.find({ passagem: this._conditions._id });

  for (let i = 0; i <= compras.length - 1; i++) {
    let compra = compras[i];
    await Compra.findByIdAndDelete(compra._id);
  }

  next();
});

module.exports = connection.model("Passagem", PassagemSchema);
