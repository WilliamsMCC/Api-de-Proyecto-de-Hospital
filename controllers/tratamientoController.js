const { sequelizeInstance } = require('../config/db');
const Tratamiento = require('../models/Tratamiento');

// Obtener todos los tratamientos
exports.getAllTratamientos = async (req, res) => {
    try {
        const tratamientos = await Tratamiento.findAll();
        res.json({
            success: true,
            data: tratamientos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener tratamientos',
            error: error.message
        });
    }
};

// obtener por ID
exports.getTratamientoById = async (req, res) => {
    try {
        const tratamiento = await Tratamiento.findByPk(req.params.id);
        
        if (!tratamiento) {
            return res.status(404).json({
                success: false,
                message: 'Tratamiento no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: tratamiento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el tratamiento',
            error: error.message
        });
    }
};

// Crear
exports.createTratamiento = async (req, res) => {
    try {
        const { id_paciente, id_doctor, descripcion, fecha_inicio, fecha_fin } = req.body;
        
        //validacion por posible problemas
        if (!id_paciente || !id_doctor || !descripcion || !fecha_inicio || !fecha_fin) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }

        const nuevoTratamiento = await Tratamiento.create({
            id_paciente,
            id_doctor,
            descripcion,
            fecha_inicio,
            fecha_fin
        });
        
        res.status(201).json({
            success: true,
            data: nuevoTratamiento
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear tratamiento',
            error: error.message
        });
    }
};

// Actualizar 
exports.updateTratamiento = async (req, res) => {
    try {
        const [updated] = await Tratamiento.update(req.body, {
            where: { id_tratamiento: req.params.id }
        });
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Tratamiento no encontrado'
            });
        }
        
        const tratamientoActualizado = await Tratamiento.findByPk(req.params.id);
        res.json({
            success: true,
            data: tratamientoActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar tratamiento',
            error: error.message
        });
    }
};

// Eliminar 
exports.deleteTratamiento = async (req, res) => {
    try {
        const deleted = await Tratamiento.destroy({
            where: { id_tratamiento: req.params.id }
        });
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Tratamiento no encontrado'
            });
        }
        
        res.json({
            success: true,
            message: 'Tratamiento eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar tratamiento',
            error: error.message
        });
    }
};