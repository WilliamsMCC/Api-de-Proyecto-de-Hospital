const Doctor = require('../models/doctor');

// Obtener
async function obtenerDoctors(req, res) {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).send(doctors);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al obtener los doctores' });
    }
}

// Crear
async function crearDoctor(req, res) {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).send(doctor);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al crear el doctor' });
    }
}

// Actualizar ID
async function actualizarDoctor(req, res) {
    try {
        const [updated] = await Doctor.update(req.body, { where: { id_doctor: req.params.id } });
        if (!updated) {
            return res.status(404).send({ message: 'Doctor no encontrado' });
        }
        res.status(200).send({ message: 'Doctor actualizado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al actualizar el doctor' });
    }
}

// Eliminar ID
async function eliminarDoctor(req, res) {
    try {
        const deleted = await Doctor.destroy({ where: { id_doctor: req.params.id } });
        if (!deleted) {
            return res.status(404).send({ message: 'Doctor no encontrado' });
        }
        res.status(200).send({ message: 'Doctor eliminado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al eliminar el doctor' });
    }
}

module.exports = { obtenerDoctors, crearDoctor, actualizarDoctor, eliminarDoctor };
