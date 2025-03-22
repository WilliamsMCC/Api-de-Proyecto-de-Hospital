const express = require('express');
const router = express.Router();
const Medicamento = require('../models/Medicamento');
const Tratamiento = require('../models/Tratamiento');

router.get('/', async (req, res) => {
    try {
        const medicamentos = await Medicamento.findAll({
            include: [{ model: Tratamiento }]
        });

        let html = `
        <html>
        <head>
            <title>Lista de Medicamentos</title>
            <style>
                table { width: 90%; margin: 20px auto; border-collapse: collapse; }
                th, td { padding: 10px; text-align: left; border: 1px solid black; }
                th { background-color: #f2f2f2; }
                body { font-family: Arial, sans-serif; text-align: center; }
            </style>
        </head>
        <body>
            <h2>Lista de Medicamentos</h2>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Dosis</th>
                    <th>Frecuencia</th>
                    <th>Tratamiento</th>
                </tr>`;

        medicamentos.forEach(m => {
            html += `
                <tr>
                    <td>${m.id_medicamento}</td>
                    <td>${m.nombre}</td>
                    <td>${m.descripcion || ''}</td>
                    <td>${m.dosis || ''}</td>
                    <td>${m.frecuencia || ''}</td>
                    <td>${m.Tratamiento?.descripcion || 'Sin asignar'}</td>
                </tr>`;
        });

        html += `</table></body></html>`;
        res.send(html);
    } catch (error) {
        console.error("❌ Error al obtener medicamentos:", error);
        res.status(500).send('Error mostrando medicamentos');
    }
});

module.exports = router;
