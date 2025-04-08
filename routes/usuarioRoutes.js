// FILE: routes/usuarioRoutes.js (Login simplified)
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { createToken, validatePassword } = require('../services/service.js');
const usuarioController = require('../controllers/usuarioController');
const { verifyToken } = require('../middlewares/authMiddleware.js');


router.post('/', verifyToken, usuarioController.create);
router.get('/', verifyToken, usuarioController.getAll);
router.get('/:id', verifyToken, usuarioController.getById);
router.put('/:id', verifyToken, usuarioController.update);
router.delete('/:id', verifyToken, usuarioController.delete);

// --- User Login Route ---
// Path: POST /usuarios/login
router.post('/login', async (req, res) => {
    // Only require email and password from the request body
    const { email, password } = req.body; // <-- Removed 'rol' extraction

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: '📧 Email y contraseña son requeridos' });
    }

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ message: '❌ Usuario no encontrado' });
        }

        // Validate password
        const valid = await validatePassword(password, usuario.contraseña_hash);
        if (!valid) {
            return res.status(401).json({ message: '🔒 Contraseña incorrecta' });
        }
        const token = jwt.sign(
            {
                id: usuario.id,
                rol: usuario.rol, // <-- User's actual role IS included in the token payload
                email: usuario.email,
                nombre: usuario.nombre
            },
            process.env.SECRET_TOKEN,
            { expiresIn: '1h' }
        );

        // Send response (still includes the user's actual role in the user object)
        res.json({
            message: '✅ Login exitoso',
            token,
            usuario: {
                id: usuario.id,
                rol: usuario.rol, // <-- User's actual role IS included in the response
                email: usuario.email,
                nombre: usuario.nombre
            }
        });

    } catch (err) {
        console.error('❌ Error en login:', err);
        res.status(500).json({ message: '⚠️ Error del servidor' });
    }
});

module.exports = router;