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
                <table id="enfermerasTable">
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
                <button onclick="toggleForm()">Agregar Nueva Enfermera</button>
            </div>

            <!-- Formulario para agregar nueva enfermera (inicialmente oculto) -->
            <div id="formContainer" style="display:none;">
                <h3>Formulario de Nueva Enfermera</h3>
                <form id="formNuevo" onsubmit="agregarEnfermera(event)">
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
            </div>
        `;

        res.send(tablaHTML);
    } catch (error) {
        console.error("❌ Error al obtener enfermeras:", error);
        res.status(500).send('Error obteniendo enfermeras');
    }
});

// ✅ Ruta para crear enfermera
router.post('/crear', async (req, res) => {
    const { nombre, apellido, telefono, correo_electronico, usuario_id } = req.body;
    try {
        const nuevaEnfermera = await Enfermera.create({ nombre, apellido, telefono, correo_electronico, usuario_id });
        res.json(nuevaEnfermera);
    } catch (error) {
        console.error("❌ Error al crear enfermera:", error);
        res.status(500).send('Error al crear enfermera');
    }
});

const toggleForm = () => {
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
};

const agregarEnfermera = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/enfermeras/crear', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        const nuevaEnfermera = await response.json();

        if (nuevaEnfermera) {
            const table = document.getElementById('enfermerasTable');
            const row = table.insertRow();
            row.innerHTML = `
                <td>${nuevaEnfermera.id_enfermera}</td>
                <td>${nuevaEnfermera.nombre}</td>
                <td>${nuevaEnfermera.apellido}</td>
                <td>${nuevaEnfermera.telefono}</td>
                <td>${nuevaEnfermera.correo_electronico}</td>
                <td>${nuevaEnfermera.usuario_id}</td>
                <td>
                    <button onclick="location.href='/enfermeras/editar/${nuevaEnfermera.id_enfermera}'">Editar</button>
                    <button onclick="location.href='/enfermeras/eliminar/${nuevaEnfermera.id_enfermera}'">Eliminar</button>
                </td>
            `;

            event.target.reset();
            toggleForm();
        }
    } catch (error) {
        console.error("❌ Error al agregar enfermera:", error);
    }
};

module.exports = router;
