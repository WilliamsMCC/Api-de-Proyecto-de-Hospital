const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db');
const Tratamiento = require('./Tratamiento'); // importar

const Medicamento = sequelizeInstance.define('Medicamento', {
  id_medicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  dosis: {
    type: DataTypes.STRING(50)
  },
  frecuencia: {
    type: DataTypes.STRING(50)
  },
  id_tratamiento: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'medicamento',
  timestamps: false
});

// ✅ Asociación con Tratamiento
Medicamento.belongsTo(Tratamiento, { foreignKey: 'id_tratamiento' });

module.exports = Medicamento;
