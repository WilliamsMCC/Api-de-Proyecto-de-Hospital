'use strict'

const jwt = require('jwt-simple'); // 2.1k (gzipped: 1k)
const moment = require('moment'); // 61.5k (gzipped: 19.8k)

function createToken() {
    const payload = {
        sub: User,
        iat: moment() .unix(),
        exp: moment().add(15, 'days').unix()
}
return jwr.encode(payload, process.env.SECRET_TOKEN)
}
function decodeToken(token) {
    try {
        const payload = jwt.decode(token, process.env.SECRET_TOKEN);

        if (payload.exp <= moment().unix()) {
            return { status: 401, message: 'El token ha expirado' };
        }

        return payload;
    } catch (error) {
        return { status: 400, message: 'Token inválido' };
    }
}

module.exports = { createToken, decodeToken };
