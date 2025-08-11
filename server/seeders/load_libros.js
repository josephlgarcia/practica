import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { pool } from '../conexion_db.js';

export async function cargarLibros() {

    const rutaArchivo = path.resolve('server/data/libros.csv');
    const libros = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(rutaArchivo).pipe(csv({
            mapHeaders: ( {header} ) => header.replace('\ufeff', '')
        }))
            .on("data", (fila) => {
                libros.push([
                    fila.isbn,
                    fila.titulo,
                    fila.anio_publicacion,
                    fila.autor
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO libros (isbn,titulo,anio_publicacion,autor) VALUES ?';
                    const [result] = await pool.query(sql, [libros]);

                    console.log(`Se insertaron ${result.affectedRows} libros.`);
                    resolve();
                } catch (error) {
                    console.error('Error al insertar libros:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('Error al leer el archivo CSV de libros:', err.message);
                reject(err);
            });
    });
}