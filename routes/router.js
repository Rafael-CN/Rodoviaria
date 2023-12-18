const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

//TODO: Finalizar rotas e views do CRUD

router.get("/home", controller.home);

router.get("/cliente/cadastro", controller.cliente.cadastro);
router.get("/cliente/listagem", controller.cliente.listagem);
router.post("/cliente/cadastro", controller.cliente.post);

router.get("/motorista/cadastro", controller.motorista.cadastro);
router.get("/motorista/listagem", controller.motorista.listagem);
router.post("/motorista/cadastro", controller.motorista.post);

module.exports = router;
