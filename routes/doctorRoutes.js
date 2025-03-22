const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// ✅ Ruta para obtener los doctores en formato tabla HTML
router.get('/', async (req, res) => {
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
                
                <!-- 🔙 Botón de regreso a Pacientes -->
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
                            <th>Acciones</th>
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
                    <td>
                        <button class="btn btn-danger btn-sm mb-1" onclick="eliminarDoctor(${doctor.id_doctor})">Eliminar</button>
                        <button class="btn btn-warning btn-sm" onclick="mostrarFormularioModificar(${doctor.id_doctor})">Modificar</button>
                    </td>
                </tr>`;
        });

        tablaHTML += `</tbody></table>

            <h3 class="mt-5">Agregar Doctor</h3>
            <form id="formAgregarDoctor" class="row g-3">
                <div class="col-md-6"><input type="text" class="form-control" name="nombre" placeholder="Nombre" required></div>
                <div class="col-md-6"><input type="text" class="form-control" name="apellido" placeholder="Apellido" required></div>
                <div class="col-md-4"><input type="text" class="form-control" name="especialidad" placeholder="Especialidad" required></div>
                <div class="col-md-4"><input type="text" class="form-control" name="telefono" placeholder="Teléfono" required></div>
                <div class="col-md-4"><input type="email" class="form-control" name="correo_electronico" placeholder="Correo Electrónico" required></div>
                <div class="col-12"><input type="text" class="form-control" name="horario_atencion" placeholder="Horario Atención" required></div>
                <div class="col-12"><button type="submit" class="btn btn-primary">Agregar Doctor</button></div>
            </form>

            <h3 class="mt-5">Modificar Doctor</h3>
            <div id="formModificarDoctor" style="display: none;">
                <form id="formModificar" class="row g-3">
                    <input type="hidden" name="id" id="modificarId">
                    <div class="col-md-6"><input type="text" class="form-control" name="nombre" id="modificarNombre" required></div>
                    <div class="col-md-6"><input type="text" class="form-control" name="apellido" id="modificarApellido" required></div>
                    <div class="col-md-4"><input type="text" class="form-control" name="especialidad" id="modificarEspecialidad" required></div>
                    <div class="col-md-4"><input type="text" class="form-control" name="telefono" id="modificarTelefono" required></div>
                    <div class="col-md-4"><input type="email" class="form-control" name="correo_electronico" id="modificarCorreo" required></div>
                    <div class="col-12"><input type="text" class="form-control" name="horario_atencion" id="modificarHorario" required></div>
                    <div class="col-12"><button type="submit" class="btn btn-success">Modificar Doctor</button></div>
                </form>
            </div>
        </div>

        <script>
            document.getElementById('formAgregarDoctor').onsubmit = async function(event) {
                event.preventDefault();
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                const response = await fetch('/doctores', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (response.ok) location.reload();
                else alert('Error al agregar doctor');
            };

            async function eliminarDoctor(id) {
                const response = await fetch('/doctores/' + id, { method: 'DELETE' });
                if (response.ok) location.reload();
                else alert('Error al eliminar doctor');
            }

            async function mostrarFormularioModificar(id) {
                const response = await fetch('/doctores/' + id);
                const doctor = await response.json();

                document.getElementById('modificarId').value = doctor.id_doctor;
                document.getElementById('modificarNombre').value = doctor.nombre;
                document.getElementById('modificarApellido').value = doctor.apellido;
                document.getElementById('modificarEspecialidad').value = doctor.especialidad;
                document.getElementById('modificarTelefono').value = doctor.telefono;
                document.getElementById('modificarCorreo').value = doctor.correo_electronico;
                document.getElementById('modificarHorario').value = doctor.horario_atencion;

                document.getElementById('formModificarDoctor').style.display = 'block';
            }

            document.getElementById('formModificar').onsubmit = async function(event) {
                event.preventDefault();
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                const id = data.id;
                delete data.id;

                const response = await fetch('/doctores/' + id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) location.reload();
                else alert('❌ Error al modificar doctor');
            }
        </script>
        </body>
        </html>`;

        res.send(tablaHTML);
    } catch (error) {
        console.error("❌ Error al obtener doctores:", error);
        res.status(500).send('Error obteniendo doctores');
    }
});

// ✅ Ruta para obtener un doctor por ID (para el formulario de modificación)
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor no encontrado' });
        res.json(doctor);
    } catch (error) {
        console.error("Error al obtener doctor:", error);
        res.status(500).send('Error obteniendo doctor');
    }
});

// ✅ Crear Doctor
router.post('/', async (req, res) => {
    try {
        await Doctor.create(req.body);
        res.status(201).send('Doctor creado');
    } catch (error) {
        console.error("❌ Error al crear doctor:", error);
        res.status(500).send('Error al crear doctor');
    }
});

// ✅ Eliminar Doctor
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Doctor.destroy({ where: { id_doctor: req.params.id } });
        if (eliminado) res.send('Doctor eliminado');
        else res.status(404).send('Doctor no encontrado');
    } catch (error) {
        console.error("❌ Error al eliminar doctor:", error);
        res.status(500).send('Error al eliminar doctor');
    }
});

// ✅ Modificar Doctor
router.put('/:id', async (req, res) => {
    try {
        const modificado = await Doctor.update(req.body, { where: { id_doctor: req.params.id } });
        if (modificado[0] > 0) res.send('Doctor modificado');
        else res.status(404).send('Doctor no encontrado');
    } catch (error) {
        console.error("❌ Error al modificar doctor:", error);
        res.status(500).send('Error al modificar doctor');
    }
});

module.exports = router;

