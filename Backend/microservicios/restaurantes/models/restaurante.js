// backend/microservicios/restaurantes/models/restaurante.js

const { getConnection } = require('../../../db/dbConnection');

//Funcion que busca/filtra restaurantes a mostrar por tipo de comida.
async function buscarRestaurantesPorTipoCocina(tipoCocina) {
    const connection = await getConnection();
    const [rows] = await connection.query(
        'SELECT * FROM Restaurantes WHERE TipoCocina LIKE ?', [`%${tipoCocina}%`]
    );
    return rows;
}

//Funcion que obtiene los detalles de un restaurante especifico a traves del ID del mismo.
async function obtenerDetallesPorId(restauranteId) {
    const connection = await getConnection();
    const [result] = await connection.query('SELECT * FROM Restaurantes WHERE RestauranteID = ?', [restauranteId]);
    return result[0]; // El RestauranteID es único, debería haber solo un resultado
}

//Funcion que obtiene el menú de un restaurante especifico a traves del ID de ese restaurante.
async function obtenerMenuPorRestauranteId(restauranteId) {
    const connection = await getConnection();
    const [menuItems] = await connection.query('SELECT * FROM Menus WHERE RestauranteID = ?', [restauranteId]);
    return menuItems;
}

module.exports = {
    buscarRestaurantesPorTipoCocina,
    obtenerDetallesPorId,
    obtenerMenuPorRestauranteId
};
