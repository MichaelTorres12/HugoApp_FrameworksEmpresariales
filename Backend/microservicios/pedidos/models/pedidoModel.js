// Ubicación: microservicios/pedidos/models/pedidoModel.js

const { getConnection } = require('../../../db/dbConnection');

async function crearPedido(datosPedido) {
    const { UsuarioID, DireccionEntrega, MetodoPago } = datosPedido;
    const FechaPedido = new Date();
    const Estado = 'Preparando';
    const Total = 0; // Inicializar el total a 0

    const connection = await getConnection();
    const [result] = await connection.query('INSERT INTO Pedidos (UsuarioID, FechaPedido, Estado, Total, DireccionEntrega, MetodoPago) VALUES (?, ?, ?, ?, ?, ?)', [UsuarioID, FechaPedido, Estado, Total, DireccionEntrega, MetodoPago]);

    return result.insertId;
}

async function actualizarTotalPedido(PedidoID, Total) {
    const connection = await getConnection();
    
    // Calcular el nuevo total
    const [result] = await connection.query(
        'SELECT SUM(Precio * Cantidad) AS Total FROM DetallePedidos WHERE PedidoID = ?',
        [PedidoID]
    );
    const nuevoTotal = result[0].Total;

    // Actualizar el total en la tabla de Pedidos
    await connection.query(
        'UPDATE Pedidos SET Total = ? WHERE PedidoID = ?',
        [nuevoTotal, PedidoID]
    );
}

async function obtenerPedidosPorUsuario(UsuarioID) {
    const connection = await getConnection();
    const [pedidos] = await connection.query('SELECT * FROM Pedidos WHERE UsuarioID = ?', [UsuarioID]);
    return pedidos;
}

module.exports = {
    crearPedido,
    actualizarTotalPedido,
    obtenerPedidosPorUsuario,
};

