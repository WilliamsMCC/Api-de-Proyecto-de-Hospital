const Paciente = require('../models/Paciente');

// Obtener todos los pacientes
async function obtenerPacientes(req, res) {
    try {
        const pacientes = await Paciente.findAll();
        // Use JSON response
        res.status(200).json(pacientes);
    } catch (err) {
        console.error("Error al obtener pacientes:", err); // Log error
        // Use JSON response
        res.status(500).json({ message: 'Error al obtener los pacientes', error: err.message });
    }
}

// Obtener UN paciente por ID
async function obtenerPacientePorId(req, res) {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findByPk(id);

        if (!paciente) {
            // Use JSON response
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        // Use JSON response
        res.status(200).json(paciente);
    } catch (err) {
        console.error(`Error al obtener paciente con ID ${id}:`, err);
        // Use JSON response
        res.status(500).json({ message: 'Error al obtener el paciente', error: err.message });
    }
}

// Crear un nuevo paciente
async function crearPaciente(req, res) {
    try {
        // Ensure timestamps are handled if model expects them (Paciente model doesn't seem to)
        const paciente = await Paciente.create(req.body);
        // Use JSON response
        res.status(201).json(paciente); // Send back the created patient object
    } catch (err) {
        console.error("Error al crear paciente:", err);
        // Use JSON response, check for validation errors
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
        }
        res.status(500).json({ message: 'Error al crear el paciente', error: err.message });
    }
}

// Actualizar un paciente por ID
async function actualizarPaciente(req, res) {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findByPk(id); // Check if patient exists first
        if (!paciente) {
            // Use JSON response
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        // Update the patient
        const [updated] = await Paciente.update(req.body, {
            where: { id_paciente: id }
            // returning: true, // Note: returning doesn't work well with MySQL/MariaDB in Sequelize v6 for update
        });

        // Since returning doesn't work reliably, fetch the updated record
        const pacienteActualizado = await Paciente.findByPk(id);

        // Use JSON response
        res.status(200).json({ message: 'Paciente actualizado correctamente', paciente: pacienteActualizado });

    } catch (err) {
        console.error(`Error al actualizar paciente con ID ${id}:`, err);
        // Use JSON response, check for validation errors
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
        }
        res.status(500).json({ message: 'Error al actualizar el paciente', error: err.message });
    }
}

// Eliminar un paciente por ID
async function eliminarPaciente(req, res) {
    const { id } = req.params;
    try {
        const deleted = await Paciente.destroy({
            where: { id_paciente: id }
        });

        if (!deleted) { // If destroy returns 0, the record was not found
            // Use JSON response
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        // Use JSON response - common practice is 200 with message or 204 No Content
        res.status(200).json({ message: 'Paciente eliminado correctamente' });
        // Alternatively: res.status(204).send(); // Sends no body content

    } catch (err) {
        console.error(`Error al eliminar paciente con ID ${id}:`, err);
        // Use JSON response
        res.status(500).json({ message: 'Error al eliminar el paciente', error: err.message });
    }
}

module.exports = { obtenerPacientes, obtenerPacientePorId, crearPaciente, actualizarPaciente, eliminarPaciente };