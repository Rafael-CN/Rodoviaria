const Cliente = require("../models/Cliente");
const Motorista = require("../models/Motorista");
const Viagem = require("../models/Viagem");
const Passagem = require("../models/Passagem");
const Compra = require("../models/Compra");

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
    let cliente = new Cliente({ ...req.body });

    cliente.save().then(function () {
      res.redirect("/cliente/listagem");
    });
  }

  delete(req, res) {
    Cliente.findByIdAndDelete(req.params.id).then(function () {
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
    let motorista = new Motorista({ ...req.body });

    motorista.save().then(function () {
      res.redirect("/motorista/listagem");
    });
  }

  delete(req, res) {
    Motorista.findByIdAndDelete(req.params.id).then(function () {
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
    let viagem = new Viagem({ ...req.body });

    viagem.save().then(function () {
      res.redirect("/viagem/listagem");
    });
  }

  delete(req, res) {
    Viagem.findByIdAndDelete(req.params.id).then(function () {
      res.redirect("/viagem/listagem");
    });
  }
}

class TelasPassagem {
  cadastro(req, res) {
    Viagem.find({}).then(function (viagens) {
      res.render("ticket/register.ejs", { Viagens: viagens });
    });
  }

  listagem(req, res) {
    Passagem.find({})
      .populate("viagem")
      .then(function (passagens) {
        res.render("ticket/list.ejs", { Passagens: passagens });
      });
  }

  post(req, res) {
    let passagem = new Passagem({ ...req.body });
    passagem.status = "DISPONÍVEL";

    passagem.save().then(function () {
      res.redirect("/passagem/listagem");
    });
  }

  delete(req, res) {
    Passagem.findByIdAndDelete(req.params.id).then(function () {
      res.redirect("/passagem/listagem");
    });
  }
}

class TelasCompra {
  cadastro(req, res) {
    Passagem.find({})
      .populate("viagem")
      .then(function (passagens) {
        Cliente.find({}).then(function (clientes) {
          res.render("purchase/register.ejs", {
            Passagens: passagens,
            Clientes: clientes,
          });
        });
      });
  }

  listagem(req, res) {
    Compra.find({})
      .populate("passagem")
      .populate("cliente")
      .populate({
        path: "passagem",
        populate: {
          path: "viagem",
          model: "Viagem",
        },
      })
      .then(function (compras) {
        res.render("purchase/list.ejs", { Compras: compras });
      });
  }

  post(req, res) {
    let compra = new Compra({ ...req.body });
    compra.dataCompra = new Date();

    Passagem.findByIdAndUpdate(req.body.passagem, {
      status: "VENDIDO",
    }).then(function () {
      compra.save().then(function () {
        res.redirect("/compra/listagem");
      });
    });
  }

  delete(req, res) {
    Compra.findByIdAndDelete(req.params.id).then(function (result) {
      Passagem.findByIdAndUpdate(result.passagem._id, {
        status: "DISPONÍVEL",
      }).then(function () {
        res.redirect("/compra/listagem");
      });
    });
  }
}

module.exports = {
  home,
  cliente: TelasCliente.prototype,
  motorista: TelasMotorista.prototype,
  viagem: TelasViagem.prototype,
  passagem: TelasPassagem.prototype,
  compra: TelasCompra.prototype,
};
