const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db');
const Paciente = require('./Paciente');
const Doctor = require('./Doctor');

const Tratamiento = sequelizeInstance.define('Tratamiento', {
    id_tratamiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { // Optional, but good practice
            model: 'pacientes', // Use table name or Paciente model
            key: 'id_paciente'
        }
    },
    id_doctor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { // Optional, but good practice
            model: 'doctor', // Use table name or Doctor model
            key: 'id_doctor'
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false // Assuming description is required
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY, // Use DATEONLY for just the date part
        allowNull: false // Assuming start date is required
    },
    fecha_fin: {
        type: DataTypes.DATEONLY, // Use DATEONLY for just the date part
        allowNull: false // Assuming end date is required
    }
}, {
    tableName: 'tratamiento',
    timestamps: false // Assuming no createdAt/updatedAt columns in the table
});


Tratamiento.belongsTo(Paciente, { foreignKey: 'id_paciente', as: 'paciente' }); // Added alias 'paciente'

Tratamiento.belongsTo(Doctor, { foreignKey: 'id_doctor', as: 'doctor' }); // Added alias 'doctor'


module.exports = Tratamiento;