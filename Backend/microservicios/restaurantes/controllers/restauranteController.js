// microservicios/restaurantes/controllers/restauranteController.js

const { buscarRestaurantesPorTipoCocina } = require('../models/restaurante');

async function buscarPorTipoCocina(req, res) {
    try {
        const tipoCocina = req.query.tipoCocina || ''; // Asegura un valor por defecto de cadena vacía
        const restaurantes = await buscarRestaurantesPorTipoCocina(tipoCocina);
        res.json(restaurantes);
    } catch (error) {
        res.status(500).send({ message: 'Error al buscar los restaurantes por tipo de cocina', error: error.message });
    }
}

module.exports = {
    buscarPorTipoCocina
};