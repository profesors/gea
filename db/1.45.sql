-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 07, 2020 at 12:52 PM
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
(1, 1, 1, '2020-05-07 09:09:07', '<span class=\'name_text\'>Groonan</span> se mueve a 11,22'),
(1, 1, 2, '2020-05-07 09:14:14', '<span class=\'name_text\'>Gnut</span> se mueve a 4,22'),
(1, 1, 3, '2020-05-07 09:15:04', '<span class=\"name_text\">Gnut</span> ataca a <span class=\"name_text\">Groonan</span> con arco corto<span class=\"attack_text\">Ataque&nbsp;<span class=\"red\">16</span>=15(1d20) +1(gac0)</span><span class=\"dmg_text\">Daño&nbsp;<span class=\"red\">1</span>=1(1d6)</span> munición arco corto 8'),
(1, 1, 4, '2020-05-07 09:15:27', '<span class=\"name_text\">Gnut</span> ataca a <span class=\"name_text\">Groonan</span> con arco corto<span class=\"attack_text\">Ataque&nbsp;<span class=\"red\">9</span>=8(1d20) +1(gac0)</span> <span class=\"red\">fallo</span></span> munición arco corto 7'),
(1, 1, 5, '2020-05-07 09:19:52', '<span class=\"name_text\">Gnut</span> ataca a <span class=\"name_text\">Groonan</span> con arco corto<span class=\"attack_text\">Ataque&nbsp;<span class=\"red\">5</span>=4(1d20) +1(gac0)</span> <span class=\"red\">fallo</span></span> munición arco corto 6'),
(1, 1, 6, '2020-05-07 10:03:27', '<span class=\'name_text\'>Groonan</span> se mueve a 5,22'),
(1, 1, 7, '2020-05-07 10:03:30', '<span class=\"name_text\">Groonan</span> ataca a <span class=\"name_text\">Gnut</span> con hacha 2 manos<span class=\"attack_text\">Ataque&nbsp;<span class=\"red\">16</span>=11(1d20) +1(gac0) +2(fue) +2(carga)</span><span class=\"dmg_text\">Daño&nbsp;<span class=\"red\">14</span>=12(1d12) +2(fue)</span>'),
(1, 1, 8, '2020-05-07 10:22:04', '<span class=\'name_text\'>Connor</span> se mueve a 12,22'),
(1, 1, 9, '2020-05-07 10:22:12', '<span class=\"name_text\">Connor</span> ataca a <span class=\"name_text\">Prurd</span> con arco largo<span class=\"attack_text\">Ataque&nbsp;<span class=\"red\">15</span>=17(1d20) +1(distancia) -7(cobertura 75%) +1(gac0) +1(des) +2(enemigo predilecto)</span><span class=\"dmg_text\">Daño&nbsp;<span class=\"red\">7</span>=5(1d8) +2(fue)</span> munición arco largo 19'),
(1, 1, 10, '2020-05-07 10:22:16', '<span class=\'name_text\'>Varyarel</span> se mueve a 13,22'),
(1, 1, 11, '2020-05-07 10:22:19', '<span class=\"name_text\">Varyarel</span> ataca a <span class=\"name_text\">Vrozz</span> con proyectil mágico<span class=\"dmg_text\">Daño&nbsp;<span class=\"red\">3</span>=2(1d6)+1'),
(1, 1, 12, '2020-05-07 10:22:27', '<span class=\'name_text\'>Gran_Alberto</span> se mueve a 11,20'),
(1, 1, 13, '2020-05-07 10:22:30', '<span class=\"name_text\">Gran_Alberto</span> ataca a <span class=\"name_text\">Connor</span> con garrote<span class=\"attack_text\">Ataque&nbsp;<span class=\"red\">19</span>=14(1d20) +5(gac0)</span><span class=\"dmg_text\">Daño&nbsp;<span class=\"red\">9</span>=7(1d12) +2(fue)</span>'),
(1, 1, 14, '2020-05-07 10:22:59', '<span class=\"name_text\">Gran_Alberto</span> ataca a <span class=\"name_text\">Connor</span> con garrote<span class=\"attack_text\">Ataque&nbsp;<span class=\"red\">18</span>=13(1d20) +5(gac0)</span><span class=\"dmg_text\">Daño&nbsp;<span class=\"red\">10</span>=8(1d12) +2(fue)</span>'),
(1, 1, 15, '2020-05-07 10:36:59', '<span class=\'name_text\'>Varyarel</span> se mueve a 14,22');

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

