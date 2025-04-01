const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db'); 

const Usuario = sequelizeInstance.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            len: [3, 30]
        }
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    contraseña_hash: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    rol: {
        type: DataTypes.ENUM('admin', 'doctor', 'enfermera', 'paciente'),
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: false
});

module.exports = Usuario;