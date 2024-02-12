const express = require('express');
const router = express.Router();
const pedidoController = require ('./controllers/pedidoController.js')

// Ruta para crear un nuevo pedido
router.post('/crear', pedidoController.crearPedido);

// Ruta para agregar un ítem al detalle de un pedido
router.post('/detalle', pedidoController.agregarItemDetallePedido);

// Ruta para obtener pedidos por UsuarioID
router.get('/usuario/:UsuarioID', pedidoController.obtenerPedidosPorUsuario);

//Obtener un pedido en especifico
router.get('/:PedidoID', pedidoController.obtenerDetallePedido);


module.exports = router;