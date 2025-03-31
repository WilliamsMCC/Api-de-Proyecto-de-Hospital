const Paciente = require('../models/Paciente');

// Obtener
async function obtenerPacientes(req, res) {
    try {
        const pacientes = await Paciente.findAll();
        res.status(200).send(pacientes);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al obtener los pacientes' });
    }
}

// Obtener UN paciente por ID
async function obtenerPacientePorId(req, res) {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findByPk(id); // findByPk is efficient for primary key lookup

        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' }); // Use .json
        }

        res.status(200).json(paciente); // Use .json
    } catch (err) {
        console.error(`Error al obtener paciente con ID ${id}:`, err); // Log specific error
        res.status(500).json({ message: 'Error al obtener el paciente' }); // Use .json
    }
}


// Crear
async function crearPaciente(req, res) {
    try {
        const paciente = await Paciente.create(req.body);
        res.status(201).send(paciente);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al crear el paciente' });
    }
}

// Actualizar ID
async function actualizarPaciente(req, res) {
    try {
        const [updated] = await Paciente.update(req.body, { where: { id_paciente: req.params.id } });
        if (!updated) {
            return res.status(404).send({ message: 'Paciente no encontrado' });
        }
        res.status(200).send({ message: 'Paciente actualizado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al actualizar el paciente' });
    }
}

// Eliminar ID
async function eliminarPaciente(req, res) {
    try {
        const deleted = await Paciente.destroy({ where: { id_paciente: req.params.id } });
        if (!deleted) {
            return res.status(404).send({ message: 'Paciente no encontrado' });
        }
        res.status(200).send({ message: 'Paciente eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al eliminar el paciente' });
    }
}

module.exports = { obtenerPacientes, obtenerPacientePorId, crearPaciente, actualizarPaciente, eliminarPaciente };
