const express = require('express');
const router = express.Router();
const {
    obtenerDoctors,
    obtenerDoctorPorId, 
    crearDoctor,
    actualizarDoctor,
    eliminarDoctor
} = require('../controllers/doctorControllers');

const { verifyToken } = require('../middlewares/authMiddleware');


router.use(verifyToken);


router.get('/', obtenerDoctors);
router.get('/:id', obtenerDoctorPorId); 
router.post('/', crearDoctor);
router.put('/:id', actualizarDoctor);
router.delete('/:id', eliminarDoctor);


module.exports = router;