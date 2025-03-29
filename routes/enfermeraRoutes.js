const express = require('express'); 
const router = express.Router();
const Enfermera = require('../models/Enfermera');
const { verifyToken } = require('../middlewares/authMiddleware');

// ✅ Ruta protegida para obtener enfermeras (JSON)
router.get('/', verifyToken, async (req, res) => {
    try {
        const enfermeras = await Enfermera.findAll();
        res.json(enfermeras);
    } catch (error) {
        console.error("❌ Error al obtener enfermeras:", error);
        res.status(500).json({ message: 'Error obteniendo enfermeras' });
    }
});

// ✅ Ruta protegida para crear enfermera (JSON API)
router.post('/', verifyToken, async (req, res) => {
    try {
        const nueva = await Enfermera.create(req.body);
        res.status(201).json({
            message: "Enfermera registrada exitosamente",
            enfermera: nueva
        });
    } catch (error) {
        console.error("❌ Error al registrar enfermera:", error);
        res.status(500).json({ message: 'Error registrando enfermera' });
    }
});

// ✅ Ruta para eliminar enfermera
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Enfermera.destroy({ where: { id_enfermera: id } });
        if (result === 0) {
            return res.status(404).json({ message: 'Enfermera no encontrada' });
        }
        res.json({ message: 'Enfermera eliminada exitosamente' });
    } catch (error) {
        console.error("❌ Error al eliminar enfermera:", error);
        res.status(500).json({ message: 'Error al eliminar enfermera' });
    }
});

// ✅ Ruta para actualizar enfermera
router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, correo_electronico, usuario_id } = req.body;
    try {
        const [updated] = await Enfermera.update(
            { nombre, apellido, telefono, correo_electronico, usuario_id },
            { where: { id_enfermera: id } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: 'Enfermera no encontrada' });
        }

        const enfermeraActualizada = await Enfermera.findByPk(id);
        res.json({
            message: 'Enfermera actualizada exitosamente',
            enfermera: enfermeraActualizada
        });
    } catch (error) {
        console.error("❌ Error al actualizar enfermera:", error);
        res.status(500).json({ message: 'Error al actualizar enfermera' });
    }
});

module.exports = router;
