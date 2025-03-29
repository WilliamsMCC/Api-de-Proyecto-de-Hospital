const express = require('express');
const router = express.Router();
const CitaMedica = require('../models/CitaMedica');
const Paciente = require('../models/Paciente');
const Doctor = require('../models/Doctor');
const { verifyToken } = require('../middlewares/authMiddleware');

// ✅ Obtener todas las citas médicas (formato JSON)
router.get('/', verifyToken, async (req, res) => {
    try {
        const citas = await CitaMedica.findAll({
            include: [{ model: Paciente }, { model: Doctor }]
        });

        res.json(citas);
    } catch (error) {
        console.error("❌ Error al obtener citas médicas:", error);
        res.status(500).json({ message: 'Error obteniendo citas médicas' });
    }
});

// ✅ Crear nueva cita médica (API protegida)
router.post('/', verifyToken, async (req, res) => {
    try {
        const nuevaCita = await CitaMedica.create(req.body);
        res.status(201).json({
            message: 'Cita médica creada exitosamente',
            cita: nuevaCita
        });
    } catch (error) {
        console.error('❌ Error al crear cita médica:', error);
        res.status(500).json({ message: 'Error al crear cita médica' });
    }
});

module.exports = router;
