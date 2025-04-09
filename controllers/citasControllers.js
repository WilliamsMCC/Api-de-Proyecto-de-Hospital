const CitaMedica = require('../models/CitaMedica');
const Paciente = require('../models/Paciente'); // Import associated models
const Doctor = require('../models/Doctor');

// Obtener todas las citas (including Paciente and Doctor info)
async function obtenerCitas(req, res) {
    try {
        const citas = await CitaMedica.findAll({
            include: [ // Include associated data
                { model: Paciente, attributes: ['id_paciente', 'nombre', 'apellido'] }, // Select specific fields
                { model: Doctor, attributes: ['id_doctor', 'nombre', 'apellido', 'especialidad'] } // Select specific fields
            ],
            order: [['fecha_hora', 'ASC']] // Optional: Order by date
        });
        // Use JSON response
        res.status(200).json(citas);
    } catch (err) {
        console.error("Error al obtener citas:", err);
        // Use JSON response
        res.status(500).json({ message: 'Error al obtener las citas', error: err.message });
    }
}


// Obtener UNA cita por ID (including Paciente and Doctor info)
async function obtenerCitaPorId(req, res) {
    const { id } = req.params;
    try {
        const cita = await CitaMedica.findByPk(id, {
            include: [ // Include associated data
                { model: Paciente, attributes: ['id_paciente', 'nombre', 'apellido'] },
                { model: Doctor, attributes: ['id_doctor', 'nombre', 'apellido', 'especialidad'] }
            ]
        });

        if (!cita) {
            // Use JSON response
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        // Use JSON response
        res.status(200).json(cita);
    } catch (err) {
        console.error(`Error al obtener cita con ID ${id}:`, err);
        // Use JSON response
        res.status(500).json({ message: 'Error al obtener la cita', error: err.message });
    }
}

// Crear nueva cita
async function crearCita(req, res) {
    try {
        // Add validation if needed (e.g., check if Paciente/Doctor IDs exist)
        const cita = await CitaMedica.create(req.body);
        // Use JSON response - return the created object
        res.status(201).json(cita);
    } catch (err) {
        console.error("Error al crear cita:", err);
         // Use JSON response, check for validation errors
         if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
        }
        // Check for foreign key constraint errors (if applicable)
        if (err.name === 'SequelizeForeignKeyConstraintError') {
             return res.status(400).json({ message: 'ID de Paciente o Doctor inválido.' });
        }
        res.status(500).json({ message: 'Error al crear la cita', error: err.message });
    }
}

// Actualizar cita por ID
async function actualizarCita(req, res) {
    const { id } = req.params;
    try {
        const cita = await CitaMedica.findByPk(id);
        if (!cita) {
             // Use JSON response
            return res.status(404).json({ message: 'Cita no encontrada' });
        }

        await CitaMedica.update(req.body, { where: { id_cita: id } });

        // Fetch the updated record including associations
        const citaActualizada = await CitaMedica.findByPk(id, {
             include: [
                { model: Paciente, attributes: ['id_paciente', 'nombre', 'apellido'] },
                { model: Doctor, attributes: ['id_doctor', 'nombre', 'apellido', 'especialidad'] }
            ]
        });
        // Use JSON response
        res.status(200).json(citaActualizada);
        // Original V1 response: res.status(200).send({ message: 'Cita actualizada correctamente' });

    } catch (err) {
        console.error(`Error al actualizar cita con ID ${id}:`, err);
         // Use JSON response, check for validation errors
         if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
        }
        if (err.name === 'SequelizeForeignKeyConstraintError') {
             return res.status(400).json({ message: 'ID de Paciente o Doctor inválido.' });
        }
        res.status(500).json({ message: 'Error al actualizar la cita', error: err.message });
    }
}

// Eliminar cita por ID
async function eliminarCita(req, res) {
    const { id } = req.params;
    try {
        const deleted = await CitaMedica.destroy({ where: { id_cita: id } });
        if (!deleted) {
             // Use JSON response
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
         // Use JSON response
        res.status(200).json({ message: 'Cita eliminada correctamente' });
        // Original V1 response: res.status(200).send({ message: 'Cita eliminada correctamente' });

    } catch (err) {
        console.error(`Error al eliminar cita con ID ${id}:`, err);
        // Use JSON response
        res.status(500).json({ message: 'Error al eliminar la cita', error: err.message });
    }
}


module.exports = {
    obtenerCitas,
    obtenerCitaPorId,
    crearCita,
    actualizarCita,
    eliminarCita
};
