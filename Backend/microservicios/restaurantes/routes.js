const express = require('express');
const router = express.Router();
// const restaurantesController = require('./controllers/restaurantesController');

// Listar todos los restaurantes
router.get('/', /* restaurantesController.listarRestaurantes */ (req, res) => {
  // Lógica para listar restaurantes
});

// Obtener detalles de un restaurante específico
router.get('/:restauranteId', /* restaurantesController.obtenerRestaurante */ (req, res) => {
  // Lógica para obtener los detalles y menú de un restaurante específico
});

module.exports = router;