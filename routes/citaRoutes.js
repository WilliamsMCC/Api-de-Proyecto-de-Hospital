const express = require('express');
const router = express.Router();


const {
    obtenerCitas,
    obtenerCitaPorId, 
    crearCita,
    actualizarCita,  
    eliminarCita       
} = require('../controllers/citasControllers'); 


const { verifyToken } = require('../middlewares/authMiddleware');


router.use(verifyToken); 

// GET /citas
router.get('/', obtenerCitas); 

// GET /citas/:id
router.get('/:id', obtenerCitaPorId); 

// POST /citas
router.post('/', crearCita); 

// PUT /citas/:id
router.put('/:id', actualizarCita); 

// DELETE /citas/:id
router.delete('/:id', eliminarCita); 


module.exports = router;