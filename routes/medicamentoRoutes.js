const express = require('express');
const router = express.Router();
const Medicamento = require('../models/Medicamento');
const Tratamiento = require('../models/Tratamiento');
const { verifyToken } = require('../middlewares/authMiddleware');

// ✅ Obtener medicamentos (JSON)
router.get('/', verifyToken, async (req, res) => {
    try {
        const medicamentos = await Medicamento.findAll({
            include: [{ model: Tratamiento }]
        });
        res.json(medicamentos);
    } catch (error) {
        console.error("❌ Error al obtener medicamentos:", error);
        res.status(500).json({ message: 'Error mostrando medicamentos' });
    }
});

// ✅ Insertar nuevo medicamento (protegido con token)
router.post('/', verifyToken, async (req, res) => {
    try {
        const nuevo = await Medicamento.create(req.body);
        res.status(201).json({
            message: "Medicamento registrado exitosamente",
            medicamento: nuevo
        });
    } catch (error) {
        console.error("❌ Error al registrar medicamento:", error);
        res.status(500).json({ message: 'Error registrando medicamento' });
    }
});

module.exports = router;
