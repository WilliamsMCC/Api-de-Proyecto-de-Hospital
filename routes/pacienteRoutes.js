const express = require('express');
const router = express.Router();

const {
    obtenerPacientes,
    obtenerPacientePorId,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
} = require('../controllers/pacienteControllers');
const { verifyToken } = require('../middlewares/authMiddleware');

// Middleware is correctly applied to protect all routes below
router.use(verifyToken);

// --- Routes using controller methods ---

// GET /pacientes
router.get('/', obtenerPacientes);

// GET /pacientes/:id
router.get('/:id', obtenerPacientePorId);

// POST /pacientes
router.post('/', crearPaciente);

// PUT /pacientes/:id
router.put('/:id', actualizarPaciente);

// DELETE /pacientes/:id
router.delete('/:id', eliminarPaciente);

module.exports = router;