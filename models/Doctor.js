const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db'); // Usar la conexión correcta

const Doctor = sequelizeInstance.define('Doctor', {
    id_doctor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    especialidad: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING, allowNull: false },
    correo_electronico: { type: DataTypes.STRING, allowNull: false },
    horario_atencion: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: 'doctor',
    timestamps: false
});

module.exports = Doctor;
