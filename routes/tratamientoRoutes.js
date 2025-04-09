const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/authMiddleware'); 

const tratamientoController = require('../controllers/tratamientoController');


router.use(verifyToken); 


router.get('/', tratamientoController.getAllTratamientos);
router.get('/:id', tratamientoController.getTratamientoById);
router.post('/', tratamientoController.createTratamiento);
router.put('/:id', tratamientoController.updateTratamiento);
router.delete('/:id', tratamientoController.deleteTratamiento);


module.exports = router;