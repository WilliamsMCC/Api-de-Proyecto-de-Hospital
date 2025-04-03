const express = require('express');
const cookieParser = require('cookie-parser'); // ✅ nuevo
const { createToken, verifyToken } = require('./services/services'); 
const pacienteRoutes = require('./routes/pacienteRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const citaRoutes = require('./routes/citaRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');
const tratamientoRoutes = require('./routes/tratamientoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const enfermeraRoutes = require('./routes/enfermeraRoutes');
const departamentoRoutes = require('./routes/departamentoRoutes');

require('dotenv').config();

if (!process.env.SECRET_TOKEN) {
    console.error("❌ Error: SECRET_TOKEN no está definido en .env");
    process.exit(1);
}

const app = express();

// ✅ Middleware necesarios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // ✅ usar cookie-parser

//ruta
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tratamientos', tratamientoRoutes);
app.use('/api/medicamentos', medicamentoRoutes);

// ✅ Redirigir raíz al login
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

// ✅ Ruta de login visual que guarda el token en cookie
app.post('/auth/login', (req, res) => {
    const user = req.body.user || "test_user"; 
    const token = createToken(user);

    // Guardar token en cookie
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000 // 1 hora
    });

    res.send(`
        <h3>✅ Login exitoso</h3>
        <p>Token guardado en cookie.</p>
        < href="/pacientes">Ir a pacientes</
    `);
});

// ✅ Ruta para verificar un token enviado en body (opcional)
app.post('/verify', (req, res) => {
    const token = req.body.token || req.cookies.token;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado" });
    }

    const result = verifyToken(token);
    res.json(result);
});

// ✅ Ruta protegida para probar tokens desde cookie
app.get('/datos-seguros', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado. No hay token." });
    }

    const decoded = verifyToken(token);

    if (decoded.error) {
        return res.status(401).json({ error: decoded.error });
    }

    res.json({ mensaje: "Acceso permitido", usuario: decoded.sub });
});

// ✅ Ruta para cerrar sesión (elimina la cookie)
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send(`<h3>🔒 Sesión cerrada.</h3><a href="/auth/login">Volver al login</a>`);
});

// ✅ Rutas del sistema
app.use('/pacientes', pacienteRoutes); 
app.use('/doctores', doctorRoutes);
//app.use('/citas', citaRoutes); 
//app.use('/medicamentos', medicamentoRoutes);
//app.use('/tratamientos', tratamientoRoutes);
//app.use('/auth', usuarioRoutes); 
//app.use('/enfermeras', enfermeraRoutes);
//app.use('/departamentos', departamentoRoutes);

module.exports = app;

