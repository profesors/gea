-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 17, 2020 at 10:07 PM
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

--
-- Dumping data for table `actions`
--

INSERT INTO `actions` (`idUser`, `idBoard`, `number`, `ts`, `action`) VALUES
(1, 1, 1, '2020-05-17 18:11:25', '<span class=\'name_text\'>Groonan</span> se mueve a 13,4'),
(1, 1, 2, '2020-05-17 18:11:28', '<span class=\'name_text\'>Groonan</span> se mueve a 14,4'),
(1, 1, 3, '2020-05-17 18:11:36', '<span class=\'name_text\'>Groonan</span> se mueve a 13,5'),
(1, 1, 4, '2020-05-17 18:11:38', '<span class=\'name_text\'>Groonan</span> se mueve a 12,4'),
(1, 1, 5, '2020-05-17 18:11:40', '<span class=\'name_text\'>Groonan</span> se mueve a 11,4'),
(1, 1, 6, '2020-05-17 18:11:43', '<span class=\'name_text\'>Groonan</span> se mueve a 14,6'),
(1, 2, 1, '2020-05-17 18:13:36', '<span class=\'name_text\'>Groonan</span> se mueve a 9,25'),
(1, 2, 2, '2020-05-17 18:13:40', '<span class=\'name_text\'>Groonan</span> se mueve a 8,25'),
(1, 2, 3, '2020-05-17 18:18:39', '<span class=\'name_text\'>Groonan</span> se mueve a 8,25'),
(1, 2, 4, '2020-05-17 18:18:45', '<span class=\'name_text\'>Groonan</span> se mueve a 8,25'),
(1, 2, 5, '2020-05-17 18:20:43', '<span class=\'name_text\'>Groonan</span> se mueve a 8,25'),
(1, 2, 6, '2020-05-17 18:20:46', '<span class=\'name_text\'>Groonan</span> se mueve a 8,25'),
(1, 2, 7, '2020-05-17 18:31:26', '<span class=\'name_text\'>Groonan</span> se mueve a 8,25'),
(1, 1, 7, '2020-05-17 18:31:47', '<span class=\'name_text\'>Groonan</span> se mueve a 15,7'),
(1, 2, 8, '2020-05-17 18:32:08', '<span class=\'name_text\'>Groonan</span> se mueve a 8,25'),
(1, 2, 9, '2020-05-17 18:36:06', '<span class=\'name_text\'>Groonan</span> se mueve a 8,25'),
(1, 2, 10, '2020-05-17 18:36:08', '<span class=\'name_text\'>Groonan</span> se mueve a 8,25'),
(1, 2, 11, '2020-05-17 18:36:13', '<span class=\'name_text\'>Connor</span> se mueve a 7,25'),
(1, 1, 8, '2020-05-17 18:36:36', '<span class=\'name_text\'>Groonan</span> se mueve a 14,6'),
(1, 2, 12, '2020-05-17 18:36:56', '<span class=\'name_text\'>Connor</span> se mueve a 5,25'),
(1, 2, 13, '2020-05-17 18:36:59', '<span class=\'name_text\'>Groonan</span> se mueve a 6,25');

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
(1, 'Elias', 'maxhp', 12),
(1, 'Elias', 'hp', 12),
(1, 'Elias', 'ac', 16),
(1, 'Elias', 'light', 0),
(1, 'Elias', 'str', 17),
(1, 'Elias', 'dex', 13),
(1, 'Elias', 'con', 16),
(1, 'Elias', 'int', 8),
(1, 'Elias', 'wis', 8),
(1, 'Elias', 'car', 9),
(1, 'Elias', 'thaco', 1),
(1, 'Elias', 'save1', 12),
(1, 'Elias', 'save2', 13),
(1, 'Elias', 'save3', 14),
(1, 'Elias', 'save4', 15),
(1, 'Elias', 'save5', 16),
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
(2, 'Finn', 'str', 13),
(3, 'Groonan', 'maxhp', 12),
(3, 'Groonan', 'hp', 12),
(3, 'Groonan', 'ac', 16),
(3, 'Groonan', 'light', 0),
(3, 'Groonan', 'str', 17),
(3, 'Groonan', 'dex', 13),
(3, 'Groonan', 'con', 16),
(3, 'Groonan', 'int', 8),
(3, 'Groonan', 'wis', 8),
(3, 'Groonan', 'car', 9),
(3, 'Groonan', 'thaco', 1),
(3, 'Groonan', 'save1', 12),
(3, 'Groonan', 'save2', 13),
(3, 'Groonan', 'save3', 14),
(3, 'Groonan', 'save4', 15),
(3, 'Groonan', 'save5', 16),
(3, 'Connor', 'maxhp', 10),
(3, 'Connor', 'hp', 10),
(3, 'Connor', 'ac', 15),
(3, 'Connor', 'light', 4),
(3, 'Connor', 'str', 16),
(3, 'Connor', 'dex', 14),
(3, 'Connor', 'con', 16),
(3, 'Connor', 'int', 10),
(3, 'Connor', 'wis', 9),
(3, 'Connor', 'car', 9),
(3, 'Connor', 'thaco', 1),
(3, 'Connor', 'save1', 12),
(3, 'Connor', 'save2', 13),
(3, 'Connor', 'save3', 14),
(3, 'Connor', 'save4', 15),
(3, 'Connor', 'save5', 16),
(3, 'Varyarel', 'maxhp', 8),
(3, 'Varyarel', 'hp', 8),
(3, 'Varyarel', 'ac', 17),
(3, 'Varyarel', 'light', 4),
(3, 'Varyarel', 'str', 13),
(3, 'Varyarel', 'dex', 18),
(3, 'Varyarel', 'con', 11),
(3, 'Varyarel', 'int', 14),
(3, 'Varyarel', 'wis', 11),
(3, 'Varyarel', 'car', 10),
(3, 'Varyarel', 'thaco', 1),
(3, 'Varyarel', 'save1', 12),
(3, 'Varyarel', 'save2', 13),
(3, 'Varyarel', 'save3', 13),
(3, 'Varyarel', 'save4', 15),
(3, 'Varyarel', 'save5', 15),
(3, 'Huesito', 'maxhp', 8),
(3, 'Huesito', 'hp', 6),
(3, 'Huesito', 'ac', 13),
(3, 'Huesito', 'thaco', 1),
(3, 'Hueson', 'maxhp', 8),
(3, 'Hueson', 'hp', 6),
(3, 'Hueson', 'ac', 13),
(3, 'Hueson', 'thaco', 1),
(3, 'Huesillo', 'maxhp', 8),
(3, 'Huesillo', 'hp', 6),
(3, 'Huesillo', 'ac', 13),
(3, 'Huesillo', 'thaco', 1),
(3, 'Huesu', 'maxhp', 8),
(3, 'Huesu', 'hp', 6),
(3, 'Huesu', 'ac', 13),
(3, 'Huesu', 'thaco', 1),
(3, 'Eskeletor', 'maxhp', 8),
(3, 'Eskeletor', 'hp', 6),
(3, 'Eskeletor', 'ac', 13),
(3, 'Eskeletor', 'thaco', 1),
(3, 'Femur', 'maxhp', 8),
(3, 'Femur', 'hp', 6),
(3, 'Femur', 'ac', 13),
(3, 'Femur', 'thaco', 1),
(3, 'Cubito', 'maxhp', 8),
(3, 'Cubito', 'hp', 6),
(3, 'Cubito', 'ac', 13),
(3, 'Cubito', 'thaco', 1),
(3, 'Franklin', 'maxhp', 12),
(3, 'Franklin', 'hp', 12),
(3, 'Franklin', 'ac', 12),
(3, 'Franklin', 'thaco', 2),
(3, 'Jefferson', 'maxhp', 12),
(3, 'Jefferson', 'hp', 12),
(3, 'Jefferson', 'ac', 12),
(3, 'Jefferson', 'thaco', 2),
(3, 'Linconln', 'maxhp', 12),
(3, 'Linconln', 'hp', 12),
(3, 'Linconln', 'ac', 12),
(3, 'Linconln', 'thaco', 2),
(3, 'Washington', 'maxhp', 12),
(3, 'Washington', 'hp', 12),
(3, 'Washington', 'ac', 12),
(3, 'Washington', 'thaco', 2),
(3, 'Murdoc', 'maxhp', 12),
(3, 'Murdoc', 'hp', 12),
(3, 'Murdoc', 'ac', 12),
(3, 'Murdoc', 'thaco', 2),
(3, 'Anibal', 'maxhp', 12),
(3, 'Anibal', 'hp', 12),
(3, 'Anibal', 'ac', 12),
(3, 'Anibal', 'thaco', 2),
(3, 'Barracus', 'maxhp', 12),
(3, 'Barracus', 'hp', 12),
(3, 'Barracus', 'ac', 12),
(3, 'Barracus', 'thaco', 2),
(3, 'Fenix', 'maxhp', 12),
(3, 'Fenix', 'hp', 12),
(3, 'Fenix', 'ac', 12),
(3, 'Fenix', 'thaco', 2),
(3, 'Animal', 'maxhp', 30),
(3, 'Animal', 'hp', 30),
(3, 'Animal', 'ac', 18),
(3, 'Animal', 'thaco', 6),
(3, 'de Bellota', 'maxhp', 30),
(3, 'de Bellota', 'hp', 30),
(3, 'de Bellota', 'ac', 18),
(3, 'de Bellota', 'thaco', 6),
(3, 'Alexia', 'maxhp', 20),
(3, 'Alexia', 'hp', 20),
(3, 'Alexia', 'ac', 20),
(3, 'Alexia', 'thaco', 4);

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
(1, 'Baddon Roith 0', 0, 70, 70, 16, 11, 0, 0, '013bg', 0, 99, 0),
(2, 'Baddon Roith 1', 1, 70, 70, 19, 25, 0, 0, '011bg', 0, 221, 3),
(3, 'Baddon Roith 2', 1, 70, 70, 29, 25, 0, 0, '012bg', 0, 184, 1);

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
(1, 1);

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
(2, 'Finn', 1, 'cuchillo', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Groonan', 1, 'hacha 2 manos', 'axe', 'flmde_attack r1 d1d12 ba1,2 bd1', -1, -1),
(3, 'Groonan', 2, 'hacha arrojadiza', 'bow', 'flmde_rangedAttack r1,2,3 d1d8 ba1,3 bd1', 5, 5),
(3, 'Connor', 1, 'espada larga', 'sword', 'flmde_attack r1 d1d8 ba1,2,10 bd1', -1, -1),
(3, 'Connor', 2, 'arco largo', 'bow', 'flmde_rangedAttack r8,15,23 d1d8 ba1,3,10 bd1', 20, 20),
(3, 'Varyarel', 1, 'espada larga', 'sword', 'flmde_attack r1 d1d8 ba1,2 bd1', -1, -1),
(3, 'Varyarel', 2, 'arco largo', 'bow', 'flmde_rangedAttack r5,10,15 d1d8 ba1,3 bd1', 20, 20),
(3, 'Varyarel', 3, 'proyectil mÃ¡gico', 'energy-arrow', 'flmde_mm r13,13,13', 5, 5),
(3, 'Huesito', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Hueson', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Huesillo', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Huesu', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Eskeletor', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Femur', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Cubito', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Franklin', 1, 'garras', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Jefferson', 1, 'garras', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Linconln', 1, 'garras', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Washington', 1, 'garras', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Murdoc', 1, 'garras', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Anibal', 1, 'garras', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Barracus', 1, 'garras', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Fenix', 1, 'garras', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Animal', 1, 'garras', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'de Bellota', 1, 'garras', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(3, 'Alexia', 1, 'toque', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1);

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
(4, 5, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion'),
(5, 6, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion'),
(6, 7, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion'),
(7, 15, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion'),
(8, 16, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion'),
(9, 17, 'pociÃ³n de curaciÃ³n', 2, 1, 'lmde_health_potion');

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

--
-- Dumping data for table `output`
--

INSERT INTO `output` (`idBoard`, `tokenName`, `action_id`, `text`, `sound`) VALUES
(1, 'Groonan', 88, 'bloqueado', NULL);

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
(1, 'Elias', 'movement', 4, 4.00),
(1, 'Elias', 'action', 1, 1.00),
(2, 'Groonan', 'movement', 4, 2.00),
(2, 'Groonan', 'action', 1, 1.00),
(2, 'Connor', 'movement', 4, 2.00),
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
(2, 'Finn', 'action', 1, 1.00),
(3, 'Groonan', 'movement', 4, 4.00),
(3, 'Groonan', 'action', 1, 1.00),
(3, 'Connor', 'movement', 4, 4.00),
(3, 'Connor', 'action', 1, 1.00),
(3, 'Varyarel', 'movement', 5, 5.00),
(3, 'Varyarel', 'action', 1, 1.00),
(3, 'Huesito', 'movement', 3, 3.00),
(3, 'Huesito', 'action', 1, 1.00),
(3, 'Hueson', 'movement', 3, 3.00),
(3, 'Hueson', 'action', 1, 1.00),
(3, 'Huesillo', 'movement', 3, 3.00),
(3, 'Huesillo', 'action', 1, 1.00),
(3, 'Huesu', 'movement', 3, 3.00),
(3, 'Huesu', 'action', 1, 1.00),
(3, 'Eskeletor', 'movement', 3, 3.00),
(3, 'Eskeletor', 'action', 1, 1.00),
(3, 'Femur', 'movement', 3, 3.00),
(3, 'Femur', 'action', 1, 1.00),
(3, 'Cubito', 'movement', 3, 3.00),
(3, 'Cubito', 'action', 1, 1.00),
(3, 'Franklin', 'movement', 3, 3.00),
(3, 'Franklin', 'action', 1, 1.00),
(3, 'Jefferson', 'movement', 3, 3.00),
(3, 'Jefferson', 'action', 1, 1.00),
(3, 'Linconln', 'movement', 3, 3.00),
(3, 'Linconln', 'action', 1, 1.00),
(3, 'Washington', 'movement', 3, 3.00),
(3, 'Washington', 'action', 1, 1.00),
(3, 'Murdoc', 'movement', 3, 3.00),
(3, 'Murdoc', 'action', 1, 1.00),
(3, 'Anibal', 'movement', 3, 3.00),
(3, 'Anibal', 'action', 1, 1.00),
(3, 'Barracus', 'movement', 3, 3.00),
(3, 'Barracus', 'action', 1, 1.00),
(3, 'Fenix', 'movement', 3, 3.00),
(3, 'Fenix', 'action', 1, 1.00),
(3, 'Animal', 'movement', 4, 4.00),
(3, 'Animal', 'action', 1, 1.00),
(3, 'de Bellota', 'movement', 4, 4.00),
(3, 'de Bellota', 'action', 1, 1.00),
(3, 'Alexia', 'movement', 6, 6.00),
(3, 'Alexia', 'action', 1, 1.00);

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
(1, 1, 'Groonan', 'bar', 1, 14, 6, 1, 1, 1, '15,7,15,6,14,6', 1, '005.png', '5px+solid+lime', 1, 99, 1),
(2, 1, 'Connor', 'exp', 1, 13, 6, 1, 1, 1, NULL, 1, '006.png', '5px+solid+lime', 1, 38, 2),
(3, 1, 'Varyarel', 'elf', 1, 12, 6, 1, 1, 1, NULL, 1, '007.png', '5px+solid+lime', 1, 58, 3),
(4, 1, 'Elias', 'elias', 1, 13, 9, 1, 1, 1, NULL, 1, '003.png', '5px+solid+blue', 1, 75, 1),
(5, 2, 'Groonan', 'bar', 1, 6, 25, 1, 1, 1, '8,25,7,25,6,25', 1, '005.png', '5px+solid+lime', 1, 214, 1),
(6, 2, 'Connor', 'exp', 1, 5, 25, 1, 1, 1, '7,25,6,25,5,25', 1, '006.png', '5px+solid+lime', 1, 204, 2),
(7, 2, 'Varyarel', 'elf', 1, 3, 25, 1, 1, 1, NULL, 1, '007.png', '5px+solid+lime', 1, 58, 3),
(8, 2, 'Dexter', 'thief_baddon', 0, 6, 13, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 215, 1),
(9, 2, 'Luca', 'thief_baddon', 0, 7, 20, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 216, 1),
(10, 2, 'Jenson', 'thief_baddon', 0, 6, 16, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 217, 1),
(11, 2, 'Oscar', 'thief_baddon', 0, 4, 16, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 218, 1),
(12, 2, 'Graeme', 'thief_baddon', 0, 4, 18, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 219, 1),
(13, 2, 'Krish', 'thief_baddon', 0, 4, 19, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 220, 1),
(14, 2, 'Finn', 'thief_baddon', 0, 5, 21, 1, 1, 1, NULL, 1, 'thief01.jpg', '5px+solid+red', 0, 221, 1),
(15, 3, 'Groonan', 'bar', 1, 12, 13, 1, 1, 1, NULL, 1, '005.png', '5px+solid+lime', 1, 19, 1),
(16, 3, 'Connor', 'exp', 1, 11, 13, 1, 1, 1, NULL, 1, '006.png', '5px+solid+lime', 1, 38, 2),
(17, 3, 'Varyarel', 'elf', 1, 9, 13, 1, 1, 1, NULL, 1, '007.png', '5px+solid+lime', 1, 58, 3),
(18, 3, 'Huesito', 'skeleton', 0, 7, 24, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 167, 1),
(19, 3, 'Hueson', 'skeleton', 0, 6, 24, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 168, 1),
(20, 3, 'Huesillo', 'skeleton', 0, 5, 24, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 169, 1),
(21, 3, 'Huesu', 'skeleton', 0, 4, 24, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 170, 1),
(22, 3, 'Eskeletor', 'skeleton', 0, 3, 24, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 171, 1),
(23, 3, 'Femur', 'skeleton', 0, 5, 20, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 172, 1),
(24, 3, 'Cubito', 'skeleton', 0, 7, 23, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 173, 1),
(25, 3, 'Franklin', 'zombie', 0, 23, 24, 1, 1, 1, NULL, 1, 'zombie.png', '5px+solid+red', 0, 174, 1),
(26, 3, 'Jefferson', 'zombie', 0, 27, 23, 1, 1, 1, NULL, 1, 'zombie.png', '5px+solid+red', 0, 175, 1),
(27, 3, 'Linconln', 'zombie', 0, 28, 20, 1, 1, 1, NULL, 1, 'zombie.png', '5px+solid+red', 0, 176, 1),
(28, 3, 'Washington', 'zombie', 0, 28, 24, 1, 1, 1, NULL, 1, 'zombie.png', '5px+solid+red', 0, 177, 1),
(29, 3, 'Murdoc', 'zombie', 0, 23, 14, 1, 1, 1, NULL, 1, 'zombie.png', '5px+solid+red', 0, 178, 1),
(30, 3, 'Anibal', 'zombie', 0, 24, 14, 1, 1, 1, NULL, 1, 'zombie.png', '5px+solid+red', 0, 179, 1),
(31, 3, 'Barracus', 'zombie', 0, 27, 14, 1, 1, 1, NULL, 1, 'zombie.png', '5px+solid+red', 0, 180, 1),
(32, 3, 'Fenix', 'zombie', 0, 28, 16, 1, 1, 1, NULL, 1, 'zombie.png', '5px+solid+red', 0, 181, 1),
(33, 3, 'Animal', 'fleshGolem', 0, 20, 11, 1, 1, 1, NULL, 1, 'fleshGolem.png', '5px+solid+red', 0, 182, 1),
(34, 3, 'de Bellota', 'fleshGolem', 0, 20, 3, 1, 1, 1, NULL, 1, 'fleshGolem.png', '5px+solid+red', 0, 183, 1),
(35, 3, 'Alexia', 'spectre', 0, 28, 2, 1, 1, 1, NULL, 1, 'spectre.png', '5px+solid+red', 0, 184, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `lights`
--
ALTER TABLE `lights`
  MODIFY `light_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
