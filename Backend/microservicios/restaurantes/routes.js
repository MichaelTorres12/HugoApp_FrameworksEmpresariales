const express = require('express');
const router = express.Router();
const restauranteController = require('./controllers/restauranteController');

router.get('/buscar', restauranteController.buscarPorTipoCocina);

// Listar todos los restaurantes
router.get('/', /* restaurantesController.listarRestaurantes */ (req, res) => {
  // Lógica para listar restaurantes
});

// Obtener detalles de un restaurante específico
router.get('/:restauranteID', restauranteController.obtenerDetallesRestaurante);

// Obtener el menu del restaurante especifico que he abierto
router.get('/:restauranteID/menu', restauranteController.obtenerMenuRestaurante);


module.exports = router;
