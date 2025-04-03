const Enfermera = require('../models/Enfermera');

// Obtener todas las enfermeras con campos específicos
async function obtenerEnfermeras(req, res) {
    try {
        const enfermeras = await Enfermera.findAll({
            attributes: ['id_enfermera', 'nombre', 'apellido', 'telefono', 'correo_electronico', 'usuario_id']
        });
        res.status(200).json(enfermeras);
    } catch (err) {
        console.error("Error al obtener enfermeras:", err);
        res.status(500).json({ 
            message: 'Error al obtener las enfermeras',
            error: err.message 
        });
    }
}

// Crear nueva enfermera
async function crearEnfermera(req, res) {
    const { nombre, apellido, telefono, correo_electronico, usuario_id } = req.body;
    if (!nombre || !apellido || !telefono || !correo_electronico || !usuario_id) {
        return res.status(400).json({ 
            message: 'Todos los campos son requeridos: nombre, apellido, telefono, correo_electronico, usuario_id' 
        });
    }
    try {
        const enfermera = await Enfermera.create({
            nombre,
            apellido,
            telefono,
            correo_electronico,
            usuario_id
        });
        
        res.status(201).json({
            message: "Enfermera registrada exitosamente",
            data: enfermera
        });
    } catch (err) {
        console.error("Error al registrar enfermera:", err);
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ 
                message: 'El correo electrónico ya está registrado' 
            });
        } 
        res.status(500).json({ 
            message: 'Error al crear la enfermera',
            error: err.message 
        });
    }
}

// Actualizar enfermera por ID
async function actualizarEnfermera(req, res) {
    const { id } = req.params;
    const { nombre, apellido, telefono, correo_electronico, usuario_id } = req.body;
    try {
        // Verificar si existe la enfermera
        const enfermeraExistente = await Enfermera.findByPk(id);
        if (!enfermeraExistente) {
            return res.status(404).json({ message: 'Enfermera no encontrada' });
        }

        const [updated] = await Enfermera.update(
            { nombre, apellido, telefono, correo_electronico, usuario_id },
            { where: { id_enfermera: id } }
        );

        const enfermeraActualizada = await Enfermera.findByPk(id);
        res.status(200).json({
            message: 'Enfermera actualizada exitosamente',
            data: enfermeraActualizada
        });
    } catch (err) {
        console.error("Error al actualizar enfermera:", err);
        
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ 
                message: 'El correo electrónico ya está registrado' 
            });
        }
        
        res.status(500).json({ 
            message: 'Error al actualizar la enfermera',
            error: err.message 
        });
    }
}

// Eliminar por ID
async function eliminarEnfermera(req, res) {
    const { id } = req.params;

    try {
        // Verificar si existe
        const enfermera = await Enfermera.findByPk(id);
        if (!enfermera) {
            return res.status(404).json({ message: 'Enfermera no encontrada' });
        }

        await Enfermera.destroy({ where: { id_enfermera: id } });
        res.status(200).json({ 
            message: 'Enfermera eliminada exitosamente',
            data: enfermera 
        });
    } catch (err) {
        console.error("Error al eliminar enfermera:", err);
        res.status(500).json({ 
            message: 'Error al eliminar la enfermera',
            error: err.message 
        });
    }
}

module.exports = { 
    obtenerEnfermeras, 
    crearEnfermera, 
    actualizarEnfermera, 
    eliminarEnfermera 
};