'use strict';

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
        exp: moment().add(15, 'days').unix() 
    };

    // Use jsonwebtoken.sign
    return jwt.sign(payload, process.env.SECRET_TOKEN);
}

// 🔍 Verificar token JWT recibido
function verifyToken(token) {
    try {
        const payload = jwt.decode(token, process.env.SECRET_TOKEN);

        if (payload.exp <= moment().unix()) {
            return { error: 'Token expirado' };
        }

        return payload;
    } catch (err) {
        return { error: 'Token inválido' };
    }
}

async function validatePassword(password, hash) {
    if (!password || !hash) {
        console.error("validatePassword received undefined password or hash");
        return false;
    }
    return await bcrypt.compare(password, hash);
}


module.exports = {
    createToken,
    verifyToken,
    validatePassword
};