--
-- Dumping data for table `animations`
--

INSERT INTO `animations` (`idBoard`, `tokenName`, `step`, `delay_after_step`, `action_id`, `type_id`, `src_x`, `src_y`, `target_x`, `target_y`) VALUES
(1, 'Gnut', 1, 0, 226, 2, 4, 22, 11, 22),
(1, 'Groonan', 1, 0, 282, 1, 5, 22, 4, 22),
(1, 'Connor', 1, 0, 299, 2, 12, 22, 5, 20),
(1, 'Varyarel', 1, 0, 307, 3, 13, 22, 6, 20),
(1, 'Gran_Alberto', 1, 0, 320, 1, 11, 20, 12, 22);

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
(1, 'Groonan', 'hp', 11),
(1, 'Groonan', 'ac', 16),
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
(1, 'Connor', 'hp', -9),
(1, 'Connor', 'ac', 15),
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
(1, 'Vrozz', 'hp', 3),
(1, 'Vrozz', 'ac', 10),
(1, 'Vrozz', 'thaco', 1),
(1, 'Prurd', 'maxhp', 8),
(1, 'Prurd', 'hp', -1),
(1, 'Prurd', 'ac', 10),
(1, 'Prurd', 'thaco', 1),
(1, 'Gnut', 'maxhp', 8),
(1, 'Gnut', 'hp', -8),
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
(1, 'Prisionera', 'save5', 15);

-- --------------------------------------------------------

--
-- Table structure for table `boards`
--

