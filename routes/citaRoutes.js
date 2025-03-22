const express = require('express');
const router = express.Router();
const CitaMedica = require('../models/CitaMedica');

// Mostrar las citas médicas como tabla HTML
router.get('/', async (req, res) => {
    try {
        const citas = await CitaMedica.findAll();

        let tablaHTML = `
        <html>
        <head>
            <title>Lista de Citas Médicas</title>
            <style>
                table { width: 90%; margin: 20px auto; border-collapse: collapse; }
                th, td { padding: 10px; text-align: left; border: 1px solid black; }
                th { background-color: #f2f2f2; }
                body { font-family: Arial, sans-serif; text-align: center; }
            </style>
        </head>
        <body>
            <h2>Lista de Citas Médicas</h2>
            <table>
                <tr>
                    <th>ID Cita</th>
                    <th>ID Paciente</th>
                    <th>ID Doctor</th>
                    <th>Fecha y Hora</th>
                    <th>Motivo de la Cita</th>
                    <th>Notas Médicas</th>
                </tr>`;

        citas.forEach(cita => {
            tablaHTML += `
                <tr>
                    <td>${cita.id_cita}</td>
                    <td>${cita.id_paciente}</td>
                    <td>${cita.id_doctor}</td>
                    <td>${new Date(cita.fecha_hora).toLocaleString()}</td>
                    <td>${cita.motivo_cita || ''}</td>
                    <td>${cita.notas_medicas || ''}</td>
                </tr>`;
        });

        tablaHTML += `
            </table>
        </body>
        </html>`;

        res.send(tablaHTML);
    } catch (error) {
        console.error("❌ Error al obtener citas médicas:", error);
        res.status(500).send('Error obteniendo citas médicas');
    }
});

module.exports = router;
