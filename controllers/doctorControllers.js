const Doctor = require('../models/Doctor');

// Obtener todos los doctores
async function obtenerDoctors(req, res) {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).json(doctors);
    } catch (err) {
        console.error("Error al obtener doctores:", err);
        res.status(500).json({ message: 'Error al obtener los doctores', error: err.message });
    }
}


// Obtener UN doctor por ID
async function obtenerDoctorPorId(req, res) {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByPk(id);

        if (!doctor) {
            // Use JSON response for not found
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }
        // Use JSON response for success
        res.status(200).json(doctor);
    } catch (err) {
        console.error(`Error al obtener doctor con ID ${id}:`, err);
        // Use JSON response for server error
        res.status(500).json({ message: 'Error al obtener el doctor', error: err.message });
    }
}


// Crear un nuevo doctor
async function crearDoctor(req, res) {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json(doctor);
    } catch (err) {
        console.error("Error al crear doctor:", err);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
        }
        res.status(500).json({ message: 'Error al crear el doctor', error: err.message });
    }
}

// Actualizar un doctor por ID
async function actualizarDoctor(req, res) {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByPk(id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }
        await Doctor.update(req.body, { where: { id_doctor: id } });
        const doctorActualizado = await Doctor.findByPk(id);
        res.status(200).json({ message: 'Doctor actualizado correctamente', doctor: doctorActualizado });
    } catch (err) {
        console.error(`Error al actualizar doctor con ID ${id}:`, err);
         if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
        }
        res.status(500).json({ message: 'Error al actualizar el doctor', error: err.message });
    }
}

// Eliminar un doctor por ID
async function eliminarDoctor(req, res) {
    const { id } = req.params;
    try {
        const deleted = await Doctor.destroy({ where: { id_doctor: id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Doctor no encontrado' });
        }
        res.status(200).json({ message: 'Doctor eliminado correctamente' });
    } catch (err) {
        console.error(`Error al eliminar doctor con ID ${id}:`, err);
        res.status(500).json({ message: 'Error al eliminar el doctor', error: err.message });
    }
}


module.exports = {
    obtenerDoctors,
    obtenerDoctorPorId, 
    crearDoctor,
    actualizarDoctor,
    eliminarDoctor
};
