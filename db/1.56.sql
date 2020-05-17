-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 17, 2020 at 05:31 PM
-- Server version: 5.7.30-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gea`
--

-- --------------------------------------------------------

--
-- Table structure for table `actions`
--

CREATE TABLE `actions` (
  `idUser` int(11) NOT NULL,
  `idBoard` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(512) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `animations`
--

CREATE TABLE `animations` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `step` int(11) NOT NULL,
  `delay_after_step` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `src_x` int(11) NOT NULL,
  `src_y` int(11) NOT NULL,
  `target_x` int(11) NOT NULL,
  `target_y` int(11) NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attrs`
--

CREATE TABLE `attrs` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `attr` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `val` int(11) NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `attrs`
--

INSERT INTO `attrs` (`idBoard`, `tokenName`, `attr`, `val`) VALUES
(1, 'Groonan', 'maxhp', 12),
(1, 'Groonan', 'hp', 12),
(1, 'Groonan', 'ac', 16),
(1, 'Groonan', 'light', 0),
(1, 'Groonan', 'str', 17),
(1, 'Groonan', 'dex', 13),
(1, 'Groonan', 'con', 16),
(1, 'Groonan', 'int', 8),
(1, 'Groonan', 'wis', 8),
(1, 'Groonan', 'car', 9),
(1, 'Groonan', 'thaco', 1),
(1, 'Groonan', 'save1', 12),
(1, 'Groonan', 'save2', 13),
(1, 'Groonan', 'save3', 14),
(1, 'Groonan', 'save4', 15),
(1, 'Groonan', 'save5', 16),
(1, 'Connor', 'maxhp', 10),
(1, 'Connor', 'hp', 10),
(1, 'Connor', 'ac', 15),
(1, 'Connor', 'light', 4),
(1, 'Connor', 'str', 16),
(1, 'Connor', 'dex', 14),
(1, 'Connor', 'con', 16),
(1, 'Connor', 'int', 10),
(1, 'Connor', 'wis', 9),
(1, 'Connor', 'car', 9),
(1, 'Connor', 'thaco', 1),
(1, 'Connor', 'save1', 12),
(1, 'Connor', 'save2', 13),
(1, 'Connor', 'save3', 14),
(1, 'Connor', 'save4', 15),
(1, 'Connor', 'save5', 16),
(1, 'Varyarel', 'maxhp', 8),
(1, 'Varyarel', 'hp', 8),
(1, 'Varyarel', 'ac', 17),
(1, 'Varyarel', 'light', 4),
(1, 'Varyarel', 'str', 13),
(1, 'Varyarel', 'dex', 18),
(1, 'Varyarel', 'con', 11),
(1, 'Varyarel', 'int', 14),
(1, 'Varyarel', 'wis', 11),
(1, 'Varyarel', 'car', 10),
(1, 'Varyarel', 'thaco', 1),
(1, 'Varyarel', 'save1', 12),
(1, 'Varyarel', 'save2', 13),
(1, 'Varyarel', 'save3', 13),
(1, 'Varyarel', 'save4', 15),
(1, 'Varyarel', 'save5', 15),
(1, 'Drihkard', 'maxhp', 8),
(1, 'Drihkard', 'hp', 6),
(1, 'Drihkard', 'ac', 10),
(1, 'Drihkard', 'thaco', 1),
(1, 'Braaldirx', 'maxhp', 8),
(1, 'Braaldirx', 'hp', 6),
(1, 'Braaldirx', 'ac', 10),
(1, 'Braaldirx', 'thaco', 1),
(1, 'Fax', 'maxhp', 8),
(1, 'Fax', 'hp', 6),
(1, 'Fax', 'ac', 10),
(1, 'Fax', 'thaco', 1),
(1, 'Prekt', 'maxhp', 8),
(1, 'Prekt', 'hp', 6),
(1, 'Prekt', 'ac', 10),
(1, 'Prekt', 'thaco', 1),
(1, 'esqueleto1', 'maxhp', 8),
(1, 'esqueleto1', 'hp', 8000),
(1, 'esqueleto1', 'ac', 13),
(1, 'esqueleto1', 'thaco', 1),
(1, 'esqueleto2', 'maxhp', 8),
(1, 'esqueleto2', 'hp', 8000),
(1, 'esqueleto2', 'ac', 13),
(1, 'esqueleto2', 'thaco', 1),
(1, 'esqueleto3', 'maxhp', 8),
(1, 'esqueleto3', 'hp', 8000),
(1, 'esqueleto3', 'ac', 13),
(1, 'esqueleto3', 'thaco', 1),
(1, 'esqueleto4', 'maxhp', 8),
(1, 'esqueleto4', 'hp', 8000),
(1, 'esqueleto4', 'ac', 13),
(1, 'esqueleto4', 'thaco', 1),
(1, 'Gran_Alberto', 'maxhp', 21),
(1, 'Gran_Alberto', 'hp', 21),
(1, 'Gran_Alberto', 'ac', 15),
(1, 'Gran_Alberto', 'thaco', 5),
(1, 'Gran_Alberto', 'str', 16),
(1, 'Vrozz', 'maxhp', 8),
(1, 'Vrozz', 'hp', 6),
(1, 'Vrozz', 'ac', 10),
(1, 'Vrozz', 'thaco', 1),
(1, 'Prurd', 'maxhp', 8),
(1, 'Prurd', 'hp', 6),
(1, 'Prurd', 'ac', 10),
(1, 'Prurd', 'thaco', 1),
(1, 'Gnut', 'maxhp', 8),
(1, 'Gnut', 'hp', 6),
(1, 'Gnut', 'ac', 10),
(1, 'Gnut', 'thaco', 1),
(1, 'Roisreq', 'maxhp', 8),
(1, 'Roisreq', 'hp', 6),
(1, 'Roisreq', 'ac', 10),
(1, 'Roisreq', 'thaco', 1),
(1, 'Gnarl', 'maxhp', 8),
(1, 'Gnarl', 'hp', 6),
(1, 'Gnarl', 'ac', 10),
(1, 'Gnarl', 'thaco', 1),
(1, 'Matlf', 'maxhp', 8),
(1, 'Matlf', 'hp', 6),
(1, 'Matlf', 'ac', 10),
(1, 'Matlf', 'thaco', 1),
(1, 'Meladius', 'maxhp', 4),
(1, 'Meladius', 'hp', 4),
(1, 'Meladius', 'ac', 12),
(1, 'Meladius', 'str', 12),
(1, 'Meladius', 'dex', 12),
(1, 'Meladius', 'con', 12),
(1, 'Meladius', 'int', 18),
(1, 'Meladius', 'wis', 12),
(1, 'Meladius', 'car', 12),
(1, 'Meladius', 'thaco', 1),
(1, 'Meladius', 'save1', 12),
(1, 'Meladius', 'save2', 13),
(1, 'Meladius', 'save3', 13),
(1, 'Meladius', 'save4', 15),
(1, 'Meladius', 'save5', 15),
(1, 'Prisionera', 'maxhp', 4),
(1, 'Prisionera', 'hp', 4),
(1, 'Prisionera', 'ac', 12),
(1, 'Prisionera', 'str', 12),
(1, 'Prisionera', 'dex', 12),
(1, 'Prisionera', 'con', 12),
(1, 'Prisionera', 'int', 18),
(1, 'Prisionera', 'wis', 12),
(1, 'Prisionera', 'car', 12),
(1, 'Prisionera', 'thaco', 1),
(1, 'Prisionera', 'save1', 12),
(1, 'Prisionera', 'save2', 13),
(1, 'Prisionera', 'save3', 13),
(1, 'Prisionera', 'save4', 15),
(1, 'Prisionera', 'save5', 15),
(2, 'Groonan', 'maxhp', 12),
(2, 'Groonan', 'hp', 12),
(2, 'Groonan', 'ac', 16),
(2, 'Groonan', 'light', 0),
(2, 'Groonan', 'str', 17),
(2, 'Groonan', 'dex', 13),
(2, 'Groonan', 'con', 16),
(2, 'Groonan', 'int', 8),
(2, 'Groonan', 'wis', 8),
(2, 'Groonan', 'car', 9),
(2, 'Groonan', 'thaco', 1),
(2, 'Groonan', 'save1', 12),
(2, 'Groonan', 'save2', 13),
(2, 'Groonan', 'save3', 14),
(2, 'Groonan', 'save4', 15),
(2, 'Groonan', 'save5', 16),
(2, 'Connor', 'maxhp', 10),
(2, 'Connor', 'hp', 10),
(2, 'Connor', 'ac', 15),
(2, 'Connor', 'light', 4),
(2, 'Connor', 'str', 16),
(2, 'Connor', 'dex', 14),
(2, 'Connor', 'con', 16),
(2, 'Connor', 'int', 10),
(2, 'Connor', 'wis', 9),
(2, 'Connor', 'car', 9),
(2, 'Connor', 'thaco', 1),
(2, 'Connor', 'save1', 12),
(2, 'Connor', 'save2', 13),
(2, 'Connor', 'save3', 14),
(2, 'Connor', 'save4', 15),
(2, 'Connor', 'save5', 16),
(2, 'Varyarel', 'maxhp', 8),
(2, 'Varyarel', 'hp', 8),
(2, 'Varyarel', 'ac', 17),
(2, 'Varyarel', 'light', 4),
(2, 'Varyarel', 'str', 13),
(2, 'Varyarel', 'dex', 18),
(2, 'Varyarel', 'con', 11),
(2, 'Varyarel', 'int', 14),
(2, 'Varyarel', 'wis', 11),
(2, 'Varyarel', 'car', 10),
(2, 'Varyarel', 'thaco', 1),
(2, 'Varyarel', 'save1', 12),
(2, 'Varyarel', 'save2', 13),
(2, 'Varyarel', 'save3', 13),
(2, 'Varyarel', 'save4', 15),
(2, 'Varyarel', 'save5', 15),
(2, 'Dexter', 'maxhp', 8),
(2, 'Dexter', 'hp', 8),
(2, 'Dexter', 'ac', 13),
(2, 'Dexter', 'thaco', 1),
(2, 'Dexter', 'str', 13),
(2, 'Luca', 'maxhp', 8),
(2, 'Luca', 'hp', 8),
(2, 'Luca', 'ac', 13),
(2, 'Luca', 'thaco', 1),
(2, 'Luca', 'str', 13),
(2, 'Jenson', 'maxhp', 8),
(2, 'Jenson', 'hp', 8),
(2, 'Jenson', 'ac', 13),
(2, 'Jenson', 'thaco', 1),
(2, 'Jenson', 'str', 13),
(2, 'Oscar', 'maxhp', 8),
(2, 'Oscar', 'hp', 8),
(2, 'Oscar', 'ac', 13),
(2, 'Oscar', 'thaco', 1),
(2, 'Oscar', 'str', 13),
(2, 'Graeme', 'maxhp', 8),
(2, 'Graeme', 'hp', 8),
(2, 'Graeme', 'ac', 13),
(2, 'Graeme', 'thaco', 1),
(2, 'Graeme', 'str', 13),
(2, 'Krish', 'maxhp', 8),
(2, 'Krish', 'hp', 8),
(2, 'Krish', 'ac', 13),
(2, 'Krish', 'thaco', 1),
(2, 'Krish', 'str', 13),
(2, 'Finn', 'maxhp', 8),
(2, 'Finn', 'hp', 8),
(2, 'Finn', 'ac', 13),
(2, 'Finn', 'thaco', 1),
(2, 'Finn', 'str', 13);

