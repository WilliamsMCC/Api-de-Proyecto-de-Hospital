const express = require('express');
const cookieParser = require('cookie-parser'); // Keep for middleware if needed
// Remove direct dependency on the old service if not used elsewhere
// const { createToken, verifyToken } = require('./services/services');
const cors = require('cors');
const { verifyToken } = require('./middlewares/authMiddleware'); // Use the fixed middleware



// --- Swagger Imports ---
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger'); 


// Import all route handlers
const pacienteRoutes = require('./routes/pacienteRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const citaRoutes = require('./routes/citaRoutes');
const medicamentoRoutes = require('./routes/medicamentoRoutes');
const tratamientoRoutes = require('./routes/tratamientoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes'); // The main auth routes
const enfermeraRoutes = require('./routes/enfermeraRoutes');
const departamentoRoutes = require('./routes/departamentoRoutes');

require('dotenv').config();

if (!process.env.SECRET_TOKEN) {
    console.error("❌ Error: SECRET_TOKEN no está definido en .env");
    process.exit(1);
}

const app = express();




const corsOptions = {
    // Replace 'http://localhost:xxxx' with the actual origin of your frontend app
    // If your frontend runs on port 5173, use that.
    origin: 'http://localhost:5173', // <--- IMPORTANT: SET YOUR FRONTEND ORIGIN HERE
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true // Allows cookies/authorization headers to be sent from the frontend
  };
  app.use(cors(corsOptions)); // <--- Use configured CORS options
  


// ✅ Middleware necesarios
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser()); // Keep in case cookies are used by frontend/middleware

// --- REMOVE Unconventional/HTML Routes ---
/*
// ✅ Redirigir raíz al login (Remove or change - API root usually shows status/docs)
app.get('/', (req, res) => {
    // res.redirect('/auth/login'); // Redirect doesn't make sense for API
    res.json({ message: "Hospital API is running. Use /auth/login to authenticate." });
});

// ✅ Ruta de login visual que guarda el token en cookie (REMOVE - Use /auth/login from usuarioRoutes)
app.post('/auth/login', (req, res) => { ... });

// ✅ Ruta para verificar un token enviado en body (REMOVE - Middleware handles this)
app.post('/verify', (req, res) => { ... });

// ✅ Ruta protegida para probar tokens desde cookie (REMOVE - Test protected endpoints directly)
app.get('/datos-seguros', (req, res) => { ... });

// ✅ Ruta para cerrar sesión (elimina la cookie) (REMOVE - Use /auth/logout if implemented, or client-side)
app.get('/logout', (req, res) => { ... });
*/


// --- Swagger UI Route ---
// Serve Swagger UI documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// --- Route to serve the raw Swagger/OpenAPI spec ---
// Add this endpoint:
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// --- ACTIVATE API Routes ---
// Authentication routes (Login) - Public (verifyToken is not applied here)
app.use('/auth', usuarioRoutes);

// Protected API Routes - Apply verifyToken middleware here or within each route file
// Applying here is simpler for a blanket protection, but less flexible.
// Let's apply it within the route files for better control (see step 6).
app.use('/pacientes', pacienteRoutes); // Will add verifyToken inside this file
app.use('/doctores', doctorRoutes);   // Will add verifyToken inside this file
app.use('/citas', citaRoutes);         // Already uses verifyToken inside
app.use('/medicamentos', medicamentoRoutes); // Already uses verifyToken inside
app.use('/tratamientos', tratamientoRoutes); // Already uses verifyToken inside
app.use('/enfermeras', enfermeraRoutes);   // Already uses verifyToken inside
app.use('/departamentos', departamentoRoutes); // Already uses verifyToken inside


// Basic Root Route for API status
app.get('/', (req, res) => {
    res.json({ message: "Hospital API is running. Authenticate via /auth/login." });
});

// Optional: Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});


module.exports = app;