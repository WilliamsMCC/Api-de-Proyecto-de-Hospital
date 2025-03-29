const express = require('express');
const router = express.Router();
const Tratamiento = require('../models/Tratamiento');
const { verifyToken } = require('../middlewares/authMiddleware');

// ✅ Obtener tratamientos (JSON)
router.get('/', verifyToken, async (req, res) => {
    try {
        const tratamientos = await Tratamiento.findAll();
        res.json(tratamientos);
    } catch (error) {
        console.error("❌ Error al obtener tratamientos:", error);
        res.status(500).json({ message: 'Error mostrando tratamientos' });
    }
});

// ✅ Insertar tratamiento (protegido con token)
router.post('/', verifyToken, async (req, res) => {
    try {
        const nuevo = await Tratamiento.create(req.body);
        res.status(201).json({
            message: "Tratamiento registrado exitosamente",
            tratamiento: nuevo
        });
    } catch (error) {
        console.error("❌ Error al registrar tratamiento:", error);
        res.status(500).json({ message: 'Error registrando tratamiento' });
    }
});

module.exports = router;
