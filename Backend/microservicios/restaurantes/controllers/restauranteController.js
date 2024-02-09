// microservicios/restaurantes/controllers/restauranteController.js

const { buscarRestaurantesPorTipoCocina, obtenerDetallesPorId, obtenerMenuPorRestauranteId } = require('../models/restaurante');

async function buscarPorTipoCocina(req, res) {
    try {
        const tipoCocina = req.query.tipoCocina || ''; // Asegura un valor por defecto de cadena vacía
        const restaurantes = await buscarRestaurantesPorTipoCocina(tipoCocina);
        res.json(restaurantes);
    } catch (error) {
        res.status(500).send({ message: 'Error al buscar los restaurantes por tipo de cocina', error: error.message });
    }
}

async function obtenerDetallesRestaurante(req, res) {
    try {
        const restauranteId = req.params.restauranteID;
        const restaurante = await obtenerDetallesPorId(restauranteId);
        if (!restaurante) {
            return res.status(404).send({ message: 'Restaurante no encontrado' });
        }
        res.json(restaurante);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el restaurante', error: error.message });
    }
}

async function obtenerMenuRestaurante(req, res) {
    try {
        const restauranteId = req.params.restauranteID;
        const menu = await obtenerMenuPorRestauranteId(restauranteId);
        res.json(menu);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el menú del restaurante', error: error.message });
    }
}

module.exports = {
    buscarPorTipoCocina,
    obtenerDetallesRestaurante,
    obtenerMenuRestaurante
};
