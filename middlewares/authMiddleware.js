const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // ✅ Obtener token desde header, query o cookie
  const bearerHeader = req.headers['authorization'];
  const token =
    bearerHeader?.split(' ')[1] || 
    req.query.token || 
    req.cookies?.token; // <- Aquí está lo nuevo

  if (!token) {
    return res.status(403).send('<h3>🚫 Token no proporcionado</h3>');
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send('<h3>❌ Token inválido</h3>');
    }

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };

