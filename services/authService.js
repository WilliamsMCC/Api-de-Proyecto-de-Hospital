'use strict';

// const jwt = require('jwt-simple'); // Keep using jsonwebtoken for consistency
const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
require('dotenv').config();

// 🔐 Crear token JWT para un usuario
// (Using jsonwebtoken to be consistent with middleware/login route)
function createToken(usuario) {
    const payload = {
        id: usuario.id, // Use 'id' standard claim
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        iat: moment().unix(),
        // Use standard 'exp' claim
        exp: moment().add(1, 'hour').unix() // Shorten expiry to 1 hour for example
        // exp: moment().add(15, 'days').unix() // Original expiry
    };

    // Use jsonwebtoken.sign
    return jwt.sign(payload, process.env.SECRET_TOKEN);
}

// 🔍 Verificar token JWT recibido (using jsonwebtoken)
// This function isn't strictly needed if middleware uses jwt.verify directly,
// but can be kept for consistency if desired. Let's keep it simple for now
// and let the middleware handle verification directly.

// 🔒 Validar contraseña
async function validatePassword(password, hash) {
    if (!password || !hash) {
        console.error("validatePassword received undefined password or hash");
        return false;
    }
    return await bcrypt.compare(password, hash);
}

module.exports = {
    createToken,
    // verifyToken, // Middleware will handle verification directly
    validatePassword
};