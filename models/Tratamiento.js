const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db');

const Tratamiento = sequelizeInstance.define('Tratamiento', {
  id_tratamiento: {
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
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_inicio: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  fecha_fin: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'tratamiento',
  timestamps: false
});

module.exports = Tratamiento;
