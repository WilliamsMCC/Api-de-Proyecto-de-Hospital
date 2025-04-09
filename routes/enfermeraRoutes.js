const express = require('express');
const router = express.Router();

const {
    obtenerEnfermeras,
    obtenerEnfermeraPorId, 
    crearEnfermera,
    actualizarEnfermera,
    eliminarEnfermera
} = require('../controllers/enfermeraControllers'); 

const { verifyToken } = require('../middlewares/authMiddleware');


router.use(verifyToken); 



// GET /enfermeras
router.get('/', obtenerEnfermeras); 
// GET /enfermeras/:id
router.get('/:id', obtenerEnfermeraPorId); 

// POST /enfermeras
router.post('/', crearEnfermera); 
// PUT /enfermeras/:id
router.put('/:id', actualizarEnfermera); 

// DELETE /enfermeras/:id
router.delete('/:id', eliminarEnfermera); 



module.exports = router;