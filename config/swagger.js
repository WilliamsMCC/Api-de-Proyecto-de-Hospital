const swaggerJsdoc = require('swagger-jsdoc');

// Basic Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Hospital API',
    version: '1.0.0',
    description: 'API documentation for the Hospital Management System',
  },
  servers: [
    {
      url: `http://localhost:${process.env.APP_PORT || 3000}`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT Bearer token **_only_**',
      },
    },
    parameters: {
      pacienteId: {
        in: 'path',
        name: 'id',
        schema: { type: 'integer' },
        required: true,
        description: 'ID numérico del paciente',
        // Add example directly to the parameter schema if desired
        example: 1 // Example for the path parameter itself
      }
    },
    schemas: {
      // Schema for Paciente (as returned by GET/POST)
      Paciente: {
        type: 'object',
        properties: {
          id_paciente: { type: 'integer', description: 'ID único del paciente', example: 1 },
          nombre: { type: 'string', description: 'Nombre del paciente', example: 'Juan' },
          apellido: { type: 'string', description: 'Apellido del paciente', example: 'Pérez' },
          fecha_nacimiento: { type: 'string', format: 'date-time', description: 'Fecha de nacimiento', example: '1990-05-15T00:00:00.000Z' },
          direccion: { type: 'string', description: 'Dirección del paciente', example: 'Calle Falsa 123' },
          telefono: { type: 'string', description: 'Número de teléfono', example: '555-1234' },
          correo_electronico: { type: 'string', format: 'email', description: 'Correo electrónico', example: 'juan.perez@email.com' },
          historia_medica: { type: 'string', description: 'Historial médico relevante', example: 'Alergia a la penicilina.' },
          createdAt: { type: 'string', format: 'date-time', description: 'Fecha de creación', example: '2023-10-27T10:00:00.000Z' },
          updatedAt: { type: 'string', format: 'date-time', description: 'Fecha de última actualización', example: '2023-10-27T10:05:00.000Z' }
        },
        // Add a top-level example for the whole Paciente object
        example: {
            id_paciente: 1,
            nombre: "Juan",
            apellido: "Pérez",
            fecha_nacimiento: "1990-05-15T00:00:00.000Z",
            direccion: "Calle Falsa 123",
            telefono: "555-1234",
            correo_electronico: "juan.perez@email.com",
            historia_medica: "Alergia a la penicilina.",
            createdAt: "2023-10-27T10:00:00.000Z",
            updatedAt: "2023-10-27T10:05:00.000Z"
        }
      },
      // Schema for creating/updating a Paciente (used in POST/PUT request body)
      NuevoPaciente: {
        type: 'object',
        required: ['nombre', 'apellido', 'fecha_nacimiento'],
        properties: {
           nombre: { type: 'string', description: "Nombre del paciente", example: 'Ana' },
           apellido: { type: 'string', description: "Apellido del paciente", example: 'Gomez' },
           fecha_nacimiento: { type: 'string', format: 'date', description: "Fecha de nacimiento (YYYY-MM-DD)", example: '1995-02-20' },
           direccion: { type: 'string', description: "Dirección", example: 'Av. Siempreviva 742' },
           telefono: { type: 'string', description: "Teléfono de contacto", example: '555-5678' },
           correo_electronico: { type: 'string', format: 'email', description: "Correo electrónico", example: 'ana.gomez@email.com' },
           historia_medica: { type: 'string', description: "Historial médico", example: 'Ninguna conocida.' },
        },
        // Add a top-level example for the request body schema
        example: {
            nombre: "Ana",
            apellido: "Gomez",
            fecha_nacimiento: "1995-02-20",
            direccion: "Av. Siempreviva 742",
            telefono: "555-5678",
            correo_electronico: "ana.gomez@email.com",
            historia_medica: "Ninguna conocida."
        }
      },
      // Schema for Login Request
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'doctor@hospital.com' },
          password: { type: 'string', format: 'password', example: 'password123' },
          rol: { type: 'string', enum: ['admin', 'doctor', 'enfermera'], description: 'Opcional: Rol específico para login', example: 'doctor' }
        },
        example: { // Top-level example for the schema
            email: "doctor@hospital.com",
            password: "password123"
        }
      },
      // Schema for Login Response
      LoginResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', example: '✅ Login exitoso' },
          token: { type: 'string', description: 'JWT Bearer Token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoiQWRtaW4gVXNlciIsImVtYWlsIjoidGVzdEBl...' },
          usuario: {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 5 },
              rol: { type: 'string', enum: ['admin', 'doctor', 'enfermera'], example: 'doctor' },
              email: { type: 'string', format: 'email', example: 'doctor@hospital.com' },
              nombre: { type: 'string', example: 'Dr. House' }
            }
          }
        },
        example: { // Top-level example for the schema
            message: "✅ Login exitoso",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibm9tYnJlIjoiRHIuIEhvdXNlIiwiZW1haWwiOiJkb2N0b3JAaG9zcGl0YWwuY29tIiwicm9sIjoiZG9jdG9yIiwiaWF0IjoxNjcwMDAwMDAwLCJleHAiOjE2NzAwMDM2MDB9.abcdef12345",
            usuario: {
                id: 5,
                rol: "doctor",
                email: "doctor@hospital.com",
                nombre: "Dr. House"
            }
        }
      },
      // Generic Error Response Schema
      ErrorResponse: {
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Mensaje de error descriptivo' }
        },
        // Example for the ErrorResponse schema itself
        example: { message: '❌ Recurso no encontrado' }
      }
    },
  },
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;