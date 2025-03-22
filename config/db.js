const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelizeInstance = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.PASSWORD || '', // Si no hay contraseña, usa una cadena vacía
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT || 'mysql',
        port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
        pool: {
            max: parseInt(process.env.POOL_MAX, 10) || 5,
            min: parseInt(process.env.POOL_MIN, 10) || 0,
            acquire: parseInt(process.env.POOL_ACQUIRE, 10) || 30000,
            idle: parseInt(process.env.POOL_IDLE, 10) || 10000,
        },
        logging: false
    }
);

sequelizeInstance.authenticate()
    .then(() => console.log('✅ Conexión a la base de datos establecida correctamente.'))
    .catch(err => console.error('❌ Error al conectar la base de datos:', err));

module.exports = { sequelizeInstance };
