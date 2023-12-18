const Cliente = require("../models/Cliente");
const Motorista = require("../models/Motorista");
const Viagem = require("../models/Viagem");

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

    cliente.save().then(function () {
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

    motorista.save().then(function () {
      res.redirect("/motorista/listagem");
    });
  }
}

class TelasViagem {
  cadastro(req, res) {
    Motorista.find({}).then(function (motoristas) {
      res.render("trip/register.ejs", { Motoristas: motoristas });
    });
  }

  listagem(req, res) {
    Viagem.find({})
      .populate("motorista")
      .then(function (viagens) {
        res.render("trip/list.ejs", { Viagens: viagens });
      });
  }

  post(req, res) {
    let viagem = new Viagem({
      motorista: req.body.motorista,
      dataPartida: req.body.dataPartida,
      dataChegada: req.body.dataChegada,
      cidadeOrigem: req.body.cidadeOrigem,
      cidadeDestino: req.body.cidadeDestino,
    });

    viagem.save().then(function () {
      res.redirect("/viagem/listagem");
    });
  }
}

module.exports = {
  home,
  cliente: TelasCliente.prototype,
  motorista: TelasMotorista.prototype,
  viagem: TelasViagem.prototype,
};
