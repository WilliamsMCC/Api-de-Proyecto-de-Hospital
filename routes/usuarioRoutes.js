const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { createToken, validatePassword } = require('../services/authService');

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para login de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica un usuario y retorna un token JWT
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest' # Reference the schema defined in swagger.js
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token y datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse' # Reference the schema
 *       400:
 *         description: Datos de entrada inválidos (falta email/password, rol inválido)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Credenciales incorrectas (contraseña inválida)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Rol proporcionado no coincide con el del usuario (si se valida rol)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', async (req, res) => {
    // ... (login logic remains the same)
    const { email, password, rol } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: '📧 Email y contraseña son requeridos' });
    }

    const rolesValidos = ['admin', 'doctor', 'enfermera'];
    if (rol && !rolesValidos.includes(rol)) {
        return res.status(400).json({ message: '❌ Rol inválido proporcionado' });
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

        if (rol && usuario.rol !== rol) {
            return res.status(403).json({ message: '⚠️ El rol ingresado no coincide con el del usuario' });
        }

        const token = createToken(usuario);

        res.json({
            message: '✅ Login exitoso',
            token,
            usuario: {
                id: usuario.id,
                rol: usuario.rol,
                email: usuario.email,
                nombre: usuario.nombre
            }
        });

    } catch (err) {
        console.error('❌ Error en login:', err);
        res.status(500).json({ message: '⚠️ Error del servidor durante el login' });
    }
});

module.exports = router;