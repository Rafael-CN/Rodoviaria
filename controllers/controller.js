const Cliente = require("../models/Cliente");
const Motorista = require("../models/Motorista");
const Viagem = require("../models/Viagem");
const Passagem = require("../models/Passagem");
const Compra = require("../models/Compra");

function home(req, res) {
  Viagem.find({})
    .populate("motorista")
    .then(function (viagens) {
      res.render("home.ejs", { Viagens: viagens });
    });
}

class TelasCliente {
  cadastro(req, res) {
    if (req.params.id) {
      Cliente.findById(req.params.id).then(function (cliente) {
        res.render("client/register.ejs", { Cliente: cliente });
      });
    } else {
      res.render("client/register.ejs", { Cliente: null });
    }
  }

  listagem(req, res) {
    Cliente.find({}).then(function (clientes) {
      res.render("client/list.ejs", { Clientes: clientes });
    });
  }

  post(req, res) {
    if (req.body.id.length === 0) {
      let cliente = new Cliente({ ...req.body });

      cliente.save().then(function () {
        res.redirect("/cliente/listagem");
      });
    } else {
      Cliente.findByIdAndUpdate(req.body.id, {
        ...req.body,
      }).then(function () {
        res.redirect("/cliente/listagem");
      });
    }
  }

  delete(req, res) {
    Cliente.findByIdAndDelete(req.params.id).then(function () {
      res.redirect("/cliente/listagem");
    });
  }
}

class TelasMotorista {
  cadastro(req, res) {
    if (req.params.id) {
      Motorista.findById(req.params.id).then(function (motorista) {
        res.render("driver/register.ejs", { Motorista: motorista });
      });
    } else {
      res.render("driver/register.ejs", { Motorista: null });
    }
  }

  listagem(req, res) {
    Motorista.find({}).then(function (motoristas) {
      res.render("driver/list.ejs", { Motoristas: motoristas });
    });
  }

  post(req, res) {
    if (req.body.id.length === 0) {
      let motorista = new Motorista({ ...req.body });

      motorista.save().then(function () {
        res.redirect("/motorista/listagem");
      });
    } else {
      Motorista.findByIdAndUpdate(req.body.id, { ...req.body }).then(
        function () {
          res.redirect("/motorista/listagem");
        }
      );
    }
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
      if (req.params.id) {
        Viagem.findById(req.params.id)
          .populate("motorista")
          .then(function (viagem) {
            res.render("trip/register.ejs", {
              Motoristas: motoristas,
              Viagem: viagem,
            });
          });
      } else {
        res.render("trip/register.ejs", {
          Motoristas: motoristas,
          Viagem: null,
        });
      }
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
    if (req.body.id.length === 0) {
      let viagem = new Viagem({ ...req.body });

      viagem.save().then(function () {
        res.redirect("/viagem/listagem");
      });
    } else {
      Viagem.findByIdAndUpdate(req.body.id, { ...req.body }).then(function () {
        res.redirect("/viagem/listagem");
      });
    }
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
      if (req.params.id) {
        Passagem.findById(req.params.id)
          .populate("viagem")
          .then(function (passagem) {
            res.render("ticket/register.ejs", {
              Viagens: viagens,
              Passagem: passagem,
            });
          });
      } else {
        res.render("ticket/register.ejs", {
          Viagens: viagens,
          Passagem: null,
        });
      }
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
    if (req.body.id.length === 0) {
      let passagem = new Passagem({ ...req.body });
      passagem.status = "DISPONÍVEL";

      passagem.save().then(function () {
        res.redirect("/passagem/listagem");
      });
    } else {
      Passagem.findByIdAndUpdate(req.body.id, {
        ...req.body,
      }).then(function () {
        res.redirect("/passagem/listagem");
      });
    }
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
          if (req.params.id) {
            Compra.findById(req.params.id).then(function (compra) {
              res.render("purchase/register.ejs", {
                Passagens: passagens,
                Clientes: clientes,
                Compra: compra,
              });
            });
          } else {
            res.render("purchase/register.ejs", {
              Passagens: passagens,
              Clientes: clientes,
              Compra: null,
            });
          }
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
    if (req.body.id.length === 0) {
      let compra = new Compra({ ...req.body });
      compra.dataCompra = new Date();

      Passagem.findByIdAndUpdate(req.body.passagem, {
        status: "VENDIDO",
      }).then(function () {
        compra.save().then(function () {
          res.redirect("/compra/listagem");
        });
      });
    } else {
      Compra.findById(req.body.id).then(function (compra) {
        Passagem.findByIdAndUpdate(compra.passagem._id, {
          status: "DISPONÍVEL",
        }).then(function () {
          Passagem.findByIdAndUpdate(req.body.passagem, {
            status: "VENDIDO",
          }).then(function () {
            Compra.findByIdAndUpdate(req.body.id, {
              ...req.body,
            }).then(function () {
              res.redirect("/compra/listagem");
            });
          });
        });
      });
    }
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
