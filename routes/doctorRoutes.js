const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor'); // Importar modelo correctamente

// ✅ Ruta para obtener los doctores en formato tabla HTML en `/doctores`
router.get('/', async (req, res) => {
    try {
        const doctores = await Doctor.findAll();

        let tablaHTML = `
            <html>
            <head>
                <title>Lista de Doctores</title>
                <style>
                    table { width: 80%; margin: 20px auto; border-collapse: collapse; }
                    th, td { padding: 10px; text-align: left; border: 1px solid black; }
                    th { background-color: #f2f2f2; }
                    body { font-family: Arial, sans-serif; text-align: center; }
                </style>
            </head>
            <body>
                <h2>Lista de Doctores</h2>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Especialidad</th>
                        <th>Teléfono</th>
                        <th>Correo Electrónico</th>
                        <th>Horario Atención</th>
                    </tr>`;

        doctores.forEach(doctor => {
            tablaHTML += `
                <tr>
                    <td>${doctor.id_doctor}</td>
                    <td>${doctor.nombre}</td>
                    <td>${doctor.apellido}</td>
                    <td>${doctor.especialidad}</td>
                    <td>${doctor.telefono}</td>
                    <td>${doctor.correo_electronico}</td>
                    <td>${doctor.horario_atencion}</td>
                </tr>`;
        });

        tablaHTML += `</table></body></html>`;

        res.send(tablaHTML);
    } catch (error) {
        console.error("❌ Error al obtener doctores:", error);
        res.status(500).send('Error obteniendo doctores');
    }
});

module.exports = router;
