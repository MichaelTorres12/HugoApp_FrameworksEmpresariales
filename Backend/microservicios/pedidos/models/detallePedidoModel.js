// Ubicación: microservicios/pedidos/models/detallePedidoModel.js

const { getConnection } = require('../../../db/dbConnection');
const pedidoModel = require('./pedidoModel');

async function agregarItemDetallePedido(datosDetalle) {
    const { PedidoID, MenuID, Cantidad } = datosDetalle;
    const connection = await getConnection();

    // Recuperar el precio desde la base de datos basado en MenuID
    const [items] = await connection.query('SELECT Precio FROM Menus WHERE MenuID = ?', [MenuID]);
    if (items.length === 0) {
        throw new Error('No se encontró el ítem del menú con el ID proporcionado.');
    }
    const precio = items[0].Precio;

    // Insertar el ítem en DetallePedidos
    await connection.query(
        'INSERT INTO DetallePedidos (PedidoID, MenuID, Cantidad, Precio) VALUES (?, ?, ?, ?)',
        [PedidoID, MenuID, Cantidad, precio]
    );

    // Recalcular y actualizar el total del pedido
    const [detalles] = await connection.query(
        'SELECT SUM(Precio * Cantidad) AS Total FROM DetallePedidos WHERE PedidoID = ?',
        [PedidoID]
    );
    const total = detalles[0].Total;

    // Actualizar el total en la tabla de Pedidos
    await pedidoModel.actualizarTotalPedido(PedidoID, total);
}

// Obtener pedidos por UsuarioID
async function obtenerPedidosPorUsuario(req, res) {
    try {
        const UsuarioID = req.params.UsuarioID;
        const pedidos = await pedidoModel.obtenerPedidosPorUsuario(UsuarioID);
        if (pedidos.length > 0) {
            res.json(pedidos);
        } else {
            res.status(404).send({ message: "No se encontraron pedidos para el usuario" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error al obtener los pedidos", error: error.message });
    }
}

async function obtenerDetallesPorPedidoID(PedidoID) {
    const connection = await getConnection();
    try {
        const [detalles] = await connection.query('SELECT * FROM DetallePedidos WHERE PedidoID = ?', [PedidoID]);
        return detalles;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    agregarItemDetallePedido,
    obtenerPedidosPorUsuario,
    obtenerDetallesPorPedidoID,
};
