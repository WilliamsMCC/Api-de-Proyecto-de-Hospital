const express = require('express');
const { createToken, verifyToken } = require('./services/services'); 
const pacienteRoutes = require('./routes/pacienteRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const citaRoutes = require('./routes/citaRoutes');
require('dotenv').config();

if (!process.env.SECRET_TOKEN) {
    console.error("❌ Error: SECRET_TOKEN no está definido en .env");
    process.exit(1);
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ Redirigir la raíz ("/") a "/pacientes"
app.get('/', (req, res) => {
    res.redirect('/pacientes');
});

// ✅ Ruta para generar un token
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

// ✅ Ruta protegida: Solo permite el acceso si el token es válido
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

// ✅ Rutas de pacientes y doctores
app.use('/pacientes', pacienteRoutes);
app.use('/doctores', doctorRoutes);
app.use('/citas', citaRoutes); 



module.exports = app;
