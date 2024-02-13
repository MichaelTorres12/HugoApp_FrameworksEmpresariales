// microservicios/restaurantes/controllers/restauranteController.js

const { buscarRestaurantesPorTipoCocina, obtenerDetallesPorId, obtenerMenuPorRestauranteId } = require('../models/restaurante');

//Funcion que recibe el parametro del tipo de cocina para filtrar y envia al modelo para realizar el query
async function buscarPorTipoCocina(req, res) {
    try {
        const tipoCocina = req.query.tipoCocina || ''; // Asegura un valor por defecto de cadena vacía
        const restaurantes = await buscarRestaurantesPorTipoCocina(tipoCocina);
        res.json(restaurantes);
    } catch (error) {
        res.status(500).send({ message: 'Error al buscar los restaurantes por tipo de cocina', error: error.message });
    }
}

//Funcion que recibe el parametro del restauranteID y envia al modelo.obtenerDetallesPorId para hacer el query y obtener los detalles de este restaurante
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

//Funcion que recibe el parametro del restauranteID y envia al modelo.obtenerMenuPorRestauranteId para hacer el query y obtener el menu de ese restaurante en especifico.
async function obtenerMenuRestaurante(req, res) {
    try {
        const restauranteId = req.params.restauranteID;
        const Menus = await obtenerMenuPorRestauranteId(restauranteId);
        res.json(Menus);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el menú del restaurante', error: error.message });
    }
}

module.exports = {
    buscarPorTipoCocina,
    obtenerDetallesRestaurante,
    obtenerMenuRestaurante
};
