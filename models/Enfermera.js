const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db');

const Enfermera = sequelizeInstance.define('Enfermera', {
    id_enfermera: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'enfermera',
    timestamps: false
});

module.exports = Enfermera;
