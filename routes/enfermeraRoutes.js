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
                    table { width: 80%; margin: 20px auto; border-collapse: collapse; }
                    th, td { padding: 10px; text-align: left; border: 1px solid black; }
                    th { background-color: #f2f2f2; }
                    body { font-family: Arial, sans-serif; text-align: center; }
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
                </tr>`;
        });

        tablaHTML += `</table></body></html>`;

        res.send(tablaHTML);
    } catch (error) {
        console.error("❌ Error al obtener enfermeras:", error);
        res.status(500).send('Error obteniendo enfermeras');
    }
});

module.exports = router;
