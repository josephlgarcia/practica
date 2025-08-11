import mysql from "mysql2/promise"

export const pool = mysql.createPool({
    host: "localhost",
    database: "practica",
    port: "3306",
    user: "root",
    password: "1234",
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

async function probarConexion() {
    try {
        const conexion = await pool.getConnection();
        console.log('conexion exitosa');
        conexion.release();
    } catch (error) {
        console.error('error al conectarse a la base de datos: ', error.message);
    }
}

probarConexion();