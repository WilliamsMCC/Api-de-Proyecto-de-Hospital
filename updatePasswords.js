// updatePasswords.js
const bcrypt = require('bcrypt');
const { sequelizeInstance } = require('./config/db');
const Usuario = require('./models/Usuario');

(async () => {
    try {
        const nuevaClave = '1234';
        const hash = await bcrypt.hash(nuevaClave, 10);

        const [actualizados] = await Usuario.update(
            { contraseña_hash: hash },
            { where: {} } // Todos los usuarios
        );

        console.log(`🔑 Contraseñas actualizadas para ${actualizados} usuarios con clave "1234"`);
        process.exit(0);
    } catch (err) {
        console.error('❌ Error al actualizar contraseñas:', err);
        process.exit(1);
    }
})();
