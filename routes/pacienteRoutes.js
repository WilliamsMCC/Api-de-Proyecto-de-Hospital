const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente'); // Importar modelo correctamente

// ✅ Ruta para obtener los pacientes en formato tabla HTML en `/pacientes`
router.get('/', async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();

        let tablaHTML = `
            <html>
            <head>
                <title>Lista de Pacientes</title>
                <style>
                    table { width: 80%; margin: 20px auto; border-collapse: collapse; }
                    th, td { padding: 10px; text-align: left; border: 1px solid black; }
                    th { background-color: #f2f2f2; }
                    body { font-family: Arial, sans-serif; text-align: center; }
                </style>
            </head>
            <body>
                <h2>Lista de Pacientes</h2>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha Nacimiento</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Correo Electrónico</th>
                        <th>Historia Médica</th>
                    </tr>`;

        pacientes.forEach(paciente => {
            tablaHTML += `
                <tr>
                    <td>${paciente.id_paciente}</td>
                    <td>${paciente.nombre}</td>
                    <td>${paciente.apellido}</td>
                    <td>${paciente.fecha_nacimiento}</td>
                    <td>${paciente.direccion}</td>
                    <td>${paciente.telefono}</td>
                    <td>${paciente.correo_electronico}</td>
                    <td>${paciente.historia_medica}</td>
                </tr>`;
        });

        tablaHTML += `</table></body></html>`;

        res.send(tablaHTML);
    } catch (error) {
        console.error("❌ Error al obtener pacientes:", error);
        res.status(500).send('Error obteniendo pacientes');
    }
});

module.exports = router;
