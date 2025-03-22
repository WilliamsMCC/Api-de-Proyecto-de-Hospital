const Doctor = require('../models/Doctor'); // Asegúrate de que la ruta sea correcta

// Agregar un nuevo doctor
const agregarDoctor = async (req, res) => {
    try {
        const nuevoDoctor = await Doctor.create(req.body);
        res.status(201).json(nuevoDoctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un doctor por ID
const eliminarDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Doctor.destroy({ where: { id_doctor: id } });
        if (resultado) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ error: 'Doctor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modificar un doctor por ID
const modificarDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await Doctor.update(req.body, { where: { id_doctor: id } });
        if (resultado) {
            const doctorModificado = await Doctor.findByPk(id);
            res.status(200).json(doctorModificado);
        } else {
            res.status(404).json({ error: 'Doctor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Exportar las funciones
module.exports = {
    agregarDoctor,
    eliminarDoctor,
    modificarDoctor
};
