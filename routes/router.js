const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

//TODO: Finalizar rotas e views do CRUD

router.get("/home", controller.home);

router.get("/cliente/cadastro", controller.cliente.cadastro);
router.get("/cliente/cadastro/:id", controller.cliente.cadastro);
router.post("/cliente/cadastro", controller.cliente.post);
router.get("/cliente/listagem", controller.cliente.listagem);
router.get("/cliente/apagar/:id", controller.cliente.delete);

router.get("/motorista/cadastro", controller.motorista.cadastro);
router.get("/motorista/cadastro/:id", controller.motorista.cadastro);
router.post("/motorista/cadastro", controller.motorista.post);
router.get("/motorista/listagem", controller.motorista.listagem);
router.get("/motorista/apagar/:id", controller.motorista.delete);

router.get("/viagem/cadastro", controller.viagem.cadastro);
router.get("/viagem/cadastro/:id", controller.viagem.cadastro);
router.post("/viagem/cadastro", controller.viagem.post);
router.get("/viagem/listagem", controller.viagem.listagem);
router.get("/viagem/apagar/:id", controller.viagem.delete);

router.get("/passagem/cadastro", controller.passagem.cadastro);
router.get("/passagem/cadastro/:id", controller.passagem.cadastro);
router.post("/passagem/cadastro", controller.passagem.post);
router.get("/passagem/listagem", controller.passagem.listagem);
router.get("/passagem/apagar/:id", controller.passagem.delete);

router.get("/compra/cadastro", controller.compra.cadastro);
router.get("/compra/cadastro/:id", controller.compra.cadastro);
router.post("/compra/cadastro", controller.compra.post);
router.get("/compra/listagem", controller.compra.listagem);
router.get("/compra/apagar/:id", controller.compra.delete);

module.exports = router;
