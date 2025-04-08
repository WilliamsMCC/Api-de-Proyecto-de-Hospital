const express = require('express');
const cookieParser = require('cookie-parser');
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

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ Rutas principales
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tratamientos', tratamientoRoutes);
app.use('/api/medicamentos', medicamentoRoutes);

// ✅ Redirigir raíz al login visual (HTML)
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

// ✅ Ruta visual de login con cookie
app.post('/auth/login', (req, res) => {
    const user = req.body.user || "test_user"; 
    const token = createToken(user);

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000
    });

    res.send(`
        <div>
            <h3>✅ Login exitoso</h3>
            <p>Token guardado en cookie.</p>
            <a href="/datos-seguros">Ir a datos seguros</a>
        </div>
    `);
});

// ✅ Verificar token desde cookie o body
app.post('/verify', (req, res) => {
    const token = req.body.token || req.cookies.token;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado" });
    }

    const result = verifyToken(token);
    res.json(result);
});

// ✅ Ruta protegida
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

// ✅ Cerrar sesión
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send(`
        <div>
            <h3>🔒 Sesión cerrada.</h3>
            <a href="/auth/login">Volver al login</a>
        </div>
    `);
});

// ✅ Rutas adicionales
app.use('/pacientes', pacienteRoutes); 
app.use('/doctores', doctorRoutes);
// app.use('/citas', citaRoutes); 
// app.use('/enfermeras', enfermeraRoutes);
// app.use('/departamentos', departamentoRoutes);

module.exports = app;
