/**
 * @fileoverview Rutas para la gestión de Pacientes en la API del hospital.
 * Define los endpoints para Crear, Leer, Actualizar y Eliminar pacientes.
 * Todas las rutas requieren autenticación JWT.
 */

const express = require('express');
const router = express.Router();
const {
    obtenerPacientes,
    obtenerPacientePorId,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente
} = require('../controllers/pacienteControllers');
const { verifyToken } = require('../middlewares/authMiddleware');

// Aplicar middleware de verificación de token a todas las rutas de este archivo
router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: API para la gestión de pacientes. Permite operaciones CRUD sobre los registros de pacientes.
 */

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Obtener lista de pacientes
 *     description: Retorna un array con todos los pacientes registrados en el sistema. Requiere autenticación.
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: [] # Indica que se requiere autenticación JWT Bearer
 *     responses:
 *       200:
 *         description: Lista de pacientes obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente' # Referencia al schema Paciente definido en config/swagger.js
 *       401:
 *         description: No autorizado. Token inválido, expirado o no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor al intentar obtener los pacientes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', obtenerPacientes);



// --- ADD THIS ROUTE AND SWAGGER DOC ---
/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Obtener un paciente por su ID
 *     description: Retorna los detalles de un paciente específico basado en su ID numérico. Requiere autenticación.
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/pacienteId' # Referencia al parámetro de ID definido en config/swagger.js
 *     responses:
 *       200:
 *         description: Detalles del paciente obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente' # Retorna el objeto Paciente completo
 *       401:
 *         description: No autorizado. Token inválido, expirado o no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Paciente no encontrado con el ID proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor al intentar obtener el paciente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', obtenerPacientePorId); // <-- Define the route
// --- END OF ADDED ROUTE AND SWAGGER DOC ---

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Crear un nuevo paciente
 *     description: Registra un nuevo paciente en la base de datos con la información proporcionada. Requiere autenticación.
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Objeto JSON con los datos del paciente a crear. Campos como nombre, apellido y fecha_nacimiento son usualmente requeridos.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NuevoPaciente' # Referencia al schema para crear paciente
 *     responses:
 *       201:
 *         description: Paciente creado exitosamente. Retorna el objeto del paciente creado, incluyendo su ID asignado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente' # Retorna el paciente completo
 *       400:
 *         description: Datos de entrada inválidos. Puede ser por falta de campos requeridos o formato incorrecto.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autorizado. Token inválido, expirado o no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor al intentar crear el paciente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', crearPaciente);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Actualizar un paciente existente
 *     description: Modifica los datos de un paciente específico identificado por su ID. Requiere autenticación.
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/pacienteId' # Referencia al parámetro de ID definido en config/swagger.js
 *     requestBody:
 *       required: true
 *       description: Objeto JSON con los campos del paciente que se desean actualizar.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NuevoPaciente' # Se puede reutilizar el schema de creación, ya que contiene los campos actualizables.
 *     responses:
 *       200:
 *         description: Paciente actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Paciente actualizado correctamente
 *       400:
 *         description: Datos de entrada inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autorizado. Token inválido, expirado o no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Paciente no encontrado con el ID proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor al intentar actualizar el paciente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', actualizarPaciente);

/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Eliminar un paciente
 *     description: Elimina permanentemente el registro de un paciente específico identificado por su ID. Requiere autenticación. ¡Esta acción es irreversible!
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/pacienteId' # Referencia al parámetro de ID
 *     responses:
 *       200:
 *         description: Paciente eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Paciente eliminado correctamente
 *       401:
 *         description: No autorizado. Token inválido, expirado o no proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Paciente no encontrado con el ID proporcionado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor al intentar eliminar el paciente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', eliminarPaciente);

module.exports = router;