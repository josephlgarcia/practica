import { cargarLibros } from "./load_libros.js";
import { cargarPrestamos } from "./load_prestamos.js";
import { cargarUsuarios } from "./load_usuarios.js";

(async () => {
    try {
        console.log('Iniciando seeders...');

        await cargarUsuarios()
        await cargarLibros()
        await cargarPrestamos()

        console.log('Todos los seeders ejecutados correctamente.');
    } catch (error) {
        console.error('Error ejecutando los seeders:', error.message);
    } finally {
        process.exit();
    }
})()