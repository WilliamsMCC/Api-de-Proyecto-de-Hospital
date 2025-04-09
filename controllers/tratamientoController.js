const Tratamiento = require('../models/Tratamiento');
const Paciente = require('../models/Paciente');
const Doctor = require('../models/Doctor');

// Obtener todos los tratamientos
exports.getAllTratamientos = async (req, res) => {
    try {
        const tratamientos = await Tratamiento.findAll({
            include: [ // Include associated data using aliases
                { model: Paciente, as: 'paciente', attributes: ['id_paciente', 'nombre', 'apellido'] },
                { model: Doctor, as: 'doctor', attributes: ['id_doctor', 'nombre', 'apellido', 'especialidad'] }
            ],
            order: [['fecha_inicio', 'DESC']] // Optional ordering
        });
        res.status(200).json(tratamientos);
    } catch (error) {
        console.error("Error al obtener tratamientos:", error);
        res.status(500).json({ message: 'Error al obtener tratamientos', error: error.message });
    }
};

// obtener por ID
exports.getTratamientoById = async (req, res) => {
    const { id } = req.params;
    try {
        const tratamiento = await Tratamiento.findByPk(id, {
            include: [ // Include associated data using aliases
                { model: Paciente, as: 'paciente', attributes: ['id_paciente', 'nombre', 'apellido'] },
                { model: Doctor, as: 'doctor', attributes: ['id_doctor', 'nombre', 'apellido', 'especialidad'] }
            ]
        });
        if (!tratamiento) {
            return res.status(404).json({ message: 'Tratamiento no encontrado' });
        }
        res.status(200).json(tratamiento);
    } catch (error) {
        console.error(`Error al obtener tratamiento con ID ${id}:`, error);
        res.status(500).json({ message: 'Error al obtener el tratamiento', error: error.message });
    }
};

// Crear
exports.createTratamiento = async (req, res) => {
    const { id_paciente, id_doctor, descripcion, fecha_inicio, fecha_fin } = req.body;
    try {
        // Basic validation
        if (!id_paciente || !id_doctor || !descripcion || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({ message: 'Todos los campos son requeridos: id_paciente, id_doctor, descripcion, fecha_inicio, fecha_fin' });
        }
        const nuevoTratamiento = await Tratamiento.create({ id_paciente, id_doctor, descripcion, fecha_inicio, fecha_fin });
        // Re-fetch with includes to return consistent data, or just return the basic object
        const tratamientoCreado = await Tratamiento.findByPk(nuevoTratamiento.id_tratamiento, {
             include: [
                { model: Paciente, as: 'paciente', attributes: ['id_paciente', 'nombre', 'apellido'] },
                { model: Doctor, as: 'doctor', attributes: ['id_doctor', 'nombre', 'apellido', 'especialidad'] }
            ]
        });
        res.status(201).json(tratamientoCreado || nuevoTratamiento); // Fallback if refetch fails
    } catch (error) {
        console.error("Error al crear tratamiento:", error);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
        }
        if (err.name === 'SequelizeForeignKeyConstraintError') {
             return res.status(400).json({ message: 'ID de Paciente o Doctor inválido.' });
        }
        res.status(500).json({ message: 'Error al crear tratamiento', error: error.message });
    }
};

// Actualizar
exports.updateTratamiento = async (req, res) => {
    const { id } = req.params;
    try {
        const tratamiento = await Tratamiento.findByPk(id);
        if (!tratamiento) {
            return res.status(404).json({ message: 'Tratamiento no encontrado' });
        }
        await Tratamiento.update(req.body, { where: { id_tratamiento: id } });
        const tratamientoActualizado = await Tratamiento.findByPk(id, { // Refetch updated data with includes
             include: [
                 { model: Paciente, as: 'paciente', attributes: ['id_paciente', 'nombre', 'apellido'] },
                 { model: Doctor, as: 'doctor', attributes: ['id_doctor', 'nombre', 'apellido', 'especialidad'] }
             ]
        });
        res.status(200).json(tratamientoActualizado);
    } catch (error) {
        console.error(`Error al actualizar tratamiento con ID ${id}:`, error);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
        }
        if (err.name === 'SequelizeForeignKeyConstraintError') {
             return res.status(400).json({ message: 'ID de Paciente o Doctor inválido.' });
        }
        res.status(500).json({ message: 'Error al actualizar tratamiento', error: error.message });
    }
};

// Eliminar
exports.deleteTratamiento = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Tratamiento.destroy({ where: { id_tratamiento: id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Tratamiento no encontrado' });
        }
        res.status(200).json({ message: 'Tratamiento eliminado correctamente' });
    } catch (error) {
        console.error(`Error al eliminar tratamiento con ID ${id}:`, error);
        res.status(500).json({ message: 'Error al eliminar tratamiento', error: error.message });
    }
};