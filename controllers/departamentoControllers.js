const Departamento = require('../models/Departamento');

// Obtener todos los departamentos
async function obtenerDepartamentos(req, res) {
    try {
        const departamentos = await Departamento.findAll({
            // Keep attributes selection if desired
            attributes: ['id_departamento', 'nombre', 'descripcion', 'jefe']
        });
        // Standard JSON response
        res.status(200).json(departamentos);
    } catch (err) {
        console.error("Error al obtener departamentos:", err);
        // Standard JSON error
        res.status(500).json({
            message: 'Error al obtener los departamentos',
            error: err.message
        });
    }
}

// Obtener por ID
async function obtenerDepartamentoPorId(req, res) {
    const { id } = req.params;
    try {
        const departamento = await Departamento.findByPk(id, {
            // Keep attributes selection if desired
            attributes: ['id_departamento', 'nombre', 'descripcion', 'jefe']
        });
        if (!departamento) {
            // Standard JSON response
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        // Standard JSON response
        res.status(200).json(departamento);
    } catch (err) {
        console.error(`Error al obtener departamento con ID ${id}:`, err);
         // Standard JSON error
        res.status(500).json({
            message: 'Error al obtener el departamento',
            error: err.message
        });
    }
}

// Crear nuevo departamento
async function crearDepartamento(req, res) {
    const { nombre, descripcion, jefe } = req.body;
    // Keep validation
    if (!nombre) {
        // Standard JSON response
        return res.status(400).json({ message: 'El campo nombre es requerido' });
    }
    try {
        const departamento = await Departamento.create({
            nombre,
            descripcion: descripcion || null, // Keep default null logic
            jefe: jefe || null // Keep default null logic
        });
        // Standard JSON response - return created object
        res.status(201).json(departamento);
        // Original: res.status(201).json({ message: "...", data: departamento });
    } catch (err) {
        console.error("Error al crear departamento:", err);
         // Add specific error checks if needed (e.g., unique constraints if any)
         if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
        }
        // Standard JSON error
        res.status(500).json({
            message: 'Error al crear el departamento',
            error: err.message
        });
    }
}

// Actualizar por ID
async function actualizarDepartamento(req, res) {
    const { id } = req.params;
    // Destructure body inside try block after check
    try {
        const departamentoExistente = await Departamento.findByPk(id);
        if (!departamentoExistente) {
             // Standard JSON response
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }

        // Update using req.body - allow partial updates
        await Departamento.update(req.body, {
            where: { id_departamento: id }
        });

        // Refetch the updated record
        const departamentoActualizado = await Departamento.findByPk(id);
        // Standard JSON response - return updated object
        res.status(200).json(departamentoActualizado);
        // Original: res.status(200).json({ message: '...', data: departamentoActualizado });
    } catch (err) {
        console.error(`Error al actualizar departamento con ID ${id}:`, err);
         // Add specific error checks if needed
         if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: 'Error de validación', errors: err.errors.map(e => e.message) });
        }
        // Standard JSON error
        res.status(500).json({
            message: 'Error al actualizar el departamento',
            error: err.message
        });
    }
}

// Eliminar departamento por ID
async function eliminarDepartamento(req, res) {
    const { id } = req.params;
    try {
        const departamento = await Departamento.findByPk(id); // Check existence
        if (!departamento) {
             // Standard JSON response
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }

        await Departamento.destroy({ where: { id_departamento: id } });
        // Standard JSON response - simple message
        res.status(200).json({ message: 'Departamento eliminado exitosamente' });
        // Original: res.status(200).json({ message: '...', data: departamento }); // Returning deleted data is optional

    } catch (err) {
        console.error(`Error al eliminar departamento con ID ${id}:`, err);
        // Standard JSON error
        res.status(500).json({
            message: 'Error al eliminar el departamento',
            error: err.message
        });
    }
}

// Export all functions
module.exports = {
    obtenerDepartamentos,
    obtenerDepartamentoPorId,
    crearDepartamento,
    actualizarDepartamento,
    eliminarDepartamento
};