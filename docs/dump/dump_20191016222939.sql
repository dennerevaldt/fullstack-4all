-- Host: localhost
-- ------------------------------------------------------
-- Server version 5.7.27
--
-- Current Database: `dbfullstack4all`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `dbfullstack4all` /*!40100 DEFAULT CHARACTER SET utf8 */;

use `dbfullstack4all`;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20191005142551-create-users.js'),('20191005150406-create-bank-accounts.js'),('20191005170420-create-benefited.js'),('20191005181946-create-bank-transfers.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `benefiteds`
--

DROP TABLE IF EXISTS `benefiteds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `benefiteds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `benefited_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `benefited_id` (`benefited_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `benefiteds_ibfk_1` FOREIGN KEY (`benefited_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `benefiteds_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `benefiteds`
--

LOCK TABLES `benefiteds` WRITE;
/*!40000 ALTER TABLE `benefiteds` DISABLE KEYS */;
/*!40000 ALTER TABLE `benefiteds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_accounts`
--

DROP TABLE IF EXISTS `bank_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(20) NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00',
  `limit` decimal(10,2) NOT NULL DEFAULT '0.00',
  `available_limit` decimal(10,2) NOT NULL DEFAULT '0.00',
  `user_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `identifier` (`identifier`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bank_accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_accounts`
--

LOCK TABLES `bank_accounts` WRITE;
/*!40000 ALTER TABLE `bank_accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_transfers`
--

DROP TABLE IF EXISTS `bank_transfers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank_transfers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` decimal(10,2) NOT NULL,
  `status` enum('success','cancelled') NOT NULL,
  `benefited_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `benefited_id` (`benefited_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bank_transfers_ibfk_1` FOREIGN KEY (`benefited_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bank_transfers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_transfers`
--

LOCK TABLES `bank_transfers` WRITE;
/*!40000 ALTER TABLE `bank_transfers` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_transfers` ENABLE KEYS */;
UNLOCK TABLES;

