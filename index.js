"use strict";

require('dotenv').config();
const db = require('./config/db');
const app = require('./app');

const PORT = process.env.APP_PORT || 3000; // Usar APP_PORT desde .env
const HOST = process.env.HOST || 'localhost'; // Definir el host

db.sequelizeInstance.sync()
    .then(() => {
        if (typeof app.listen !== 'function') {
            console.error('❌ Error: app.listen no es una función. Verifica la exportación en app.js.');
            process.exit(1);
        }

        app.listen(PORT, () => {
            console.log(`🚀 Servidor escuchando en: http://${HOST}:${PORT}`);
            console.log('✅ Servidor iniciado correctamente.');
        });
    })
    .catch(error => {
        console.error('❌ Error al sincronizar la base de datos:', error);
    });
