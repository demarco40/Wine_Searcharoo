CREATE DATABASE  IF NOT EXISTS `wine_search` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `wine_search`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: wine_search
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `List`
--

DROP TABLE IF EXISTS `List`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `List` (
  `wine_ID` int(11) NOT NULL AUTO_INCREMENT,
  `wish_list` tinyint(4) DEFAULT NULL,
  `inventory_list` tinyint(4) DEFAULT NULL,
  `wishQty` int(11) DEFAULT NULL,
  `invQty` int(11) DEFAULT NULL,
  PRIMARY KEY (`wine_ID`),
  KEY `wine_id_idx` (`wine_ID`),
  CONSTRAINT `wine_id` FOREIGN KEY (`wine_ID`) REFERENCES `Wine` (`wineID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `List`
--

LOCK TABLES `List` WRITE;
/*!40000 ALTER TABLE `List` DISABLE KEYS */;
/*!40000 ALTER TABLE `List` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Wine`
--

DROP TABLE IF EXISTS `Wine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Wine` (
  `wineID` int(11) NOT NULL AUTO_INCREMENT,
  `wineApiCode` varchar(200) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `region` varchar(150) DEFAULT NULL,
  `winery` varchar(150) DEFAULT NULL,
  `grape_varietal` varchar(100) DEFAULT NULL,
  `price` varchar(25) DEFAULT NULL,
  `vintage` varchar(100) DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `favorite` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`wineID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Wine`
--

LOCK TABLES `Wine` WRITE;
/*!40000 ALTER TABLE `Wine` DISABLE KEYS */;
/*!40000 ALTER TABLE `Wine` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-20 12:21:10
