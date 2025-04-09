const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware'); 
const medicamentoController = require('../controllers/medicamentoController');


router.use(verifyToken);


router.post('/', medicamentoController.create);
router.get('/', medicamentoController.findAll);

router.get('/tratamiento/:idTratamiento', medicamentoController.findByTratamiento);
router.get('/:id', medicamentoController.findOne);
router.put('/:id', medicamentoController.update);
router.delete('/:id', medicamentoController.delete);



module.exports = router;