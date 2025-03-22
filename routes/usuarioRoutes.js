const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { createToken, validatePassword } = require('../services/service');

// ✅ Ruta visual para mostrar el formulario de login
router.get('/login', (req, res) => {
    res.send(`
        <html>
        <head><title>Iniciar Sesión</title></head>
        <body style="font-family: Arial; text-align: center; margin-top: 50px;">
            <h2>Login de Usuario</h2>
            <form method="POST" action="/auth/login">
                <input type="email" name="email" placeholder="Correo electrónico" required /><br><br>
                <input type="password" name="password" placeholder="Contraseña" required /><br><br>
                <select name="rol" required>
                    <option value="">Seleccionar rol</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="enfermera">Enfermera</option>
                </select><br><br>
                <button type="submit">Iniciar sesión</button>
            </form>
        </body>
        </html>
    `);
});

// ✅ Ruta para procesar el login
router.post('/login', async (req, res) => {
    const { email, password, rol } = req.body;

    // 🔍 Verificar que el rol se haya enviado y sea válido
    const rolesValidos = ['admin', 'doctor', 'enfermera'];
    if (!rol || !rolesValidos.includes(rol)) {
        return res.status(400).send(`<p>❌ Rol inválido o no proporcionado</p><a href="/auth/login">Volver</a>`);
    }

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).send(`<p>❌ Usuario no encontrado</p><a href="/auth/login">Volver</a>`);
        }

        const valid = await validatePassword(password, usuario.contraseña_hash);
        if (!valid) {
            return res.status(401).send(`<p>🔒 Contraseña incorrecta</p><a href="/auth/login">Intentar de nuevo</a>`);
        }

        // 🔐 Verificar si el rol coincide con el del usuario en base de datos
        if (usuario.rol !== rol) {
            return res.status(403).send(`<p>⚠️ El rol ingresado no coincide con el del usuario</p><a href="/auth/login">Volver</a>`);
        }

        // ✅ Todo correcto → Redirigir
        return res.redirect('/pacientes');

    } catch (err) {
        console.error('❌ Error en login:', err);
        res.status(500).send('<p>⚠️ Error del servidor</p>');
    }
});

module.exports = router;
