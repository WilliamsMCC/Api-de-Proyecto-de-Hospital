const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
const { verifyToken } = require('../middlewares/authMiddleware');

// ✅ Obtener todos los pacientes
router.get('/', verifyToken, async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.json(pacientes);
    } catch (error) {
        console.error("❌ Error al obtener pacientes:", error);
        res.status(500).json({ message: 'Error obteniendo pacientes' });
    }
});

// ✅ Obtener un paciente por ID
router.get('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findByPk(id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.json(paciente);
    } catch (error) {
        console.error("❌ Error al obtener paciente:", error);
        res.status(500).json({ message: 'Error obteniendo paciente' });
    }
});

// ✅ Crear un nuevo paciente
router.post('/', verifyToken, async (req, res) => {
    try {
        const nuevoPaciente = await Paciente.create(req.body);
        res.status(201).json({ message: "Paciente creado exitosamente", paciente: nuevoPaciente });
    } catch (error) {
        console.error("❌ Error al crear paciente:", error);
        res.status(500).json({ error: 'Error creando paciente' });
    }
});

// ✅ Actualizar un paciente
router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const [actualizado] = await Paciente.update(req.body, { where: { id_paciente: id } });
        if (!actualizado) {
            return res.status(404).json({ message: 'Paciente no encontrado para actualizar' });
        }
        const pacienteActualizado = await Paciente.findByPk(id);
        res.json({ message: 'Paciente actualizado exitosamente', paciente: pacienteActualizado });
    } catch (error) {
        console.error("❌ Error al actualizar paciente:", error);
        res.status(500).json({ message: 'Error actualizando paciente' });
    }
});

// ✅ Eliminar un paciente
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await Paciente.destroy({ where: { id_paciente: id } });
        if (!eliminado) {
            return res.status(404).json({ message: 'Paciente no encontrado para eliminar' });
        }
        res.json({ message: 'Paciente eliminado exitosamente' });
    } catch (error) {
        console.error("❌ Error al eliminar paciente:", error);
        res.status(500).json({ message: 'Error eliminando paciente' });
    }
});

module.exports = router;
