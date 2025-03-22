const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db'); // Importar correctamente la conexión

const Doctor = sequelizeInstance.define('Doctor', {
    id_doctor: {
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
    especialidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING
    },
    correo_electronico: {
        type: DataTypes.STRING
    },
    horario_atencion: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'doctor',
    timestamps: false
});

module.exports = Doctor;

