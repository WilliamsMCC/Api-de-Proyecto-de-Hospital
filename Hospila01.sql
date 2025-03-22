-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `citamedica`
--

DROP TABLE IF EXISTS `citamedica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citamedica` (
  `id_cita` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `id_doctor` int NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `motivo_cita` varchar(255) NOT NULL,
  `notas_medicas` text NOT NULL,
  PRIMARY KEY (`id_cita`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_doctor` (`id_doctor`),
  CONSTRAINT `citamedica_ibfk_2` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id_doctor`),
  CONSTRAINT `fk_cita_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citamedica`
--

LOCK TABLES `citamedica` WRITE;
/*!40000 ALTER TABLE `citamedica` DISABLE KEYS */;
INSERT INTO `citamedica` VALUES (1,1,1,'2025-03-24 09:00:00','Chequeo general','Sin observaciones relevantes'),(2,1,1,'2025-03-25 08:00:00','Control de hipertensión','Paciente estable.'),(3,2,2,'2025-03-25 09:30:00','Alergia persistente','Evaluar alternativa a penicilina.'),(4,3,18,'2025-03-25 11:00:00','Dolor en el pecho','Programar electrocardiograma.'),(5,4,19,'2025-03-26 10:00:00','Chequeo neurológico','Seguimiento por trauma craneal.'),(6,5,20,'2025-03-27 13:30:00','Revisión pediátrica','Todo normal.');
/*!40000 ALTER TABLE `citamedica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `id_departamento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `jefe` int NOT NULL,
  PRIMARY KEY (`id_departamento`),
  KEY `jefe` (`jefe`),
  CONSTRAINT `departamento_ibfk_1` FOREIGN KEY (`jefe`) REFERENCES `doctor` (`id_doctor`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (12,'Cardiología','Departamento encargado del tratamiento de enfermedades del corazón',1),(13,'Oncología','Especializado en el tratamiento y estudio del cáncer',2),(14,'Cardiología Infantil','Atiende problemas cardíacos en menores de edad',18),(15,'Neurología','Diagnóstico y tratamiento de trastornos neurológicos',19),(16,'Pediatría','Departamento enfocado en el cuidado de niños',20);
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `id_doctor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `especialidad` varchar(100) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `horario_atencion` varchar(100) NOT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id_doctor`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'Juan','Pérez','Cardiología','12345678','jperez@hospital.com','8:00-16:00',1),(2,'Juana','Paz','Oncología','87654321','jpaz@hospital.com','14:00-22:00',5),(18,'Edgar','Castellanos','Cardiología','98541236','rcastro@hospital.com','08:00 - 16:00',10),(19,'José','René','Neurología','98765421','lmendoza@hospital.com','10:00 - 18:00',11),(20,'Oso','Tedy','Pediatría','98451234','flopez@hospital.com','07:00 - 15:00',12);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enfermera`
--

DROP TABLE IF EXISTS `enfermera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enfermera` (
  `id_enfermera` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `usuario_id` int DEFAULT NULL,
  PRIMARY KEY (`id_enfermera`),
  KEY `fk_usuario_id` (`usuario_id`),
  CONSTRAINT `enfermera_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enfermera`
--

LOCK TABLES `enfermera` WRITE;
/*!40000 ALTER TABLE `enfermera` DISABLE KEYS */;
INSERT INTO `enfermera` VALUES (8,'Ana','López','87654321','alopez@hospital.com',5);
/*!40000 ALTER TABLE `enfermera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicamento`
--

DROP TABLE IF EXISTS `medicamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicamento` (
  `id_medicamento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `dosis` varchar(50) NOT NULL,
  `frecuencia` varchar(50) NOT NULL,
  `id_tratamiento` int NOT NULL,
  PRIMARY KEY (`id_medicamento`),
  KEY `id_tratamiento` (`id_tratamiento`),
  CONSTRAINT `medicamento_ibfk_1` FOREIGN KEY (`id_tratamiento`) REFERENCES `tratamiento` (`id_tratamiento`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicamento`
--

LOCK TABLES `medicamento` WRITE;
/*!40000 ALTER TABLE `medicamento` DISABLE KEYS */;
INSERT INTO `medicamento` VALUES (4,'Paracetamol','Analgésico y antipirético','500mg','Cada 8 horas',1),(5,'Amoxicilina','Antibiótico de amplio espectro','250mg','Cada 12 horas',2),(6,'Loratadina','Antihistamínico','10mg','1 vez al día',3);
/*!40000 ALTER TABLE `medicamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `id_paciente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `apellido` varchar(30) DEFAULT NULL,
  `fecha_nacimiento` datetime NOT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `correo_electronico` varchar(30) DEFAULT NULL,
  `historia_medica` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (1,'María','Fernández','1988-03-12 10:30:00','Colonia Centro, Tegucigalpa','98543210','maria.fernandez@email.com','Historial de hipertensión','2025-03-14 21:42:47','2025-03-14 21:42:47'),(2,'Luis','González','1992-06-25 14:15:00','Barrio El Carmen, San Pedro Sula','98765432','luis.gonzalez@email.com','Alergia a la penicilina','2025-03-14 21:42:47','2025-03-14 21:42:47'),(3,'Elena','Ramírez','2001-09-10 08:45:00','Colonia Las Flores, Comayagua','98123456','elena.ramirez@email.com','Historial de asma','2025-03-14 21:42:47','2025-03-14 21:42:47'),(4,'Carlos','Mejía','1979-12-01 18:20:00','Residencial Los Pinos, Danlí','98432165','carlos.mejia@email.com','Cirugía de rodilla en 2018','2025-03-14 21:42:47','2025-03-14 21:42:47'),(5,'Andrea','Lopez','1995-04-17 22:05:00','Barrio Morazán, La Ceiba','98711234','andrea.lopez@email.com','Ningún historial médico relevante','2025-03-14 21:42:47','2025-03-14 21:42:47');
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tratamiento`
--

DROP TABLE IF EXISTS `tratamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tratamiento` (
  `id_tratamiento` int NOT NULL AUTO_INCREMENT,
  `id_paciente` int NOT NULL,
  `id_doctor` int NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id_tratamiento`),
  KEY `id_paciente` (`id_paciente`),
  KEY `id_doctor` (`id_doctor`),
  CONSTRAINT `tratamiento_ibfk_2` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id_doctor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tratamiento`
--

LOCK TABLES `tratamiento` WRITE;
/*!40000 ALTER TABLE `tratamiento` DISABLE KEYS */;
INSERT INTO `tratamiento` VALUES (1,1,1,'Tratamiento para fiebre con paracetamol','2025-03-24','2025-03-28'),(2,2,2,'Antibiótico para infección','2025-03-23','2025-03-30'),(3,3,18,'Control de alergia estacional','2025-03-25','2025-04-05');
/*!40000 ALTER TABLE `tratamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `contraseña_hash` varchar(100) DEFAULT NULL,
  `rol` enum('admin','doctor','enfermera','paciente') NOT NULL,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `usuarios_chk_1` CHECK ((length(`nombre`) >= 3)),
  CONSTRAINT `usuarios_chk_2` CHECK (regexp_like(`email`,_utf8mb4'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Juan Pérez','jperez@hospital.com','$2b$10$M177PVHzltjwPol4fk4hH.y7DCvkLm3RJPvrq7dPg/S77c4Kk0wJy','doctor','2025-03-15 01:59:12'),(5,'Ana López','alopez@hospital.com','$2b$10$M177PVHzltjwPol4fk4hH.y7DCvkLm3RJPvrq7dPg/S77c4Kk0wJy','enfermera','2025-03-15 02:12:10'),(10,'Edgar Castellano','rcastro@hospital.com','$2b$10$M177PVHzltjwPol4fk4hH.y7DCvkLm3RJPvrq7dPg/S77c4Kk0wJy','doctor','2025-03-15 04:22:26'),(11,'Rene Jose','lmendoza@hospital.com','$2b$10$M177PVHzltjwPol4fk4hH.y7DCvkLm3RJPvrq7dPg/S77c4Kk0wJy','doctor','2025-03-15 04:22:26'),(12,'Oso Tedy','flopez@hospital.com','$2b$10$M177PVHzltjwPol4fk4hH.y7DCvkLm3RJPvrq7dPg/S77c4Kk0wJy','doctor','2025-03-15 04:22:26');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-22 14:46:11
