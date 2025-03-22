'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config(); // Cargar variables de entorno

// ✅ Verificar si `SECRET_TOKEN` está definido
if (!process.env.SECRET_TOKEN) {
    console.error("❌ Error: SECRET_TOKEN no está definido en .env");
    process.exit(1);
}

// ✅ Crear Token
function createToken(user) {  
    const payload = {
        sub: user, // Se recibe el usuario como parámetro
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix()
    };
    return jwt.encode(payload, process.env.SECRET_TOKEN);
}

// ✅ Verificar Token
function verifyToken(token) {
    try {
        const decoded = jwt.decode(token, process.env.SECRET_TOKEN);

        if (decoded.exp <= moment().unix()) {
            return { error: 'Token expirado' };
        }

        return decoded;
    } catch (error) {
        return { error: 'Token inválido' };
    }
}

// ✅ Exportar correctamente
module.exports = { verifyToken, createToken };
