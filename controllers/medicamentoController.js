const Medicamento = require('../models/Medicamento');
const Tratamiento = require('../models/Tratamiento');

const medicamentoController = {
    // Crear un nuevo medicamento
    async create(req, res) {
        try {
            const { nombre, descripcion, dosis, frecuencia, id_tratamiento } = req.body;

            // Verificar si el tratamiento existe
            const tratamiento = await Tratamiento.findByPk(id_tratamiento);
            if (!tratamiento) {
                return res.status(404).json({ message: 'Tratamiento no encontrado' });
            }

            const nuevoMedicamento = await Medicamento.create({
                nombre,
                descripcion,
                dosis,
                frecuencia,
                id_tratamiento
            });

            res.status(201).json(nuevoMedicamento);
        } catch (error) {
            console.error('Error al crear medicamento:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    // Obtener todos los medicamentos
    async findAll(req, res) {
        try {
            const medicamentos = await Medicamento.findAll();
            res.json(medicamentos);
        } catch (error) {
            console.error('Error al obtener medicamentos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    // Obtener un medicamento por ID
    async findOne(req, res) {
        try {
            const { id } = req.params;
            const medicamento = await Medicamento.findByPk(id);

            if (!medicamento) {
                return res.status(404).json({ message: 'Medicamento no encontrado' });
            }

            res.json(medicamento);
        } catch (error) {
            console.error('Error al obtener medicamento:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    // Actualizar 
    async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, descripcion, dosis, frecuencia, id_tratamiento } = req.body;

            const medicamento = await Medicamento.findByPk(id);
            if (!medicamento) {
                return res.status(404).json({ message: 'Medicamento no encontrado' });
            }

            // Verificar si el tratamiento existe si se va a actualizar
            if (id_tratamiento) {
                const tratamiento = await Tratamiento.findByPk(id_tratamiento);
                if (!tratamiento) {
                    return res.status(404).json({ message: 'Tratamiento no encontrado' });
                }
            }

            await medicamento.update({
                nombre: nombre || medicamento.nombre,
                descripcion: descripcion || medicamento.descripcion,
                dosis: dosis || medicamento.dosis,
                frecuencia: frecuencia || medicamento.frecuencia,
                id_tratamiento: id_tratamiento || medicamento.id_tratamiento
            });

            res.json(medicamento);
        } catch (error) {
            console.error('Error al actualizar medicamento:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    // Eliminar 
    async delete(req, res) {
        try {
            const { id } = req.params;
            const medicamento = await Medicamento.findByPk(id);

            if (!medicamento) {
                return res.status(404).json({ message: 'Medicamento no encontrado' });
            }

            await medicamento.destroy();
            res.json({ message: 'Medicamento eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar medicamento:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    // Obtener medicamentos por tratamiento
    async findByTratamiento(req, res) {
        try {
            const { idTratamiento } = req.params;
            const medicamentos = await Medicamento.findAll({
                where: { id_tratamiento: idTratamiento }
            });

            res.json(medicamentos);
        } catch (error) {
            console.error('Error al obtener medicamentos por tratamiento:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

module.exports = medicamentoController;