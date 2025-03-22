'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const bcrypt = require('bcrypt');
require('dotenv').config();

// 🔐 Crear token JWT para un usuario
function createToken(user) {
    const payload = {
        sub: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix()
    };

    return jwt.encode(payload, process.env.SECRET_TOKEN);
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

// 🔒 Validar contraseña
async function validatePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    createToken,
    verifyToken,
    validatePassword
};
