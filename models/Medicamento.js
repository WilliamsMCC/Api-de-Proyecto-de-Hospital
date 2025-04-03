const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db');

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
        type: DataTypes.TEXT,
        allowNull: false
    },
    dosis: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    frecuencia: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    id_tratamiento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tratamiento',
            key: 'id_tratamiento'
        }
    }
}, {
    tableName: 'medicamento',
    timestamps: false
});

module.exports = Medicamento;