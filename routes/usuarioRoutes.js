const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { createToken, validatePassword } = require('../services/service');
const usuarioController = require('../controllers/usuarioController');


// CRUD completo usuario
router.post('/', usuarioController.create);
router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);

// ✅ Ruta para procesar login (solo JSON)
router.post('/login', async (req, res) => {
    const { email, password, rol } = req.body;

    const rolesValidos = ['admin', 'doctor', 'enfermera'];
    if (!rol || !rolesValidos.includes(rol)) {
        return res.status(400).json({ message: '❌ Rol inválido o no proporcionado' });
    }

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: '❌ Usuario no encontrado' });
        }

        const valid = await validatePassword(password, usuario.contraseña_hash);
        if (!valid) {
            return res.status(401).json({ message: '🔒 Contraseña incorrecta' });
        }

        if (usuario.rol !== rol) {
            return res.status(403).json({ message: '⚠️ El rol ingresado no coincide con el del usuario' });
        }

        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol, email: usuario.email },
            process.env.SECRET_TOKEN,
            { expiresIn: '1h' }
        );

        res.json({
            message: '✅ Login exitoso',
            token,
            usuario: { id: usuario.id, rol: usuario.rol, email: usuario.email }
        });

    } catch (err) {
        console.error('❌ Error en login:', err);
        res.status(500).json({ message: '⚠️ Error del servidor' });
    }
});

module.exports = router;
