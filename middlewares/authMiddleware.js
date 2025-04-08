const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // ✅ Obtener token desde header, query o cookie
  const bearerHeader = req.headers['authorization'];
  const token =
    (bearerHeader && bearerHeader.startsWith('Bearer ')) ? bearerHeader.split(' ')[1] :
    req.query.token ||
    req.cookies?.token; 

  if (!token) {
    // Return JSON error
    return res.status(403).json({ message: '🚫 Token no proporcionado' });
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      // Return JSON error based on error type
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: '❌ Token expirado' });
      }
      return res.status(401).json({ message: '❌ Token inválido' });
    }


    req.user = decoded; 
    next();
  });
};

module.exports = { verifyToken };