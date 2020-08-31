-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `idarticles` int NOT NULL AUTO_INCREMENT,
  `idUsers` int NOT NULL,
  `titre` varchar(150) NOT NULL,
  `corps` varchar(1000) NOT NULL,
  `imageUrl` varchar(150) NOT NULL,
  `dateHeure` datetime NOT NULL,
  PRIMARY KEY (`idarticles`),
  KEY `fk_idUsers_idx` (`idUsers`),
  CONSTRAINT `fk_idUsers` FOREIGN KEY (`idUsers`) REFERENCES `users` (`idUsers`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (72,2,'Proin sed rutrum nunc','Nulla in velit hendrerit, ullamcorper est nec, tristique magna. Phasellus sed suscipit augue. Maecenas tristique eros at consequat commodo. Integer dolor ipsum, cursus sit amet purus congue, malesuada venenatis justo. Nam leo risus, elementum eu condimentum nec, cursus quis enim. Vestibulum sed facilisis metus. Suspendisse sed erat quis leo commodo euismod non eu diam. Aliquam dignissim mi nec dui scelerisque convallis. Donec aliquam mi nec nisl elementum ultrices. Donec rhoncus quis orci nec elementum. In hac habitasse platea dictumst. Etiam pretium maximus ipsum, sit amet porta ex viverra ac.','http://localhost:8080/images/image3_zoom_colorbox.jpg1598273792403.jpg','2020-08-24 16:56:32'),(73,1,'Sed quis laoreet nibh','Maecenas sed nulla imperdiet, suscipit urna ac, consectetur purus. In ut sollicitudin neque. Morbi commodo tortor sed quam volutpat, quis aliquam nisi suscipit. Morbi vitae pharetra metus. Donec pellentesque elit id sodales placerat. Praesent molestie varius fringilla. Nam dolor leo, efficitur a odio in, scelerisque ornare enim. Sed non eleifend dui, fermentum mollis felis. Curabitur vitae egestas nulla. Quisque tortor purus, eleifend eu vulputate eu, condimentum lacinia elit. Donec pulvinar, quam ut porta malesuada, tortor dui fermentum erat, ac commodo magna orci sed eros. Etiam nec diam ac eros accumsan gravida in sit amet odio. Praesent non lectus nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi non enim sem. Nam dictum odio vel tellus feugiat, at malesuada felis gravida.','http://localhost:8080/images/lorem-tintin.jpg1598273829281.jpg','2020-08-24 16:57:09'),(105,1,'Class aptent taciti sociosqu ad litora','Aenean ullamcorper tristique libero, efficitur dapibus purus. Pellentesque in ante nec risus congue dignissim vel ut metus. Praesent lobortis in ipsum ac laoreet. Donec ultricies sagittis libero. Aliquam suscipit arcu non arcu pellentesque, vel imperdiet lectus hendrerit. Donec pellentesque auctor ligula sit amet suscipit. Quisque non sagittis tellus. Morbi interdum risus ligula, id fermentum risus faucibus eu. Quisque lorem tortor, dapibus blandit nisi in, ultrices congue quam. Vestibulum semper nibh in felis malesuada mattis. Nulla laoreet vel est quis iaculis.','http://localhost:8080/images/9-4.jpg1598803780276.jpg','2020-08-30 20:09:40'),(106,1,'Fusce elementum luctus massa vel suscipit','Conubia nostra, per inceptos himenaeos. In odio justo, congue ut feugiat non, scelerisque sed orci. Sed ultrices elit in eros cursus congue. Vestibulum eu tristique turpis. Nam pellentesque mattis tristique. Nullam tincidunt nunc scelerisque est imperdiet vestibulum. Aenean imperdiet varius est, a elementum ante. Nunc sagittis dignissim placerat. Vestibulum aliquet, eros vitae pellentesque elementum, lacus nulla maximus odio, et pretium libero neque nec urna. Vestibulum vestibulum ac lacus eget vehicula. Etiam id ante nulla. Nullam et dolor libero.','http://localhost:8080/images/chaton-errant-768x512.jpeg1598803857091.jpg','2020-08-30 20:10:57'),(107,30,'Fusce ut dapibus eros. Fusce dictum','Duis ultrices efficitur mollis. Nunc varius purus arcu, vitae maximus elit bibendum ut. Proin in arcu nec metus eleifend luctus in nec lorem. Sed faucibus semper eros nec malesuada. Integer ornare id lacus ut porta. Sed ac lectus et augue molestie scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non euismod nisl. Phasellus maximus libero nibh, porttitor feugiat magna faucibus vel. Pellentesque aliquam, lectus sit amet gravida viverra, mi urna ultrices est, sed euismod felis urna nec est. Praesent consectetur fringilla lorem, sed lobortis risus blandit vel. Pellentesque efficitur sit amet nisl et blandit. Duis cursus ac arcu id dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae ultricies enim.','http://localhost:8080/images/ob_750daf_l-39-arriere-plan-des-instruments-de-m.jpg1598804180397.jpg','2020-08-30 20:16:20');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `idmessages` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `idarticles` int NOT NULL,
  `idUser` int NOT NULL,
  `dateHeure` datetime NOT NULL,
  PRIMARY KEY (`idmessages`),
  KEY `fk_idArticles_idx` (`idarticles`),
  KEY `fk_IdMessages_idx` (`idUser`),
  CONSTRAINT `fk_idArticles` FOREIGN KEY (`idarticles`) REFERENCES `articles` (`idarticles`) ON DELETE CASCADE,
  CONSTRAINT `fk_Users` FOREIGN KEY (`idUser`) REFERENCES `users` (`idUsers`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (66,'Super article ! merci du partage',72,1,'2020-08-30 19:58:37'),(68,'Bonjour à tous, j\'attends des retours sur mon article ! merci',105,1,'2020-08-30 20:10:08'),(69,'Ok merci',107,2,'2020-08-30 20:24:25'),(70,'Super !! ',105,2,'2020-08-30 20:24:47'),(71,'Haha',106,2,'2020-08-30 20:53:57'),(72,'J\'adore tintin',73,2,'2020-08-30 20:54:13');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idUsers` int NOT NULL AUTO_INCREMENT,
  `LastName` varchar(25) NOT NULL,
  `FirstName` varchar(25) NOT NULL,
  `Mail` varchar(45) NOT NULL,
  `Password` varchar(60) NOT NULL,
  PRIMARY KEY (`idUsers`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'NAGY','Antoine','nagy.antoine@gmail.com','$2b$10$oei1soaXq1cxmoW/y7DOPO7RIWYKORgNVQEAiTQg2yus0jRvDrl36'),(2,'DUPONT','Robert','robert@dupont.com','$2b$10$ktnCdQlEPHIrGO0eYc0/P.kZoasq5kveNZdY.y5GCmxgTFeJpV/sG'),(30,'ADMIN','Groupomania','admin@groupomania.fr','$2b$10$3WwPnf.1J8/yB.jXLcUkTezryyH5E3H7XG/eQASWltxHwkXLhZ7O2'),(52,'DFDSF','Dsfsdf','dsfds@dsf.fds','$2b$10$oei1soaXq1cxmoW/y7DOPO7RIWYKORgNVQEAiTQg2yus0jRvDrl36');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31 14:41:58
