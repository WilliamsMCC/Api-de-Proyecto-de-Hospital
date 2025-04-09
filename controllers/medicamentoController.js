const Medicamento = require('../models/Medicamento');
const Tratamiento = require('../models/Tratamiento');


const medicamentoController = {
    // Crear un nuevo medicamento
    async create(req, res) {
        const { nombre, descripcion, dosis, frecuencia, id_tratamiento } = req.body;
        try {
            if (!nombre || !id_tratamiento) {
                 return res.status(400).json({ message: 'Nombre del medicamento y ID de tratamiento son requeridos.' });
            }
            const tratamiento = await Tratamiento.findByPk(id_tratamiento);
            if (!tratamiento) {
                return res.status(404).json({ message: 'Tratamiento asociado no encontrado' });
            }
            const nuevoMedicamento = await Medicamento.create({ nombre, descripcion, dosis, frecuencia, id_tratamiento });
            // Refetch with include
             const medicamentoCreado = await Medicamento.findByPk(nuevoMedicamento.id_medicamento, {
                include: [{ model: Tratamiento, as: 'tratamiento' }] // Include treatment details
            });
            res.status(201).json(medicamentoCreado || nuevoMedicamento);
        } catch (error) { // Changed 'err' to 'error' for consistency
            console.error('Error al crear medicamento:', error);
             if (error.name === 'SequelizeValidationError') { // Use 'error'
                return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
            }
             if (error.name === 'SequelizeForeignKeyConstraintError') { // Use 'error'
                 return res.status(400).json({ message: 'ID de Tratamiento inválido.' });
            }
            res.status(500).json({ message: 'Error interno del servidor al crear medicamento', error: error.message });
        }
    },

    // Obtener todos los medicamentos
    async findAll(req, res) {
        try {
            const medicamentos = await Medicamento.findAll({
                include: [ // Include treatment details
                    { model: Tratamiento, as: 'tratamiento' } // Include based on belongsTo
                ],
                order: [['nombre', 'ASC']]
            });
            res.status(200).json(medicamentos);
        } catch (error) {
            console.error('Error al obtener medicamentos:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener medicamentos', error: error.message });
        }
    },

    // Obtener un medicamento por ID
    async findOne(req, res) {
        const { id } = req.params;
        try {
            const medicamento = await Medicamento.findByPk(id, {
                 include: [{ model: Tratamiento, as: 'tratamiento' }] // Include treatment details
            });
            if (!medicamento) {
                return res.status(404).json({ message: 'Medicamento no encontrado' });
            }
            res.status(200).json(medicamento);
        } catch (error) {
            console.error(`Error al obtener medicamento con ID ${id}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al obtener medicamento', error: error.message });
        }
    },

    // Actualizar
    async update(req, res) {
        const { id } = req.params;
        const { id_tratamiento } = req.body;
        try {
            const medicamento = await Medicamento.findByPk(id);
            if (!medicamento) {
                return res.status(404).json({ message: 'Medicamento no encontrado' });
            }
            if (id_tratamiento && id_tratamiento !== medicamento.id_tratamiento) {
                const tratamiento = await Tratamiento.findByPk(id_tratamiento);
                if (!tratamiento) {
                    return res.status(400).json({ message: 'Tratamiento asociado no encontrado para actualizar' });
                }
            }
            await Medicamento.update(req.body, { where: { id_medicamento: id } });
            const medicamentoActualizado = await Medicamento.findByPk(id, {
                 include: [{ model: Tratamiento, as: 'tratamiento' }]
            });
            res.status(200).json(medicamentoActualizado);
        } catch (error) { // Changed 'err' to 'error'
            console.error(`Error al actualizar medicamento con ID ${id}:`, error);
             if (error.name === 'SequelizeValidationError') { // Use 'error'
                return res.status(400).json({ message: 'Error de validación', errors: error.errors.map(e => e.message) });
            }
             if (error.name === 'SequelizeForeignKeyConstraintError') { // Use 'error'
                 return res.status(400).json({ message: 'ID de Tratamiento inválido.' });
            }
            res.status(500).json({ message: 'Error interno del servidor al actualizar medicamento', error: error.message });
        }
    },

    // Eliminar
    async delete(req, res) {
        const { id } = req.params;
        try {
            const deleted = await Medicamento.destroy({ where: { id_medicamento: id } });
            if (!deleted) {
                return res.status(404).json({ message: 'Medicamento no encontrado' });
            }
            res.status(200).json({ message: 'Medicamento eliminado correctamente' });
        } catch (error) {
            console.error(`Error al eliminar medicamento con ID ${id}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar medicamento', error: error.message });
        }
    },

    // Obtener medicamentos por tratamiento ID
    async findByTratamiento(req, res) {
        const { idTratamiento } = req.params;
        try {
            const tratamiento = await Tratamiento.findByPk(idTratamiento);
            if (!tratamiento) {
                 return res.status(404).json({ message: 'Tratamiento no encontrado' });
            }
            const medicamentos = await Medicamento.findAll({
                where: { id_tratamiento: idTratamiento },
                order: [['nombre', 'ASC']]
            });
            res.status(200).json(medicamentos);
        } catch (error) {
            console.error(`Error al obtener medicamentos para tratamiento ID ${idTratamiento}:`, error);
            res.status(500).json({ message: 'Error interno del servidor al obtener medicamentos por tratamiento', error: error.message });
        }
    }
};

module.exports = medicamentoController;