// backend/microservicios/restaurantes/models/restaurante.js

const { getConnection } = require('../../../db/dbConnection');

async function buscarRestaurantesPorTipoCocina(tipoCocina) {
    const connection = await getConnection();
    const [rows] = await connection.query(
        'SELECT * FROM Restaurantes WHERE TipoCocina LIKE ?', [`%${tipoCocina}%`]
    );
    return rows;
}

module.exports = {
    buscarRestaurantesPorTipoCocina
};
