const Departamento = require('../models/Departamento');

// Obtener todos los departamentos
async function obtenerDepartamentos(req, res) {
    try {
        const departamentos = await Departamento.findAll({
            attributes: ['id_departamento', 'nombre', 'descripcion', 'jefe']
        });
        res.status(200).json(departamentos);
    } catch (err) {
        console.error("Error al obtener departamentos:", err);
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
            attributes: ['id_departamento', 'nombre', 'descripcion', 'jefe']
        });
        
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }
        
        res.status(200).json(departamento);
    } catch (err) {
        console.error("Error al obtener departamento:", err);
        res.status(500).json({ 
            message: 'Error al obtener el departamento',
            error: err.message 
        });
    }
}

// Crear nuevo departamento
async function crearDepartamento(req, res) {
    const { nombre, descripcion, jefe } = req.body;
    
    if (!nombre) {
        return res.status(400).json({ 
            message: 'El campo nombre es requerido' 
        });
    }

    try {
        const departamento = await Departamento.create({
            nombre,
            descripcion: descripcion || null,
            jefe: jefe || null
        });
        
        res.status(201).json({
            message: "Departamento creado exitosamente",
            data: departamento
        });
    } catch (err) {
        console.error("Error al crear departamento:", err);
        res.status(500).json({ 
            message: 'Error al crear el departamento',
            error: err.message 
        });
    }
}

// Actualizar por ID
async function actualizarDepartamento(req, res) {
    const { id } = req.params;
    const { nombre, descripcion, jefe } = req.body;

    try {
        // Verificar si existe el departamento
        const departamentoExistente = await Departamento.findByPk(id);
        if (!departamentoExistente) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }

        const [updated] = await Departamento.update(
            { 
                nombre: nombre || departamentoExistente.nombre,
                descripcion: descripcion || departamentoExistente.descripcion,
                jefe: jefe || departamentoExistente.jefe
            },
            { where: { id_departamento: id } }
        );

        const departamentoActualizado = await Departamento.findByPk(id);
        res.status(200).json({
            message: 'Departamento actualizado exitosamente',
            data: departamentoActualizado
        });
    } catch (err) {
        console.error("Error al actualizar departamento:", err);
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
        // Verificar si existe primero
        const departamento = await Departamento.findByPk(id);
        if (!departamento) {
            return res.status(404).json({ message: 'Departamento no encontrado' });
        }

        await Departamento.destroy({ where: { id_departamento: id } });
        res.status(200).json({ 
            message: 'Departamento eliminado exitosamente',
            data: departamento 
        });
    } catch (err) {
        console.error("Error al eliminar departamento:", err);
        res.status(500).json({ 
            message: 'Error al eliminar el departamento',
            error: err.message 
        });
    }
}

module.exports = { 
    obtenerDepartamentos,
    obtenerDepartamentoPorId,
    crearDepartamento, 
    actualizarDepartamento, 
    eliminarDepartamento 
};