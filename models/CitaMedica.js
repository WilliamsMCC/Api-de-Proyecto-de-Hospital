const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db');

// Requiere los modelos relacionados
const Paciente = require('./Paciente');
const Doctor = require('./Doctor');

const CitaMedica = sequelizeInstance.define('CitaMedica', {
  id_cita: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_paciente: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_doctor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo_cita: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notas_medicas: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'citamedica',
  timestamps: false
});

// ✅ Asociaciones
CitaMedica.belongsTo(Paciente, { foreignKey: 'id_paciente' });
CitaMedica.belongsTo(Doctor, { foreignKey: 'id_doctor' });

module.exports = CitaMedica;
