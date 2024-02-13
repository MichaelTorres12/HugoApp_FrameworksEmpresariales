// Importaciones necesarias...
const express = require('express');
const userController = require('./controllers/userController');
const router = express.Router();

//Ruta para el endpoint del login
router.post('/login', userController.login);

module.exports = router;
