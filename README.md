Hola a todos, sean bienvenidos.
Hoy les vamos a explicar de forma rápida y sencilla el funcionamiento, el contenido y la estructura de nuestra API.
Esta es una API desarrollada especialmente para la gestión de un hospital. Su propósito principal es facilitar el control y seguimiento de los pacientes, citas médicas, doctores y personal de enfermería.
Con esta herramienta, buscamos:
Llevar un mejor control de los ingresos de pacientes.
Asignar citas de forma organizada.
Tener registro claro de qué doctores y enfermeros atienden a cada paciente.
Mejorar la eficiencia del servicio hospitalario.
En resumen, esta API está pensada para optimizar la atención médica y agilizar la administración del hospital.
diagrama de la base de datos
![image](https://github.com/user-attachments/assets/c5428bc9-153a-4d9b-ab91-ae655555a969)

Estructura general del proyecto

/controllers: lógica de cada entidad (usuarios, pacientes…)
/routes: define las rutas de cada módulo
/middlewares: contiene el verifyToken.js
/models: contiene los modelos Sequelize
app.js o index.js: configura y mostrar las rutas
![image](https://github.com/user-attachments/assets/9ce3cdd9-ab2f-4330-b1c7-43cf26854037)

¿Cómo funciona la autenticación con token y como general el token?

 general el token
 
$response = Invoke-WebRequest -Uri http://localhost:3000/usuarios/login -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"email": "jperez@hospital.com", "password": "1234", "rol": "doctor"}' -ContentType "application/json"; $token = ($response.Content | ConvertFrom-Json).token; $token

![image](https://github.com/user-attachments/assets/c2303937-a21f-40ba-8faa-f0562663f0a4)

Se hace una petición POST a /usuarios/login
Se envían email y password
Si los datos son correctos, se genera un token JWT con información del usuario
ejemplo {
  "id": 1,
  "rol": "doctor",
  "email": "jperez@hospital.com"
}
 ¿Cómo se protege una ruta con token
 
 const token = req.headers['authorization']?.split(' ')[1];
jwt.verify(token, SECRET_KEY, (err, user) => {
  if (err) return res.status(403).json({ error: 'Token inválido' });
  req.user = user;
  next();
});

Uso de Postman para probar la API

Método: POST
URL: http://localhost:3000/usuarios/login
Body (JSON):
{
  "email": "jperez@hospital.com",
  "password": "1234"
}
Te devolverá un token
Paso 2: Usar el token
Método: GET
URL: http://localhost:3000/pacientes
Header:
makefile
Copiar
Editar
Authorization: Bearer <token>
![image](https://github.com/user-attachments/assets/cf7a9434-ebe6-42b4-883a-cbbcad8df822)

PUT ACTUALIZADO 

![image](https://github.com/user-attachments/assets/75d19860-f8c2-4c0c-a46e-741602e4cd6b)

DELETE

![image](https://github.com/user-attachments/assets/6cac5360-7b80-4225-9b43-968451b4131a)


Error	Causa	Solución

Token no proporcionado	No agregaste el header Authorization	Agregalo en Postman
Cannot POST /usuarios/login	Ruta mal configurada	Revisá app.use()
Token inválido	El token está vencido o mal copiado	Hacé login otra vez


