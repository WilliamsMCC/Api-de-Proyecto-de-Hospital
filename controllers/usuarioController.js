const { sequelizeInstance } = require('../config/db');
const Usuario = require('../models/Usuario');

const usuarioController = {
    // Crear usuario
    create: async (req, res) => {
        try {
            const usuario = await Usuario.create(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Obtener todos los usuarios
    getAll: async (req, res) => {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener usuario por ID
    getById: async (req, res) => {
        try {
            const usuario = await Usuario.findByPk(req.params.id);
            usuario ? res.json(usuario) : res.status(404).json({ error: 'Usuario no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar usuario
    update: async (req, res) => {
        try {
            const [updated] = await Usuario.update(req.body, {
                where: { id: req.params.id }
            });
            updated ? res.json({ message: 'Usuario actualizado' }) : res.status(404).json({ error: 'Usuario no encontrado' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar usuario
    delete: async (req, res) => {
        try {
            const deleted = await Usuario.destroy({
                where: { id: req.params.id }
            });
            deleted ? res.json({ message: 'Usuario eliminado' }) : res.status(404).json({ error: 'Usuario no encontrado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = usuarioController;