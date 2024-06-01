var express = require('express');
const { usuarios } = require('../database/database');
const usuariosC = require('../controllers/usuarios.c');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  usuariosC.listar()
  .then((respuesta) => {
    res.status(200).json({
      status: "200",
      mensaje: respuesta.mensaje,
      usuarios: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

module.exports = router;