CREATE TABLE `boards` (
  `id` int(11) NOT NULL,
  `name` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
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

INSERT INTO `boards` (`id`, `name`, `tilew`, `tileh`, `ntilesw`, `ntilesh`, `offsetx`, `offsety`, `bg`, `drawGrid`, `lastActionId`, `turn`) VALUES
(1, 'Medusa', 70, 70, 25, 25, 0, 0, '010bg', 0, 323, 9);

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
(1, 'Connor', 2, 'arco largo', 'bow', 'flmde_rangedAttack r8,15,23 d1d8 ba1,3,10 bd1', 19, 20),
(1, 'Varyarel', 1, 'espada larga', 'sword', 'flmde_attack r1 d1d8 ba1,2 bd1', -1, -1),
(1, 'Varyarel', 2, 'arco largo', 'bow', 'flmde_rangedAttack r5,10,15 d1d8 ba1,3 bd1', 20, 20),
(1, 'Varyarel', 3, 'proyectil mÃ¡gico', 'energy-arrow', 'flmde_mm r13,13,13 d1d6', 4, 5),
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
(1, 'Gnut', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 6, 10),
(1, 'Roisreq', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Roisreq', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Gnarl', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Gnarl', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Matlf', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'Matlf', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6 ba1', 10, 10),
(1, 'Meladius', 1, 'bastÃ³n', 'sword', 'flmde_attack r1 d1d8 ba1,2 bd1', -1, -1),
(1, 'Meladius', 2, 'proyectil mÃ¡gico', 'energy-arrow', 'flmde_mm r13,13,13 d1d6', 5, 5),
(1, 'Prisionera', 1, 'sin arma', 'sword', 'flmde_attack r1 d1d2 ba1,2 bd1', -1, -1);

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

--
-- Dumping data for table `mods`
--

INSERT INTO `mods` (`idBoard`, `tokenName`, `attr`, `status`, `desc`, `mod`, `last_turn`) VALUES
(1, '', 'ac', 'defensive', 'maniobra defensiva', 2, 9),
(1, '', 'thaco', 'defensive', 'maniobra defensiva', -4, 9),
(1, 'Connor', 'ac', 'defensive', 'defensiva', 2, 9),
(1, 'Connor', 'thaco', 'defensive', 'defensiva', -4, 9),
(1, 'Varyarel', 'thaco', 'defensive', 'defensiva', -4, 9),
(1, 'Varyarel', 'ac', 'defensive', 'defensiva', 2, 9);

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
(1, 'Groonan', 281, '16 14', NULL),
(1, 'Gnut', 225, '5 fallo', NULL),
(1, 'Connor', 317, 'defensiva', NULL),
(1, '', 246, 'maniobra defensiva', NULL),
(1, 'Varyarel', 309, 'proyectil mÃ¡gico', NULL),
(1, 'Gran_Alberto', 319, '18 10', NULL);

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
(1, 'Varyarel', 'movement', 5, 4.00),
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
(1, 'Gran_Alberto', 'action', 1, 0.00),
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
(1, 'Prisionera', 'action', 1, 1.00);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
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

INSERT INTO `tokens` (`idBoard`, `name`, `file`, `pc`, `x`, `y`, `z`, `w`, `h`, `path`, `step`, `img`, `border`, `opacity`, `actionId`, `defaultGuideline`) VALUES
(1, 'Groonan', 'bar', 1, 5, 22, 1, 1, 1, '11,22,10,22,9,22,8,22,7,22,6,22,5,22', 1, '005.png', '5px+solid+lime', 1, 281, 1),
(1, 'Connor', 'exp', 1, 26, 26, 1, 1, 1, '14,24,14,23,14,22,13,22,12,22', 1, '006.png', '5px+solid+lime', 1, 321, 2),
(1, 'Varyarel', 'elf', 1, 14, 22, 1, 1, 1, '13,22,14,22', 1, '007.png', '5px+solid+lime', 1, 323, 3),
(1, 'Drihkard', 'goblin', 0, 16, 9, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 62, 2),
(1, 'Braaldirx', 'goblin', 0, 8, 14, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 69, 1),
(1, 'Fax', 'goblin', 0, 17, 8, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 76, 1),
(1, 'Prekt', 'goblin', 0, 19, 18, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 83, 2),
(1, 'esqueleto1', 'skeleton', 0, 5, 4, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 89, 1),
(1, 'esqueleto2', 'skeleton', 0, 3, 3, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 95, 1),
(1, 'esqueleto3', 'skeleton', 0, 3, 7, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 101, 1),
(1, 'esqueleto4', 'skeleton', 0, 5, 7, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 0, 107, 1),
(1, 'Gran_Alberto', 'ogre', 0, 11, 20, 1, 2, 2, '11,17,11,18,11,19,11,20', 1, 'ogre.jpg', '5px+solid+red', 1, 319, 1),
(1, 'Vrozz', 'goblin', 0, 6, 20, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 1, 308, 1),
(1, 'Prurd', 'goblin', 0, 26, 26, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 1, 305, 1),
(1, 'Gnut', 'goblin', 0, 26, 26, 1, 1, 1, '2,20,2,21,3,21,4,22', 1, 'goblin.jpg', '5px+solid+red', 1, 283, 2),
(1, 'Roisreq', 'goblin', 0, 2, 24, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 1, 279, 2),
(1, 'Gnarl', 'goblin', 0, 22, 8, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 149, 2),
(1, 'Matlf', 'goblin', 0, 23, 6, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 0, 156, 2),
(1, 'Meladius', 'meladius', 0, 12, 2, 1, 1, 1, NULL, 1, 'd.jpg', '5px+solid+red', 1, 201, 2),
(1, 'Prisionera', 'prisionera', 0, 16, 2, 1, 1, 1, NULL, 1, '011.png', '5px+dashed+lime', 1, 202, 1);

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
-- Indexes for table `guidelines`
--
ALTER TABLE `guidelines`
  ADD PRIMARY KEY (`idBoard`,`tokenName`,`guideNumber`);

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
  ADD PRIMARY KEY (`idBoard`,`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boards`
--
ALTER TABLE `boards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
