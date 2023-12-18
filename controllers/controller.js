const Cliente = require("../models/Cliente");
const Motorista = require("../models/Motorista");

function home(req, res) {
  res.render("home.ejs");
}

class TelasCliente {
  cadastro(req, res) {
    res.render("client/register.ejs");
  }

  listagem(req, res) {
    Cliente.find({}).then(function (clientes) {
      res.render("client/list.ejs", { Clientes: clientes });
    });
  }

  post(req, res) {
    let cliente = new Cliente({
      nome: req.body.nome,
      dataNascimento: req.body.dataNascimento,
      cpf: req.body.cpf,
      email: req.body.email,
    });

    cliente.save().then(function (docs, err) {
      console.log(docs);
      res.redirect("/cliente/listagem");
    });
  }
}

class TelasMotorista {
  cadastro(req, res) {
    res.render("driver/register.ejs");
  }

  listagem(req, res) {
    Motorista.find({}).then(function (motoristas) {
      res.render("driver/list.ejs", { Motoristas: motoristas });
    });
  }

  post(req, res) {
    let motorista = new Motorista({
      cpf: req.body.cpf,
      nome: req.body.nome,
      numRegistro: req.body.numRegistro,
      telefone: req.body.telefone,
    });

    motorista.save().then(function (docs, err) {
      res.redirect("/motorista/listagem");
      console.log(docs);
    });
  }
}

module.exports = {
  home,
  cliente: TelasCliente.prototype,
  motorista: TelasMotorista.prototype,
};
