const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

//TODO: Finalizar rotas e views do CRUD

router.get("/home", controller.home);

router.get("/cliente/cadastro", controller.cliente.cadastro);
router.post("/cliente/cadastro", controller.cliente.post);
router.get("/cliente/listagem", controller.cliente.listagem);

router.get("/motorista/cadastro", controller.motorista.cadastro);
router.post("/motorista/cadastro", controller.motorista.post);
router.get("/motorista/listagem", controller.motorista.listagem);

router.get("/viagem/cadastro", controller.viagem.cadastro);
router.post("/viagem/cadastro", controller.viagem.post);
router.get("/viagem/listagem", controller.viagem.listagem);

router.get("/passagem/cadastro", controller.passagem.cadastro);
router.post("/passagem/cadastro", controller.passagem.post);
router.get("/passagem/listagem", controller.passagem.listagem);

router.get("/compra/cadastro", controller.compra.cadastro);
router.post("/compra/cadastro", controller.compra.post);
router.get("/compra/listagem", controller.compra.listagem);

module.exports = router;
