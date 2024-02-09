// backend/microservicios/restaurantes/models/restaurante.js

const { getConnection } = require('../../../db/dbConnection');

async function buscarRestaurantesPorTipoCocina(tipoCocina) {
    const connection = await getConnection();
    const [rows] = await connection.query(
        'SELECT * FROM Restaurantes WHERE TipoCocina LIKE ?', [`%${tipoCocina}%`]
    );
    return rows;
}

async function obtenerDetallesPorId(restauranteId) {
    const connection = await getConnection();
    const [result] = await connection.query('SELECT * FROM Restaurantes WHERE RestauranteID = ?', [restauranteId]);
    return result[0]; // Asumiendo que RestauranteID es único, debería haber solo un resultado
}

async function obtenerMenuPorRestauranteId(restauranteId) {
    const connection = await getConnection();
    const [menuItems] = await connection.query('SELECT * FROM Menu WHERE RestauranteID = ?', [restauranteId]);
    return menuItems;
}

module.exports = {
    buscarRestaurantesPorTipoCocina,
    obtenerDetallesPorId,
    obtenerMenuPorRestauranteId
};
