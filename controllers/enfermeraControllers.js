const Enfermera = require('../models/Enfermera');

// Obtener todas las enfermeras con campos específicos
async function obtenerEnfermeras(req, res) {
    try {
        const enfermeras = await Enfermera.findAll({
            // Keep specific attributes if desired, or remove 'attributes' for all fields
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


// Obtener una enfermera por ID
async function obtenerEnfermeraPorId(req, res) {
    const { id } = req.params;
    try {
        const enfermera = await Enfermera.findByPk(id, {
            // Optional: Specify attributes if needed
             attributes: ['id_enfermera', 'nombre', 'apellido', 'telefono', 'correo_electronico', 'usuario_id']
        });

        if (!enfermera) {
            return res.status(404).json({ message: 'Enfermera no encontrada' });
        }
        res.status(200).json(enfermera);
    } catch (err) {
        console.error(`Error al obtener enfermera con ID ${id}:`, err);
        res.status(500).json({
            message: 'Error al obtener la enfermera',
            error: err.message
        });
    }
}



// Crear nueva enfermera
async function crearEnfermera(req, res) {
    const { nombre, apellido, telefono, correo_electronico, usuario_id } = req.body;
    // Keep validation
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

        // Standardize response slightly - just return the created object
        res.status(201).json(enfermera);
        // Original response:
        // res.status(201).json({
        //     message: "Enfermera registrada exitosamente",
        //     data: enfermera
        // });
    } catch (err) {
        console.error("Error al registrar enfermera:", err);
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: 'El correo electrónico ya está registrado'
            });
        }
         if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
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
    // Destructure body inside try block after checking existence
    try {
        const enfermeraExistente = await Enfermera.findByPk(id);
        if (!enfermeraExistente) {
            return res.status(404).json({ message: 'Enfermera no encontrada' });
        }

        // Update using req.body directly
        await Enfermera.update(req.body, {
            where: { id_enfermera: id }
        });

        const enfermeraActualizada = await Enfermera.findByPk(id);
        // Standardize response slightly
        res.status(200).json(enfermeraActualizada);
        // Original response:
        // res.status(200).json({
        //     message: 'Enfermera actualizada exitosamente',
        //     data: enfermeraActualizada
        // });
    } catch (err) {
        console.error(`Error al actualizar enfermera con ID ${id}:`, err);
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: 'El correo electrónico ya está registrado por otra enfermera' // More specific message
            });
        }
         if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
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
        const enfermera = await Enfermera.findByPk(id); // Check existence first
        if (!enfermera) {
            return res.status(404).json({ message: 'Enfermera no encontrada' });
        }

        await Enfermera.destroy({ where: { id_enfermera: id } });
        // Standardize response
        res.status(200).json({ message: 'Enfermera eliminada exitosamente' });
        // Original response:
        // res.status(200).json({
        //     message: 'Enfermera eliminada exitosamente',
        //     data: enfermera // Returning deleted data is optional
        // });
    } catch (err) {
        console.error(`Error al eliminar enfermera con ID ${id}:`, err);
        res.status(500).json({
            message: 'Error al eliminar la enfermera',
            error: err.message
        });
    }
}


module.exports = {
    obtenerEnfermeras,
    obtenerEnfermeraPorId, 
    crearEnfermera,
    actualizarEnfermera,
    eliminarEnfermera
};
