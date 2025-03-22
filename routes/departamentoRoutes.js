const express = require('express');
const router = express.Router();
const Departamento = require('../models/Departamento');

// ✅ Ruta para obtener departamentos como tabla HTML
router.get('/', async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();

        let tablaHTML = `
            <html>
            <head>
                <title>Lista de Departamentos</title>
                <style>
                    table { width: 80%; margin: 20px auto; border-collapse: collapse; }
                    th, td { padding: 10px; text-align: left; border: 1px solid black; }
                    th { background-color: #f2f2f2; }
                    body { font-family: Arial, sans-serif; text-align: center; }
                </style>
            </head>
            <body>
                <h2>Lista de Departamentos</h2>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Jefe (ID)</th>
                    </tr>`;

        departamentos.forEach(dep => {
            tablaHTML += `
                <tr>
                    <td>${dep.id_departamento}</td>
                    <td>${dep.nombre}</td>
                    <td>${dep.descripcion}</td>
                    <td>${dep.jefe}</td>
                </tr>`;
        });

        tablaHTML += `</table></body></html>`;

        res.send(tablaHTML);
    } catch (error) {
        console.error("❌ Error al obtener departamentos:", error);
        res.status(500).send('Error obteniendo departamentos');
    }
});

module.exports = router;
