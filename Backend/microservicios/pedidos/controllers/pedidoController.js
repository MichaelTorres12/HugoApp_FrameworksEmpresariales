// Ubicación: microservicios/pedidos/controllers/pedidoController.js

const pedidoModel = require('../models/pedidoModel');
const detallePedidoModel = require('../models/detallePedidoModel');

async function crearPedido(req, res) {
    try {
        const pedidoId = await pedidoModel.crearPedido(req.body);
        res.status(201).json({ message: "Pedido creado exitosamente", PedidoID: pedidoId });
    } catch (error) {
        res.status(500).send({ message: "Error al crear el pedido", error: error.message });
    }
}

async function agregarItemDetallePedido(req, res) {
    try {
        await detallePedidoModel.agregarItemDetallePedido(req.body);
        res.status(201).json({ message: "Ítem agregado al pedido exitosamente" });
    } catch (error) {
        res.status(500).send({ message: "Error al agregar ítem al pedido", error: error.message });
    }
}

// Obtener pedidos por UsuarioID
async function obtenerPedidosPorUsuario(req, res) {
    try {
        const UsuarioID = req.params.UsuarioID; // Asegúrate de capturar el UsuarioID correctamente de los parámetros de la ruta
        const pedidos = await pedidoModel.obtenerPedidosPorUsuario(UsuarioID);
        res.json(pedidos);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los pedidos", error: error.message });
    }
}

module.exports = {
    crearPedido,
    agregarItemDetallePedido,
    obtenerPedidosPorUsuario,
};