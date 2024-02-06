// Importa el módulo MySQL
const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos MySQL
const config = {
    host: 'localhost', // o la dirección IP si es remoto
    user: 'root',
    password: 'admin',
    database: 'HugoAppFrameworksEmpresariales',
};

// Función para obtener una conexión a la base de datos
const getConnection = async () => {
    try {
        // Realiza la conexión con la configuración especificada
        const connection = await mysql.createConnection(config);
        console.log('Conexión a la base de datos MySQL establecida');
        return connection;
    } catch (err) {
        console.error('Error al conectar a la base de datos MySQL:', err);
        throw err;
    }
};

// Exporta la función para que pueda ser utilizada por otros archivos
module.exports = {
    getConnection
};
