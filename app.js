const express = require('express');
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Redirigir la raíz ("/") al formulario de login visual
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

// ✅ Ruta para generar un token (extra / API)
app.post('/login', (req, res) => {
    const user = req.body.user || "test_user"; 
    const token = createToken(user); 

    console.log(`🔑 Token generado para "${user}": ${token}`);
    res.json({ token });
});

// ✅ Ruta para verificar un token
app.post('/verify', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: "Token no proporcionado" });
    }

    const result = verifyToken(token);
    res.json(result);
});

// ✅ Ruta protegida para probar tokens
app.get('/datos-seguros', (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado. No hay token." });
    }

    const decoded = verifyToken(token);

    if (decoded.error) {
        return res.status(401).json({ error: decoded.error });
    }

    res.json({ mensaje: "Acceso permitido", usuario: decoded.sub });
});

// ✅ Rutas principales del sistema
app.use('/pacientes', pacienteRoutes);
app.use('/doctores', doctorRoutes);
app.use('/citas', citaRoutes); 
app.use('/medicamentos', medicamentoRoutes);
app.use('/tratamientos', tratamientoRoutes);
app.use('/auth', usuarioRoutes); // login visual y proceso
app.use('/enfermeras', enfermeraRoutes);
app.use('/departamentos', departamentoRoutes);

module.exports = app;
