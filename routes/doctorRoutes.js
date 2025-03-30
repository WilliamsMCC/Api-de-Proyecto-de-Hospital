/*const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const { verifyToken } = require('../middlewares/authMiddleware');

// ✅ Obtener lista de doctores (JSON protegido)
router.get('/', verifyToken, async (req, res) => {
    try {
        const doctores = await Doctor.findAll();
        res.json(doctores);
    } catch (error) {
        console.error("❌ Error al obtener doctores:", error);
        res.status(500).json({ message: 'Error obteniendo doctores' });
    }
});

// ✅ Crear un nuevo doctor (API protegida con token)
router.post('/', verifyToken, async (req, res) => {
    try {
        const nuevoDoctor = await Doctor.create(req.body);
        res.status(201).json({
            message: 'Doctor creado exitosamente',
            doctor: nuevoDoctor
        });
    } catch (error) {
        console.error('❌ Error al crear doctor:', error);
        res.status(500).json({ message: 'Error al crear doctor' });
    }
});*/

const express = require('express');
const router = express.Router();
const { obtenerDoctors, crearDoctor, actualizarDoctor, eliminarDoctor } = require('../controllers/doctorControllers');


router.get('/', obtenerDoctors);

router.post('/', crearDoctor);

router.put('/:id', actualizarDoctor);

router.delete('/:id', eliminarDoctor);

module.exports = router;
