const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db');
const Tratamiento = require('./Tratamiento'); 

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
        // Keep allowNull based on your original V1 model
        type: DataTypes.TEXT,
        allowNull: false // Or true if it was optional
    },
    dosis: {
        // Keep allowNull based on your original V1 model
        type: DataTypes.STRING(50),
        allowNull: false // Or true if it was optional
    },
    frecuencia: {
        // Keep allowNull based on your original V1 model
        type: DataTypes.STRING(50),
        allowNull: false // Or true if it was optional
    },
    id_tratamiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { // Keep this if it was in your original V1 model
            model: 'tratamiento',
            key: 'id_tratamiento'
        }
    }
}, {
    tableName: 'medicamento',
    timestamps: false
});


Medicamento.belongsTo(Tratamiento, { foreignKey: 'id_tratamiento', as: 'tratamiento' });

module.exports = Medicamento;