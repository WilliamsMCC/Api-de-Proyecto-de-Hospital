const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente'); 
const pacienteControllers = require('../controllers/pacienteControllers');

// ✅ Ruta para obtener los pacientes en formato tabla HTML en `/pacientes`
router.get('/', async (req, res) => {
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
                                <th>Acciones</th>
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
                    <td>
                        <button class="btn btn-danger btn-sm mb-1" onclick="eliminarPaciente(${paciente.id_paciente})">Eliminar</button>
                        <button class="btn btn-warning btn-sm" onclick="mostrarFormularioModificar(${paciente.id_paciente})">Modificar</button>
                    </td>
                </tr>`;
        });

        tablaHTML += `</tbody></table>

            <h3 class="mt-5">Agregar Paciente</h3>
            <form id="formAgregarPaciente" class="row g-3">
                <div class="col-md-6">
                    <input type="text" class="form-control" name="nombre" placeholder="Nombre" required>
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control" name="apellido" placeholder="Apellido" required>
                </div>
                <div class="col-md-4">
                    <input type="date" class="form-control" name="fecha_nacimiento" required>
                </div>
                <div class="col-md-8">
                    <input type="text" class="form-control" name="direccion" placeholder="Dirección">
                </div>
                <div class="col-md-6">
                    <input type="text" class="form-control" name="telefono" placeholder="Teléfono">
                </div>
                <div class="col-md-6">
                    <input type="email" class="form-control" name="correo_electronico" placeholder="Correo Electrónico">
                </div>
                <div class="col-12">
                    <textarea class="form-control" name="historia_medica" placeholder="Historia Médica"></textarea>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Agregar Paciente</button>
                </div>
            </form>

            <h3 class="mt-5">Modificar Paciente</h3>
            <div id="formModificarPaciente" style="display: none;">
                <form id="formModificar" class="row g-3">
                    <input type="hidden" name="id" id="modificarId">
                    <div class="col-md-6">
                        <input type="text" class="form-control" name="nombre" id="modificarNombre" placeholder="Nombre" required>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" name="apellido" id="modificarApellido" placeholder="Apellido" required>
                    </div>
                    <div class="col-md-4">
                        <input type="date" class="form-control" name="fecha_nacimiento" id="modificarFechaNacimiento" required>
                    </div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" name="direccion" id="modificarDireccion" placeholder="Dirección">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" name="telefono" id="modificarTelefono" placeholder="Teléfono">
                    </div>
                    <div class="col-md-6">
                        <input type="email" class="form-control" name="correo_electronico" id="modificarCorreo" placeholder="Correo Electrónico">
                    </div>
                    <div class="col-12">
                        <textarea class="form-control" name="historia_medica" id="modificarHistoriaMedica" placeholder="Historia Médica"></textarea>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-success">Modificar Paciente</button>
                    </div>
                </form>
            </div>

            <!-- ✅ Botón para ir a la vista de Doctores -->
            <div class="d-flex justify-content-end mt-5">
                <button class="btn btn-secondary" onclick="window.location.href = '/doctores'">Ir a Doctores</button>
            </div>

        </div>

        <script>
            document.getElementById('formAgregarPaciente').onsubmit = async function(event) {
                event.preventDefault();
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                const response = await fetch('/pacientes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    location.reload();
                } else {
                    alert('Error al agregar paciente');
                }
            };

            async function eliminarPaciente(id) {
                const response = await fetch('/pacientes/' + id, { method: 'DELETE' });
                if (response.ok) {
                    location.reload();
                } else {
                    alert('Error al eliminar paciente');
                }
            }

            async function mostrarFormularioModificar(id) {
                const response = await fetch('/pacientes/' + id);
                const paciente = await response.json();

                document.getElementById('modificarId').value = paciente.id_paciente;
                document.getElementById('modificarNombre').value = paciente.nombre;
                document.getElementById('modificarApellido').value = paciente.apellido;
                document.getElementById('modificarFechaNacimiento').value = paciente.fecha_nacimiento.split('T')[0];
                document.getElementById('modificarDireccion').value = paciente.direccion;
                document.getElementById('modificarTelefono').value = paciente.telefono;
                document.getElementById('modificarCorreo').value = paciente.correo_electronico;
                document.getElementById('modificarHistoriaMedica').value = paciente.historia_medica;

                document.getElementById('formModificarPaciente').style.display = 'block';
            }

            document.getElementById('formModificar').onsubmit = async function(event) {
                event.preventDefault();
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                const id = data.id;
                delete data.id;

                const response = await fetch('/pacientes/' + id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    location.reload();
                } else {
                    alert('❌ Error al modificar paciente');
                }
            }
        </script>
    </body>
    </html>`;

        res.send(tablaHTML);
    } catch (error) {
        console.error("❌ Error al obtener pacientes:", error);
        res.status(500).send('Error obteniendo pacientes');
    }
});

// ✅ Ruta para obtener un paciente por ID (para el formulario de modificación)
router.get('/:id', async (req, res) => {
    try {
        const paciente = await Paciente.findByPk(req.params.id);
        if (!paciente) return res.status(404).json({ message: 'Paciente no encontrado' });
        res.json(paciente);
    } catch (error) {
        console.error("Error al obtener paciente:", error);
        res.status(500).send('Error obteniendo paciente');
    }
});

// ✅ Rutas CRUD
router.post('/', pacienteControllers.crearPaciente);
router.delete('/:id', pacienteControllers.eliminarPaciente);
router.put('/:id', pacienteControllers.modificarPaciente);

module.exports = router;


