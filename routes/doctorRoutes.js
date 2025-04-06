const express = require('express');
const router = express.Router();
const { obtenerDoctors, crearDoctor, actualizarDoctor, eliminarDoctor } = require('../controllers/doctorControllers');
const { verifyToken } = require('../middlewares/authMiddleware'); // Import middleware

// Apply verifyToken to all routes in this file
router.use(verifyToken); // Apply to all subsequent routes in this router

router.get('/', obtenerDoctors);

router.post('/', crearDoctor);

router.put('/:id', actualizarDoctor);

router.delete('/:id', eliminarDoctor);

module.exports = router;