-- --------------------------------------------------------

--
-- Table structure for table `boards`
--

CREATE TABLE `boards` (
  `id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `lights` int(11) NOT NULL DEFAULT '0',
  `tilew` int(11) NOT NULL,
  `tileh` int(11) NOT NULL,
  `ntilesw` int(11) NOT NULL,
  `ntilesh` int(11) NOT NULL,
  `offsetx` smallint(6) NOT NULL DEFAULT '0',
  `offsety` smallint(6) NOT NULL DEFAULT '0',
  `bg` varchar(64) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `drawGrid` tinyint(4) NOT NULL DEFAULT '0',
  `lastActionId` int(11) NOT NULL,
  `turn` int(11) DEFAULT '1'
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `boards`
--

INSERT INTO `boards` (`id`, `name`, `lights`, `tilew`, `tileh`, `ntilesw`, `ntilesh`, `offsetx`, `offsety`, `bg`, `drawGrid`, `lastActionId`, `turn`) VALUES
(1, 'Medusa', 1, 70, 70, 25, 25, 0, 0, '010bg', 0, 194, 1),
(2, 'Baddon Roith 1', 1, 70, 70, 19, 25, 0, 0, '011bg', 0, 114, 1);

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `game_id` int(11) NOT NULL,
  `board_id` int(11) NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`game_id`, `board_id`) VALUES
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `guidelines`
--

CREATE TABLE `guidelines` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `guideNumber` tinyint(4) NOT NULL,
  `name` varchar(128) COLLATE utf8_spanish2_ci NOT NULL,
  `icon` varchar(64) COLLATE utf8_spanish2_ci NOT NULL,
  `guideAction` varchar(120) COLLATE utf8_spanish2_ci NOT NULL,
  `n` int(11) DEFAULT NULL COMMENT 'Ammunition',
  `maxn` int(11) DEFAULT NULL COMMENT 'Max ammunition'
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `guidelines`
--

INSERT INTO `guidelines` (`idBoard`, `tokenName`, `guideNumber`, `name`, `icon`, `guideAction`, `n`, `maxn`) VALUES
(1, 'Groonan', 1, 'hacha 2 manos', 'axe', 'flmde_attack r1 d1d12 ba1,2 bd1', -1, -1),
(1, 'Groonan', 2, 'hacha arrojadiza', 'bow', 'flmde_rangedAttack r1,2,3 d1d8 ba1,3 bd1', 5, 5),
(1, 'Connor', 1, 'espada larga', 'sword', 'flmde_attack r1 d1d8 ba1,2,10 bd1', -1, -1),
(1, 'Connor', 2, 'arco largo', 'bow', 'flmde_rangedAttack r8,15,23 d1d8 ba1,3,10 bd1', 20, 20),
(1, 'Varyarel', 1, 'espada larga', 'sword', 'flmde_attack r1 d1d8 ba1,2 bd1', -1, -1),
(1, 'Varyarel', 2, 'arco largo', 'bow', 'flmde_rangedAttack r5,10,15 d1d8 ba1,3 bd1', 20, 20),
(1, 'Varyarel', 3, 'proyectil mÃ¡gico', 'energy-arrow', 'flmde_mm r13,13,13', 5, 5),
(1, 'Drihkard', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Drihkard', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Braaldirx', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Braaldirx', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Fax', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Fax', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Prekt', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Prekt', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'esqueleto1', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'esqueleto2', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'esqueleto3', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'esqueleto4', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Gran_Alberto', 1, 'garrote', 'sword', 'flmde_attack r2 d1d12 ba1 bd1', -1, -1),
(1, 'Vrozz', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Vrozz', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Prurd', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Prurd', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Gnut', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Gnut', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Roisreq', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Roisreq', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Gnarl', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Gnarl', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Matlf', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Matlf', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Meladius', 1, 'bastÃ³n', 'sword', 'flmde_attack r1 d1d8 ba1,2 bd1', -1, -1),
(1, 'Meladius', 2, 'proyectil mÃ¡gico', 'energy-arrow', 'flmde_mm r13,13,13 d1d6', 5, 5),
(1, 'Prisionera', 1, 'sin arma', 'sword', 'flmde_attack r1 d1d2 ba1,2 bd1', -1, -1),
(2, 'Groonan', 1, 'hacha 2 manos', 'axe', 'flmde_attack r1 d1d12 ba1,2 bd1', -1, -1),
(2, 'Groonan', 2, 'hacha arrojadiza', 'bow', 'flmde_rangedAttack r1,2,3 d1d8 ba1,3 bd1', 5, 5),
(2, 'Connor', 1, 'espada larga', 'sword', 'flmde_attack r1 d1d8 ba1,2,10 bd1', -1, -1),
(2, 'Connor', 2, 'arco largo', 'bow', 'flmde_rangedAttack r8,15,23 d1d8 ba1,3,10 bd1', 20, 20),
(2, 'Varyarel', 1, 'espada larga', 'sword', 'flmde_attack r1 d1d8 ba1,2 bd1', -1, -1),
(2, 'Varyarel', 2, 'arco largo', 'bow', 'flmde_rangedAttack r5,10,15 d1d8 ba1,3 bd1', 20, 20),
(2, 'Varyarel', 3, 'proyectil mÃ¡gico', 'energy-arrow', 'flmde_mm r13,13,13', 5, 5),
(2, 'Dexter', 1, 'cuchillo', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(2, 'Luca', 1, 'cuchillo', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(2, 'Jenson', 1, 'cuchillo', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(2, 'Oscar', 1, 'cuchillo', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(2, 'Graeme', 1, 'cuchillo', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(2, 'Krish', 1, 'cuchillo', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(2, 'Finn', 1, 'cuchillo', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1);

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `token_id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `n` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  `function` varchar(32) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `token_id`, `name`, `n`, `position`, `function`) VALUES
(1, 1, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion'),
(2, 2, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion'),
(3, 3, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion'),
(4, 21, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion'),
(5, 22, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion'),
(6, 23, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion');

-- --------------------------------------------------------

--
-- Table structure for table `lights`
--

CREATE TABLE `lights` (
  `light_id` int(11) NOT NULL,
  `intensity` int(11) NOT NULL,
  `board_id` int(11) DEFAULT NULL,
  `tilex` int(11) DEFAULT NULL,
  `tiley` int(11) DEFAULT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `lights`
--

INSERT INTO `lights` (`light_id`, `intensity`, `board_id`, `tilex`, `tiley`) VALUES
(1, 8, 2, 9, 25),
(2, 8, 2, 13, 24),
(3, 6, 2, 4, 20),
(4, 4, 2, 11, 14);

-- --------------------------------------------------------

--
-- Table structure for table `mods`
--

CREATE TABLE `mods` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `attr` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `status` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `desc` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `mod` int(11) NOT NULL,
  `last_turn` int(11) NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `output`
--

CREATE TABLE `output` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `action_id` int(11) NOT NULL,
  `text` varchar(64) COLLATE utf8_spanish2_ci NOT NULL,
  `sound` varchar(32) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

CREATE TABLE `steps` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `type` varchar(32) COLLATE utf8_spanish2_ci NOT NULL COMMENT 'Type: action, movement, standard action, ...',
  `max` int(11) NOT NULL,
  `current` float(11,2) NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `steps`
--

INSERT INTO `steps` (`idBoard`, `tokenName`, `type`, `max`, `current`) VALUES
(1, 'Groonan', 'movement', 4, 4.00),
(1, 'Groonan', 'action', 1, 1.00),
(1, 'Connor', 'movement', 4, 4.00),
(1, 'Connor', 'action', 1, 1.00),
(1, 'Varyarel', 'movement', 5, 5.00),
(1, 'Varyarel', 'action', 1, 1.00),
(1, 'Drihkard', 'movement', 4, 4.00),
(1, 'Drihkard', 'action', 1, 1.00),
(1, 'Braaldirx', 'movement', 4, 4.00),
(1, 'Braaldirx', 'action', 1, 1.00),
(1, 'Fax', 'movement', 4, 4.00),
(1, 'Fax', 'action', 1, 1.00),
(1, 'Prekt', 'movement', 4, 4.00),
(1, 'Prekt', 'action', 1, 1.00),
(1, 'esqueleto1', 'movement', 3, 3.00),
(1, 'esqueleto1', 'action', 1, 1.00),
(1, 'esqueleto2', 'movement', 3, 3.00),
(1, 'esqueleto2', 'action', 1, 1.00),
(1, 'esqueleto3', 'movement', 3, 3.00),
(1, 'esqueleto3', 'action', 1, 1.00),
(1, 'esqueleto4', 'movement', 3, 3.00),
(1, 'esqueleto4', 'action', 1, 1.00),
(1, 'Gran_Alberto', 'movement', 4, 4.00),
(1, 'Gran_Alberto', 'action', 1, 1.00),
(1, 'Vrozz', 'movement', 4, 4.00),
(1, 'Vrozz', 'action', 1, 1.00),
(1, 'Prurd', 'movement', 4, 4.00),
(1, 'Prurd', 'action', 1, 1.00),
(1, 'Gnut', 'movement', 4, 4.00),
(1, 'Gnut', 'action', 1, 1.00),
(1, 'Roisreq', 'movement', 4, 4.00),
(1, 'Roisreq', 'action', 1, 1.00),
(1, 'Gnarl', 'movement', 4, 4.00),
(1, 'Gnarl', 'action', 1, 1.00),
(1, 'Matlf', 'movement', 4, 4.00),
(1, 'Matlf', 'action', 1, 1.00),
(1, 'Meladius', 'movement', 4, 4.00),
(1, 'Meladius', 'action', 1, 1.00),
(1, 'Prisionera', 'movement', 4, 4.00),
(1, 'Prisionera', 'action', 1, 1.00),
(2, 'Groonan', 'movement', 4, 4.00),
(2, 'Groonan', 'action', 1, 1.00),
(2, 'Connor', 'movement', 4, 4.00),
(2, 'Connor', 'action', 1, 1.00),
(2, 'Varyarel', 'movement', 5, 5.00),
(2, 'Varyarel', 'action', 1, 1.00),
(2, 'Dexter', 'movement', 4, 4.00),
(2, 'Dexter', 'action', 1, 1.00),
(2, 'Luca', 'movement', 4, 4.00),
(2, 'Luca', 'action', 1, 1.00),
(2, 'Jenson', 'movement', 4, 4.00),
(2, 'Jenson', 'action', 1, 1.00),
(2, 'Oscar', 'movement', 4, 4.00),
(2, 'Oscar', 'action', 1, 1.00),
(2, 'Graeme', 'movement', 4, 4.00),
(2, 'Graeme', 'action', 1, 1.00),
(2, 'Krish', 'movement', 4, 4.00),
(2, 'Krish', 'action', 1, 1.00),
(2, 'Finn', 'movement', 4, 4.00),
(2, 'Finn', 'action', 1, 1.00);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `token_id` int(11) NOT NULL,
  `idBoard` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `file` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `pc` int(11) NOT NULL DEFAULT '0',
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `z` int(11) NOT NULL,
  `w` tinyint(4) NOT NULL DEFAULT '1',
  `h` tinyint(4) NOT NULL DEFAULT '1',
  `path` varchar(512) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `step` float NOT NULL,
  `img` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `border` varchar(32) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `opacity` int(11) NOT NULL DEFAULT '0',
  `actionId` int(11) NOT NULL,
  `defaultGuideline` int(11) NOT NULL DEFAULT '0'
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`token_id`, `idBoard`, `name`, `file`, `pc`, `x`, `y`, `z`, `w`, `h`, `path`, `step`, `img`, `border`, `opacity`, `actionId`, `defaultGuideline`) VALUES
(1, 1, 'Groonan', 'bar', 1, 14, 23, 1, 1, 1, NULL, 1, '005.png', '5px+solid+lime', 1, 19, 1),
(2, 1, 'Connor', 'exp', 1, 14, 24, 1, 1, 1, NULL, 1, '006.png', '5px+solid+lime', 1, 38, 2),
(3, 1, 'Varyarel', 'elf', 1, 14, 25, 1, 1, 1, NULL, 1, '007.png', '5px+solid+lime', 1, 58, 3),
(4, 1, 'Drihkard', 'goblin', 0, 16, 9, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 65, 2),
(5, 1, 'Braaldirx', 'goblin', 0, 8, 14, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 72, 1),
(6, 1, 'Fax', 'goblin', 0, 17, 8, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 79, 1),
(7, 1, 'Prekt', 'goblin', 0, 19, 18, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 86, 2),
(8, 1, 'esqueleto1', 'skeleton', 0, 5, 4, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 92, 1),
(9, 1, 'esqueleto2', 'skeleton', 0, 3, 3, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 98, 1),
(10, 1, 'esqueleto3', 'skeleton', 0, 3, 7, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 104, 1),
(11, 1, 'esqueleto4', 'skeleton', 0, 5, 7, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 110, 1),
(12, 1, 'Gran_Alberto', 'ogre', 0, 11, 17, 1, 2, 2, NULL, 1, 'ogre.jpg', '5px+solid+red', 0, 117, 1),
(13, 1, 'Vrozz', 'goblin', 0, 6, 20, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 124, 1),
(14, 1, 'Prurd', 'goblin', 0, 5, 20, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 131, 1),
(15, 1, 'Gnut', 'goblin', 0, 2, 20, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 138, 2),
(16, 1, 'Roisreq', 'goblin', 0, 2, 24, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 145, 2),
(17, 1, 'Gnarl', 'goblin', 0, 22, 8, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 152, 2),
(18, 1, 'Matlf', 'goblin', 0, 14, 21, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 159, 2),
(19, 1, 'Meladius', 'meladius', 0, 12, 2, 1, 1, 1, NULL, 1, 'd.jpg', '5px+solid+red', 0, 177, 2),
(20, 1, 'Prisionera', 'prisionera', 0, 16, 2, 1, 1, 1, NULL, 1, '011.png', '5px+dashed+lime', 0, 194, 1),
(21, 2, 'Groonan', 'bar', 1, 6, 25, 1, 1, 1, NULL, 1, '005.png', '5px+solid+lime', 1, 19, 1),
(22, 2, 'Connor', 'exp', 1, 5, 25, 1, 1, 1, NULL, 1, '006.png', '5px+solid+lime', 1, 38, 2),
(23, 2, 'Varyarel', 'elf', 1, 3, 25, 1, 1, 1, NULL, 1, '007.png', '5px+solid+lime', 1, 58, 3),
(24, 2, 'Dexter', 'thief_baddon', 0, 6, 13, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 108, 1),
(25, 2, 'Luca', 'thief_baddon', 0, 7, 20, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 109, 1),
(26, 2, 'Jenson', 'thief_baddon', 0, 6, 16, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 110, 1),
(27, 2, 'Oscar', 'thief_baddon', 0, 4, 16, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 111, 1),
(28, 2, 'Graeme', 'thief_baddon', 0, 4, 18, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 112, 1),
(29, 2, 'Krish', 'thief_baddon', 0, 4, 19, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 113, 1),
(30, 2, 'Finn', 'thief_baddon', 0, 5, 21, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 114, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`idUser`,`idBoard`,`number`);

--
-- Indexes for table `attrs`
--
ALTER TABLE `attrs`
  ADD PRIMARY KEY (`idBoard`,`tokenName`,`attr`);

--
-- Indexes for table `boards`
--
ALTER TABLE `boards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`game_id`);

--
-- Indexes for table `guidelines`
--
ALTER TABLE `guidelines`
  ADD PRIMARY KEY (`idBoard`,`tokenName`,`guideNumber`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`);

--
-- Indexes for table `lights`
--
ALTER TABLE `lights`
  ADD PRIMARY KEY (`light_id`);

--
-- Indexes for table `mods`
--
ALTER TABLE `mods`
  ADD PRIMARY KEY (`idBoard`,`tokenName`,`attr`,`status`);

--
-- Indexes for table `output`
--
ALTER TABLE `output`
  ADD PRIMARY KEY (`idBoard`,`tokenName`);

--
-- Indexes for table `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`idBoard`,`tokenName`,`type`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`token_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boards`
--
ALTER TABLE `boards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `lights`
--
ALTER TABLE `lights`
  MODIFY `light_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
