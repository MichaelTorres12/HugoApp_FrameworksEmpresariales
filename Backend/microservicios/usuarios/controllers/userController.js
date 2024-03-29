const { obtenerUsuarioPorEmail } = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'michaelTorres'; // Debería ser una clave segura y almacenada en variables de entorno, por prueba mi name

async function login(req, res) {
    const { email, contrasena } = req.body;

    try {
        const usuario = await obtenerUsuarioPorEmail(email);

        if (!usuario || usuario.Contrasena !== contrasena) {
            return res.status(401).send({ message: 'Correo electrónico o contraseña incorrecta.' });
        }

        // Crear y firmar el JWT
        const token = jwt.sign({ id: usuario.UsuarioID, email: usuario.Email }, secretKey, { expiresIn: 1200 });

        //Agrego el UsuarioID en la respuesta al igual que el token
        res.json({ token, UsuarioID: usuario.UsuarioID });
    } catch (error) {
        res.status(500).send({ message: 'Error en el servidor', error: error.message });
    }
}

module.exports = {
    login
};