grupo 4  lista de orden de las tablas 
horden dela tablas
Usuario: 
Paciente:
Doctor:
Enfermera:
Departamento:
Medicamento:
Tratamiento:
CitaMedica:



librerias 
updatePasswords: es un nombre de función, ruta o archivo comúnmente usado en aplicaciones backend para referirse a la acción de actualizar contraseñas de usuarios .

comando usados 
npm run dev: iniciar el server 
curl -X GET http://localhost:3000/datos-seguros -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcnVlYmFfdXN1YXJpbyIsImlhdCI6MTc0MjAxMzQ1NywiZXhwIjoxNzQzMzA5NDU3fQ.pYu_0-4c3dAmvq_3as3RgvNO7vzfM9Ny9NPwLbIwv"
ese es general un token
npm install: instalar toda las librerias 
netstat -ano | findstr :30000 : para ver los puertos si estan o no ocupados
taskkill /PID <PID> /F : serrar el puerto  donde va el parecntecis se pone el numero que sale de pig  taskkill /PID (87893) /F 


carpeta de appy t una brebe intro delo que hace cada una

Controller.js
es donde se colocan las funciones que controlan la lógica de la aplicación , especialmente lo que ocurre cuando alguien hace una petición a la API (como agregar, modificar o eliminar datos).

models.js
Contiene los modelos de datos (estructuras que representan las tablas de la base de datos).
Se usan con ORM como Sequelize para interactuar con la BD.
Ejemplo: Doctor.js, Paciente.js

routes
Define las rutas de tu API (URL disponibles).
Conecte cada URL con su respectivo controlador.

services
Contiene funciones reutilizables o lógica auxiliar .
Por ejemplo: envío de correos, generación de tokens, servicios externos.
config
Archivos de configuración, por ejemplo: conexión a la base de datos.

node_modules
Carpeta generada por npm installcon todos los paquetes/librerías instaladas.
(No se modifica manualmente).

env
Archivo oculto donde guardas variables de entorno sensibles como:
app.js

Este archivo configura tu aplicación Express:
Inicializa Express
Aplica middleware (ej. express.json())
Conecta rutas
Configurar CORS, errores, etc.

index.js
Es el punto de entrada principal .
Importaapp.js
Levanta el servidor conapp.listen(PORT)

package.json
Describe tu proyecto Node.js:
Nombre del proyecto
Guiones
Dependencias instaladas
Punto de inicio ( main)

updatePasswords.js
contener una función para actualizar contraseñas .
(Ejemplo: cifrar una nueva contraseña y guardarla en la base de datos).
