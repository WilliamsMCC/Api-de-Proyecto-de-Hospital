const CitaMedica = require('../models/CitaMedica');

// Obtener citas
async function obtenerCitas(req, res) {
    try {
        const citas = await CitaMedica.findAll();
        res.status(200).send(citas);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al obtener las citas' });
    }
}

// Crear 
async function crearCita(req, res) {
    try {
        const cita = await CitaMedica.create(req.body);
        res.status(201).send(cita);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al crear la cita' });
    }
}

// Actualizar 
async function actualizarCita(req, res) {
    try {
        const [updated] = await CitaMedica.update(req.body, { where: { id_cita: req.params.id } });
        if (!updated) {
            return res.status(404).send({ message: 'Cita no encontrada' });
        }
        res.status(200).send({ message: 'Cita actualizada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al actualizar la cita' });
    }
}

// Eliminar 
async function eliminarCita(req, res) {
    try {
        const deleted = await CitaMedica.destroy({ where: { id_cita: req.params.id } });
        if (!deleted) {
            return res.status(404).send({ message: 'Cita no encontrada' });
        }
        res.status(200).send({ message: 'Cita eliminada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al eliminar la cita' });
    }
}

module.exports = { obtenerCitas, crearCita, actualizarCita, eliminarCita };