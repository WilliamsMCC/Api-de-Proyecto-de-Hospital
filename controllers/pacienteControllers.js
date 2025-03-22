const Paciente = require('../models/Paciente');

// Crear un nuevo paciente
exports.crearPaciente = async (req, res) => {
    try {
        const { nombre, apellido, fecha_nacimiento, direccion, telefono, correo_electronico, historia_medica } = req.body;
        const nuevoPaciente = await Paciente.create({ nombre, apellido, fecha_nacimiento, direccion, telefono, correo_electronico, historia_medica });
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        console.error("❌ Error al crear paciente:", error);
        res.status(500).json({ error: 'Error al crear paciente' });
    }
};

// Eliminar un paciente
exports.eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.destroy({ where: { id_paciente: id } });
        if (paciente) {
            res.status(200).json({ message: 'Paciente eliminado correctamente' });
        } else {
            res.status(404).json({ error: 'Paciente no encontrado' });
        }
    } catch (error) {
        console.error("❌ Error al eliminar paciente:", error);
        res.status(500).json({ error: 'Error al eliminar paciente' });
    }
};

// Modificar un paciente
exports.modificarPaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, fecha_nacimiento, direccion, telefono, correo_electronico, historia_medica } = req.body;
    try {
        const [updated] = await Paciente.update(
            { nombre, apellido, fecha_nacimiento, direccion, telefono, correo_electronico, historia_medica },
            { where: { id_paciente: id } }
        );
        if (updated) {
            const pacienteActualizado = await Paciente.findOne({ where: { id_paciente: id } });
            res.status(200).json(pacienteActualizado);
        } else {
            res.status(404).json({ error: 'Paciente no encontrado' });
        }
    } catch (error) {
        console.error("❌ Error al modificar paciente:", error);
        res.status(500).json({ error: 'Error al modificar paciente' });
    }
};