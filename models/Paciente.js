const { DataTypes } = require('sequelize');
const { sequelizeInstance } = require('../config/db'); // Importar correctamente la conexión

const Paciente = sequelizeInstance.define('Pacientes', {
    id_paciente: {
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
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    correo_electronico: {
        type: DataTypes.STRING
    },
    historia_medica: {
        type: DataTypes.TEXT
    }
});

module.exports = Paciente;
