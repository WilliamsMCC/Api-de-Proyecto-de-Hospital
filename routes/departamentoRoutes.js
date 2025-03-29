const express = require('express');
const router = express.Router();
const Departamento = require('../models/Departamento');
const { verifyToken } = require('../middlewares/authMiddleware');

// ✅ Ruta protegida para obtener departamentos (JSON)
router.get('/', verifyToken, async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        res.json(departamentos);
    } catch (error) {
        console.error("❌ Error al obtener departamentos:", error);
        res.status(500).json({ message: 'Error obteniendo departamentos' });
    }
});

// ✅ Ruta protegida para insertar nuevo departamento
router.post('/', verifyToken, async (req, res) => {
    try {
        const nuevo = await Departamento.create(req.body);
        res.status(201).json({
            message: "Departamento creado exitosamente",
            departamento: nuevo
        });
    } catch (error) {
        console.error("❌ Error al crear departamento:", error);
        res.status(500).json({ message: 'Error al crear departamento' });
    }
});

module.exports = router;
