const express = require('express');
const router = express.Router();
const Departamento = require('../models/Departamento');
const { verifyToken } = require('../middlewares/authMiddleware'); // ✅ Importar

// ✅ Ruta protegida para mostrar departamentos en tabla HTML
router.get('/', verifyToken, async (req, res) => {
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

// ✅ Ruta protegida para insertar nuevo departamento
router.post('/', verifyToken, async (req, res) => {
    try {
        const nuevo = await Departamento.create(req.body);
        res.status(201).json({
            message: "Departamento creado exitosamente",
            departamento: nuevo
        });
    } catch (error) {
        console.error("❌ Error al crear departamento:", error);
        res.status(500).json({ message: 'Error al crear departamento' });
    }
});

module.exports = router;
