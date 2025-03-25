const express = require('express');
const router = express.Router();
const Enfermera = require('../models/Enfermera'); 

// ✅ Ruta para obtener enfermeras en formato tabla HTML
router.get('/', async (req, res) => {
    try {
        const enfermeras = await Enfermera.findAll();

        let tablaHTML = `
            <html>
            <head>
                <title>Lista de Enfermeras</title>
                <style>
                    table { 
                        width: 80%; 
                        margin: 20px auto; 
                        border-collapse: collapse; 
                    }
                    th, td { 
                        padding: 10px; 
                        text-align: left; 
                        border: 1px solid #ddd; 
                    }
                    th { 
                        background-color: #f2f2f2; 
                    }
                    body { 
                        font-family: Arial, sans-serif; 
                        text-align: center; 
                        background-color: #f9f9f9; 
                    }
                    h2 { 
                        color: #333; 
                    }
                    button {
                        padding: 10px 20px;
                        margin: 10px;
                        cursor: pointer;
                        font-size: 16px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 5px;
                    }
                    button:hover {
                        background-color: #45a049;
                    }
                    .form-container {
                        margin: 20px;
                    }
                </style>
            </head>
            <body>
                <h2>Lista de Enfermeras</h2>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Teléfono</th>
                        <th>Correo Electrónico</th>
                        <th>ID Usuario</th>
                        <th>Acciones</th>
                    </tr>`;

        enfermeras.forEach(enfermera => {
            tablaHTML += `
                <tr>
                    <td>${enfermera.id_enfermera}</td>
                    <td>${enfermera.nombre}</td>
                    <td>${enfermera.apellido}</td>
                    <td>${enfermera.telefono}</td>
                    <td>${enfermera.correo_electronico}</td>
                    <td>${enfermera.usuario_id}</td>
                    <td>
                        <button onclick="location.href='/enfermeras/editar/${enfermera.id_enfermera}'">Editar</button>
                        <button onclick="location.href='/enfermeras/eliminar/${enfermera.id_enfermera}'">Eliminar</button>
                    </td>
                </tr>`;
        });

        tablaHTML += `</table>`;

        // Botón para agregar nueva enfermera
        tablaHTML += `
            <div class="form-container">
                <button onclick="location.href='/enfermeras/nueva'">Agregar Nueva Enfermera</button>
            </div>
        `;

        res.send(tablaHTML);
    } catch (error) {
        console.error("❌ Error al obtener enfermeras:", error);
        res.status(500).send('Error obteniendo enfermeras');
    }
});

// ✅ Ruta para crear nueva enfermera (Formulario)
router.get('/nueva', (req, res) => {
    let formularioHTML = `
        <html>
        <head>
            <title>Agregar Nueva Enfermera</title>
        </head>
        <body>
            <h2>Agregar Nueva Enfermera</h2>
            <form action="/enfermeras/crear" method="POST">
                <label for="nombre">Nombre:</label><br>
                <input type="text" id="nombre" name="nombre" required><br><br>
                <label for="apellido">Apellido:</label><br>
                <input type="text" id="apellido" name="apellido" required><br><br>
                <label for="telefono">Teléfono:</label><br>
                <input type="text" id="telefono" name="telefono" required><br><br>
                <label for="correo_electronico">Correo Electrónico:</label><br>
                <input type="email" id="correo_electronico" name="correo_electronico" required><br><br>
                <label for="usuario_id">ID Usuario:</label><br>
                <input type="number" id="usuario_id" name="usuario_id" required><br><br>
                <input type="submit" value="Crear Enfermera">
            </form>
        </body>
        </html>
    `;
    res.send(formularioHTML);
});

// ✅ Ruta para crear enfermera (POST)
router.post('/crear', async (req, res) => {
    const { nombre, apellido, telefono, correo_electronico, usuario_id } = req.body;
    try {
        await Enfermera.create({ nombre, apellido, telefono, correo_electronico, usuario_id });
        res.redirect('/enfermeras'); // Redirigir a la lista de enfermeras
    } catch (error) {
        console.error("❌ Error al crear enfermera:", error);
        res.status(500).send('Error al crear enfermera');
    }
});

// ✅ Ruta para eliminar enfermera
router.get('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Enfermera.destroy({ where: { id_enfermera: id } });
        res.redirect('/enfermeras'); // Redirigir a la lista de enfermeras
    } catch (error) {
        console.error("❌ Error al eliminar enfermera:", error);
        res.status(500).send('Error al eliminar enfermera');
    }
});

// ✅ Ruta para editar enfermera (Formulario)
router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const enfermera = await Enfermera.findByPk(id);
        if (!enfermera) {
            return res.status(404).send('Enfermera no encontrada');
        }

        let formularioHTML = `
            <html>
            <head>
                <title>Editar Enfermera</title>
            </head>
            <body>
                <h2>Editar Enfermera</h2>
                <form action="/enfermeras/editar/${id}" method="POST">
                    <label for="nombre">Nombre:</label><br>
                    <input type="text" id="nombre" name="nombre" value="${enfermera.nombre}" required><br><br>
                    <label for="apellido">Apellido:</label><br>
                    <input type="text" id="apellido" name="apellido" value="${enfermera.apellido}" required><br><br>
                    <label for="telefono">Teléfono:</label><br>
                    <input type="text" id="telefono" name="telefono" value="${enfermera.telefono}" required><br><br>
                    <label for="correo_electronico">Correo Electrónico:</label><br>
                    <input type="email" id="correo_electronico" name="correo_electronico" value="${enfermera.correo_electronico}" required><br><br>
                    <label for="usuario_id">ID Usuario:</label><br>
                    <input type="number" id="usuario_id" name="usuario_id" value="${enfermera.usuario_id}" required><br><br>
                    <input type="submit" value="Actualizar Enfermera">
                </form>
            </body>
            </html>
        `;
        res.send(formularioHTML);
    } catch (error) {
        console.error("❌ Error al editar enfermera:", error);
        res.status(500).send('Error al editar enfermera');
    }
});

// ✅ Ruta para actualizar enfermera (POST)
router.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, correo_electronico, usuario_id } = req.body;
    try {
        await Enfermera.update({ nombre, apellido, telefono, correo_electronico, usuario_id }, { where: { id_enfermera: id } });
        res.redirect('/enfermeras'); // Redirigir a la lista de enfermeras
    } catch (error) {
        console.error("❌ Error al actualizar enfermera:", error);
        res.status(500).send('Error al actualizar enfermera');
    }
});

module.exports = router;
