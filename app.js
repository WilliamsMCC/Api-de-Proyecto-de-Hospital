const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');


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



const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200,
    credentials: true 
};
app.use(cors(corsOptions));



// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ Rutas principales
app.use('/usuarios', usuarioRoutes);
app.use('/tratamientos', tratamientoRoutes);
app.use('/medicamentos', medicamentoRoutes);


// ✅ Rutas adicionales
app.use('/pacientes', pacienteRoutes); 
app.use('/doctores', doctorRoutes);
app.use('/citas', citaRoutes); 
app.use('/enfermeras', enfermeraRoutes);
app.use('/departamentos', departamentoRoutes);


// --- Simple Root Route for API Check ---
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hospital API is running. Use specific endpoints like /usuarios/login to interact." });
});

module.exports = app;
