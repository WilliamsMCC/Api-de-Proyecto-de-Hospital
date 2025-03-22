const express = require('express');
const router = express.Router();
const Tratamiento = require('../models/Tratamiento');

router.get('/', async (req, res) => {
    try {
        const tratamientos = await Tratamiento.findAll();

        let html = `
        <html>
        <head>
            <title>Lista de Tratamientos</title>
            <style>
                table { width: 90%; margin: 20px auto; border-collapse: collapse; }
                th, td { padding: 10px; text-align: left; border: 1px solid black; }
                th { background-color: #f2f2f2; }
                body { font-family: Arial, sans-serif; text-align: center; }
            </style>
        </head>
        <body>
            <h2>Lista de Tratamientos</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>ID Paciente</th>
                    <th>ID Doctor</th>
                    <th>Descripción</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                </tr>`;

        tratamientos.forEach(t => {
            html += `
                <tr>
                    <td>${t.id_tratamiento}</td>
                    <td>${t.id_paciente}</td>
                    <td>${t.id_doctor}</td>
                    <td>${t.descripcion || ''}</td>
                    <td>${t.fecha_inicio || ''}</td>
                    <td>${t.fecha_fin || ''}</td>
                </tr>`;
        });

        html += `</table></body></html>`;
        res.send(html);
    } catch (error) {
        console.error("❌ Error al obtener tratamientos:", error);
        res.status(500).send('Error mostrando tratamientos');
    }
});

module.exports = router;
