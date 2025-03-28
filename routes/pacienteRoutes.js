const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
const { verifyToken } = require('../middlewares/authMiddleware');

// ✅ Ruta para obtener pacientes (protegida con token)
router.get('/', verifyToken, async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();

        let tablaHTML = `
            <html>
            <head>
                <title>Lista de Pacientes</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body class="bg-light">
                <div class="container my-5">
                    <h2 class="text-center mb-4">Lista de Pacientes</h2>
                    <table class="table table-bordered table-hover table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Fecha Nacimiento</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Correo Electrónico</th>
                                <th>Historia Médica</th>
                            </tr>
                        </thead>
                        <tbody>`;

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

        tablaHTML += `</tbody></table>
        </div>
    </body>
    </html>`;

        res.send(tablaHTML);
    } catch (error) {
        console.error("❌ Error al obtener pacientes:", error);
        res.status(500).send('Error obteniendo pacientes');
    }
});

// ✅ Nueva ruta para agregar un paciente (protegida con token)
router.post('/', verifyToken, async (req, res) => {
    try {
        const nuevoPaciente = await Paciente.create(req.body);
        res.status(201).json({ message: "Paciente creado exitosamente", paciente: nuevoPaciente });
    } catch (error) {
        console.error("❌ Error al crear paciente:", error);
        res.status(500).json({ error: 'Error creando paciente' });
    }
});

module.exports = router;
