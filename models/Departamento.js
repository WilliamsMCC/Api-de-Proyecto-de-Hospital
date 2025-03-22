const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db');

const Departamento = sequelizeInstance.define('Departamento', {
    id_departamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    jefe: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'departamento',
    timestamps: false
});

module.exports = Departamento;
