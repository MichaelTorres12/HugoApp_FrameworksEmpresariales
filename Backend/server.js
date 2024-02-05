const express = require('express');
const app = express();

// Middleware para parsear el cuerpo de las solicitudes POST en formato JSON
app.use(express.json());

// Configura el puerto. Usa el valor por defecto del entorno o el 3000 si no hay ninguno definido
const PORT = process.env.PORT || 3000;

// Rutas base para cada microservicio, Aquí importo los routers de mis microservicios
const usuariosRouter = require('./microservicios/usuarios/routes');
const restaurantesRouter = require('./microservicios/restaurantes/routes');
const pedidosRouter = require('./microservicios/pedidos/routes');

//Defino el prefijo de ruta principal para cada conjunto de rutas de mis microservicio.
app.use('/api/usuarios', usuariosRouter);
app.use('/api/restaurantes', restaurantesRouter);
app.use('/api/pedidos', pedidosRouter);


// Ruta de prueba para asegurarte de que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente!🥳🎉');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
