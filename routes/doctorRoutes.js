const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const { verifyToken } = require('../middlewares/authMiddleware'); // ✅ Importar

// ✅ Obtener lista de doctores (HTML protegido)
router.get('/', verifyToken, async (req, res) => {
    try {
        const doctores = await Doctor.findAll();

        let tablaHTML = `
        <html>
        <head>
            <title>Lista de Doctores</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-light">
            <div class="container my-5">
                <h2 class="text-center mb-4">Lista de Doctores</h2>
                <a href="/pacientes" class="btn btn-secondary mb-4">← Volver a Pacientes</a>
                <table class="table table-bordered table-hover table-striped">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Teléfono</th>
                            <th>Correo Electrónico</th>
                            <th>Horario Atención</th>
                        </tr>
                    </thead>
                    <tbody>`;

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

        tablaHTML += `</tbody></table>
            </div>
        </body>
        </html>`;

        res.send(tablaHTML);
    } catch (error) {
        console.error("❌ Error al obtener doctores:", error);
        res.status(500).send('Error obteniendo doctores');
    }
});

// ✅ Crear un nuevo doctor (API protegida con token)
router.post('/', verifyToken, async (req, res) => {
    try {
        const nuevoDoctor = await Doctor.create(req.body);
        res.status(201).json({
            message: 'Doctor creado exitosamente',
            doctor: nuevoDoctor
        });
    } catch (error) {
        console.error('❌ Error al crear doctor:', error);
        res.status(500).json({ message: 'Error al crear doctor' });
    }
});

module.exports = router;