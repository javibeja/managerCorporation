-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-02-2017 a las 19:37:18
-- Versión del servidor: 10.1.19-MariaDB
-- Versión de PHP: 5.6.28
DROP DATABASE IF EXISTS ManagerCorporation;
CREATE DATABASE ManagerCorporation;
USE ManagerCorporation;

-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-03-2017 a las 13:59:11
-- Versión del servidor: 5.5.27
-- Versión de PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `managercorporation`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `casting`
--

CREATE TABLE IF NOT EXISTS `casting` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FECHA_INICIO` date DEFAULT NULL,
  `FECHA_FIN` date DEFAULT NULL,
  `NOMBRE` varchar(20) NOT NULL,
  `ID_PRODUCCION` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_PRODUCCION` (`ID_PRODUCCION`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `casting`
--

INSERT INTO `casting` (`ID`, `FECHA_INICIO`, `FECHA_FIN`, `NOMBRE`, `ID_PRODUCCION`) VALUES
(1, '2017-03-02', '2017-03-15', 'PruebaCasting', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contrato`
--

CREATE TABLE IF NOT EXISTS `contrato` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FECHA_INICIO` date DEFAULT NULL,
  `FECHA_FIN` date DEFAULT NULL,
  `DNI_ACTOR` varchar(9) DEFAULT NULL,
  `PAPEL` varchar(20) DEFAULT NULL,
  `PAGO` decimal(9,0) DEFAULT NULL,
  `ID_PRODUCCION` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `DNI_ACTOR` (`DNI_ACTOR`),
  KEY `ID_PRODUCCION` (`ID_PRODUCCION`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `contrato`
--

INSERT INTO `contrato` (`ID`, `FECHA_INICIO`, `FECHA_FIN`, `DNI_ACTOR`, `PAPEL`, `PAGO`, `ID_PRODUCCION`) VALUES
(2, '2017-03-02', '2017-03-24', '22222222A', 'Principal', 90, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participa`
--

CREATE TABLE IF NOT EXISTS `participa` (
  `ID_CASTING` int(11) NOT NULL,
  `DNI_ACTOR` varchar(9) NOT NULL,
  PRIMARY KEY (`ID_CASTING`,`DNI_ACTOR`),
  KEY `DNI_ACTOR` (`DNI_ACTOR`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `participa`
--

INSERT INTO `participa` (`ID_CASTING`, `DNI_ACTOR`) VALUES
(1, '11111111A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produccion`
--

CREATE TABLE IF NOT EXISTS `produccion` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(20) NOT NULL,
  `DNI_DIRECTOR` varchar(20) NOT NULL,
  `TIPO_PRODUCCION` varchar(30) DEFAULT NULL,
  `TIPO_OBRA` varchar(20) DEFAULT NULL,
  `FECHA_ESTRENO` date DEFAULT NULL,
  `NUMERO_CAPITULOS` int(20) DEFAULT NULL,
  PRIMARY KEY (`ID`,`NOMBRE`,`DNI_DIRECTOR`),
  KEY `DNI_DIRECTOR` (`DNI_DIRECTOR`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Volcado de datos para la tabla `produccion`
--

INSERT INTO `produccion` (`ID`, `NOMBRE`, `DNI_DIRECTOR`, `TIPO_PRODUCCION`, `TIPO_OBRA`, `FECHA_ESTRENO`, `NUMERO_CAPITULOS`) VALUES
(1, 'Pelicula A', '11111111D', 'Pelicula', 'null', '2012-10-10', NULL),
(2, 'Pelicula E', '22222222D', 'Pelicula', 'null', '2012-02-10', NULL),
(3, 'Serie F', '44444444D', 'Serie', 'null', '0000-00-00', 1123),
(4, 'Pelicula B', '11111111D', 'Pelicula', 'null', '1997-10-08', NULL),
(5, 'Serie B', '11111111D', 'Serie', 'null', '0000-00-00', 8),
(6, 'Obra E', '22222222D', 'Obra', 'Zarzuela', '0000-00-00', NULL),
(7, 'Obra C', '33333333D', 'Obra', 'Comedia', '0000-00-00', NULL),
(8, 'Obra A', '11111111D', 'Obra', 'Infantil', '0000-00-00', NULL),
(9, 'Pelicula F', '44444444D', 'Pelicula', 'null', '2012-01-10', NULL),
(10, 'Pelicula D', '55555555D', 'Pelicula', 'null', '1993-10-10', NULL),
(11, 'Serie D', '55555555D', 'Serie', 'null', '0000-00-00', 10),
(12, 'Serie E', '22222222D', 'Serie', 'null', '0000-00-00', 1000),
(13, 'Pelicula C', '33333333D', 'Pelicula', 'null', '2005-05-02', NULL),
(14, 'Obra D', '55555555D', 'Obra', 'Documental', '0000-00-00', NULL),
(15, 'Serie C', '33333333D', 'Serie', 'null', '0000-00-00', 2),
(16, 'Obra F', '44444444D', 'Obra', 'Sainete', '0000-00-00', NULL),
(17, 'Obra B', '11111111D', 'Obra', 'Tragedia', '0000-00-00', NULL),
(18, 'Serie A', '11111111D', 'Serie', 'null', '0000-00-00', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_obra`
--

CREATE TABLE IF NOT EXISTS `tipos_obra` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `TIPO` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `tipos_obra`
--

INSERT INTO `tipos_obra` (`ID`, `TIPO`) VALUES
(1, 'Tragedia'),
(2, 'Comedia'),
(3, 'Auto sacramental'),
(4, 'Infantil'),
(5, 'Tragicomedia'),
(6, 'Opera'),
(7, 'Drama'),
(8, 'Farsa'),
(9, 'Revista'),
(10, 'Sainete'),
(11, 'Vodevil'),
(12, 'Entremés');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trabajadores`
--

CREATE TABLE IF NOT EXISTS `trabajadores` (
  `DNI` varchar(9) NOT NULL,
  `NOMBRE` varchar(20) DEFAULT NULL,
  `TELEFONO` decimal(9,0) DEFAULT NULL,
  `NACIONALIDAD` varchar(20) DEFAULT NULL,
  `DNI_REPRESENTANTE` varchar(9) DEFAULT NULL,
  `STATUS` varchar(14) DEFAULT NULL,
  `TIPO` varchar(20) NOT NULL,
  PRIMARY KEY (`DNI`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `trabajadores`
--

INSERT INTO `trabajadores` (`DNI`, `NOMBRE`, `TELEFONO`, `NACIONALIDAD`, `DNI_REPRESENTANTE`, `STATUS`, `TIPO`) VALUES
('11111111A', 'Actor A', 636896245, 'Español', '11111111R', 'Desconocido', 'null'),
('11111111D', 'Director A', 611222333, 'Español', 'null', 'null', 'Director'),
('11111111R', 'Representante A', 666126380, 'Español', 'null', 'null', 'Representante'),
('22222222A', 'Actor B', 623579485, 'Aleman', '22222222R', 'Desconocido', 'Actor'),
('22222222D', 'Director B', 622333444, 'Ruso', 'null', 'null', 'Director'),
('22222222R', 'Representante B', 625796154, 'Español', 'null', 'null', 'Representante'),
('33333333A', 'Actor C', 681715415, 'Japonés', '33333333R', 'Desconocido', 'Actor'),
('33333333D', 'Director C', 633444555, 'Alemán', 'null', 'null', 'Director'),
('33333333R', 'Representante C', 668432141, 'Americano', 'null', 'null', 'Representante'),
('44444444A', 'Actor D', 694123116, 'Chino', '44444444R', 'Desconocido', 'Actor'),
('44444444D', 'Director D', 644555666, 'Marroquí', 'null', 'null', 'Director'),
('44444444R', 'Representante D', 611818671, 'Americano', 'null', 'null', 'Representante'),
('55555555A', 'Actor E', 684156111, 'Coreano', '55555555R', 'Desconocido', 'Actor'),
('55555555D', 'Director E', 655666777, 'Americano', 'null', 'null', 'Director'),
('55555555R', 'Representante E', 659571451, 'Americano', 'null', 'null', 'Representante'),
('66666666A', 'Actor F', 684141754, 'Sudamericano', '11111111R', 'Famoso', 'Actor');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `casting`
--
ALTER TABLE `casting`
  ADD CONSTRAINT `casting_ibfk_1` FOREIGN KEY (`ID_PRODUCCION`) REFERENCES `produccion` (`ID`);

--
-- Filtros para la tabla `contrato`
--
ALTER TABLE `contrato`
  ADD CONSTRAINT `contrato_ibfk_1` FOREIGN KEY (`DNI_ACTOR`) REFERENCES `trabajadores` (`DNI`),
  ADD CONSTRAINT `contrato_ibfk_2` FOREIGN KEY (`ID_PRODUCCION`) REFERENCES `produccion` (`ID`);

--
-- Filtros para la tabla `participa`
--
ALTER TABLE `participa`
  ADD CONSTRAINT `participa_ibfk_1` FOREIGN KEY (`ID_CASTING`) REFERENCES `casting` (`ID`),
  ADD CONSTRAINT `participa_ibfk_2` FOREIGN KEY (`DNI_ACTOR`) REFERENCES `trabajadores` (`DNI`);

--
-- Filtros para la tabla `produccion`
--
ALTER TABLE `produccion`
  ADD CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`DNI_DIRECTOR`) REFERENCES `trabajadores` (`DNI`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
