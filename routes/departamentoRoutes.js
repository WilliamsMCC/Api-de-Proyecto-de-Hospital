const express = require('express');
const router = express.Router();

const {
    obtenerDepartamentos,
    obtenerDepartamentoPorId, 
    crearDepartamento,
    actualizarDepartamento,    
    eliminarDepartamento   
} = require('../controllers/departamentoControllers');


const { verifyToken } = require('../middlewares/authMiddleware');


router.use(verifyToken); 

// GET /departamentos
router.get('/', obtenerDepartamentos);

// GET /departamentos/:id
router.get('/:id', obtenerDepartamentoPorId);

// POST /departamentos
router.post('/', crearDepartamento);

// PUT /departamentos/:id
router.put('/:id', actualizarDepartamento);

// DELETE /departamentos/:id
router.delete('/:id', eliminarDepartamento);


module.exports = router;