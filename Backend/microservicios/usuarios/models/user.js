const { getConnection, sql } = require('../../../db/dbConnection');

async function obtenerUsuarioPorEmail(email) {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT UsuarioID, Email, Contrasena FROM Usuarios WHERE Email = ?', [email]);
    
    return rows[0];
}

module.exports = {
    obtenerUsuarioPorEmail
};