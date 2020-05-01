-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 01, 2020 at 07:57 PM
-- Server version: 5.7.29-0ubuntu0.18.04.1
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
(1, 1, 1, '2020-05-01 17:51:16', '<span class=\'name_text\'>bar</span> se mueve a 13,22'),
(1, 1, 2, '2020-05-01 17:51:31', '<span class=\"name_text\">bar</span> ataca a <span class=\"name_text\">g5</span> con hacha 2 manos<span class=\"attack_text\">Ataque&nbsp;<span class=\"red\">14</span>=11(1d20) +1(gac0) +2(fue)</span><span class=\"dmg_text\">Daño&nbsp;<span class=\"red\">4</span>=2(1d12) +2(fue)</span>'),
(1, 1, 3, '2020-05-01 17:51:43', '<span class=\"name_text\">bar</span> ataca a <span class=\"name_text\">g5</span> con hacha 2 manos<span class=\"attack_text\">Ataque&nbsp;<span class=\"red\">4</span>=1(1d20) +1(gac0) +2(fue)</span> <span class=\"red\">fallo</span></span>'),
(1, 1, 4, '2020-05-01 17:52:28', '<span class=\"name_text\">bar</span> ataca a <span class=\"name_text\">g5</span> con hacha 2 manos<span class=\"attack_text\">Ataque&nbsp;<span class=\"red\">22</span>=19(1d20) +1(gac0) +2(fue)</span><span class=\"dmg_text\">Daño&nbsp;<span class=\"red\">12</span>=10(1d12) +2(fue)</span>'),
(1, 1, 5, '2020-05-01 17:52:35', '<span class=\'name_text\'>bar</span> se mueve a 12,19'),
(1, 1, 6, '2020-05-01 17:52:39', '<span class=\"name_text\">bar</span> ataca a <span class=\"name_text\">o1</span> con hacha 2 manos<span class=\"attack_text\">Ataque&nbsp;<span class=\"red\">15</span>=12(1d20) +1(gac0) +2(fue)</span><span class=\"dmg_text\">Daño&nbsp;<span class=\"red\">6</span>=4(1d12) +2(fue)</span>'),
(1, 1, 7, '2020-05-01 17:53:56', '<span class=\'name_text\'>bar</span> se mueve a 14,23');

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
(1, 'bar', 1, 0, 113, 1, 12, 19, 12, 18);

-- --------------------------------------------------------

--
-- Table structure for table `attrs`
--

CREATE TABLE `attrs` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(3) COLLATE utf8_spanish2_ci NOT NULL,
  `attr` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `val` int(11) NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `attrs`
--

INSERT INTO `attrs` (`idBoard`, `tokenName`, `attr`, `val`) VALUES
(1, 'bar', 'maxhp', 12),
(1, 'bar', 'hp', 12),
(1, 'bar', 'ac', 16),
(1, 'bar', 'str', 17),
(1, 'bar', 'dex', 13),
(1, 'bar', 'con', 16),
(1, 'bar', 'int', 8),
(1, 'bar', 'wis', 8),
(1, 'bar', 'car', 9),
(1, 'bar', 'thaco', 1),
(1, 'exp', 'maxhp', 10),
(1, 'exp', 'hp', 10),
(1, 'exp', 'ac', 15),
(1, 'exp', 'str', 16),
(1, 'exp', 'dex', 14),
(1, 'exp', 'con', 16),
(1, 'exp', 'int', 10),
(1, 'exp', 'wis', 9),
(1, 'exp', 'car', 9),
(1, 'exp', 'thaco', 1),
(1, 'elf', 'maxhp', 8),
(1, 'elf', 'hp', 8),
(1, 'elf', 'ac', 17),
(1, 'elf', 'str', 13),
(1, 'elf', 'dex', 18),
(1, 'elf', 'con', 11),
(1, 'elf', 'int', 14),
(1, 'elf', 'wis', 11),
(1, 'elf', 'car', 10),
(1, 'elf', 'thaco', 1),
(1, 'g1', 'maxhp', 8),
(1, 'g1', 'hp', 6),
(1, 'g1', 'ac', 10),
(1, 'g1', 'thaco', 1),
(1, 'g2', 'maxhp', 8),
(1, 'g2', 'hp', 6),
(1, 'g2', 'ac', 10),
(1, 'g2', 'thaco', 1),
(1, 'g3', 'maxhp', 8),
(1, 'g3', 'hp', 6),
(1, 'g3', 'ac', 10),
(1, 'g3', 'thaco', 1),
(1, 'g4', 'maxhp', 8),
(1, 'g4', 'hp', 6),
(1, 'g4', 'ac', 10),
(1, 'g4', 'thaco', 1),
(1, 'e1', 'maxhp', 8),
(1, 'e1', 'hp', 8000),
(1, 'e1', 'ac', 13),
(1, 'e1', 'thaco', 1),
(1, 'o1', 'maxhp', 21),
(1, 'o1', 'hp', 15),
(1, 'o1', 'ac', 15),
(1, 'o1', 'thaco', 5),
(1, 'o1', 'str', 16),
(1, 'g5', 'maxhp', 8),
(1, 'g5', 'hp', -10),
(1, 'g5', 'ac', 10),
(1, 'g5', 'thaco', 1);

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
  `lastActionId` int(11) NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `boards`
--

INSERT INTO `boards` (`id`, `name`, `tilew`, `tileh`, `ntilesw`, `ntilesh`, `offsetx`, `offsety`, `bg`, `drawGrid`, `lastActionId`) VALUES
(1, 'Elven tower', 70, 70, 25, 25, 0, 0, '010bg', 0, 122);

-- --------------------------------------------------------

--
-- Table structure for table `guidelines`
--

CREATE TABLE `guidelines` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(3) COLLATE utf8_spanish2_ci NOT NULL,
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
(1, 'bar', 1, 'hacha 2 manos', 'axe', 'flmde_attack r1 d1d12 ba1,2 bd1', -1, -1),
(1, 'bar', 2, 'hacha arrojadiza', 'bow', 'flmde_rangedAttack r1,2,3 d1d8 ba1,3 bd1', 5, 5),
(1, 'exp', 1, 'espada larga', 'sword', 'flmde_attack r1 d1d8 ba1,2,10 bd1', -1, -1),
(1, 'exp', 2, 'arco largo', 'bow', 'flmde_rangedAttack r8,15,23 d1d8 ba1,3,10 bd1', 20, 20),
(1, 'elf', 1, 'espada larga', 'sword', 'flmde_attack r1 d1d8 ba1,2 bd1', -1, -1),
(1, 'elf', 2, 'arco largo', 'bow', 'flmde_rangedAttack r5,10,15 d1d8 ba1,3 bd1', 20, 20),
(1, 'elf', 3, 'proyectil mÃ¡gico', 'energy-arrow', 'flmde_mm r13,13,13 d1d6', 10, 10),
(1, 'g1', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6', -1, -1),
(1, 'g1', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6', 10, 10),
(1, 'g2', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6', -1, -1),
(1, 'g2', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6', 10, 10),
(1, 'g3', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6', -1, -1),
(1, 'g3', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6', 10, 10),
(1, 'g4', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6', -1, -1),
(1, 'g4', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6', 10, 10),
(1, 'e1', 1, 'espada', 'sword', 'flmde_attack r1 d1d6 ba1', -1, -1),
(1, 'o1', 1, 'garrote', 'sword', 'flmde_attack r2 d1d12 ba1 bd1', -1, -1),
(1, 'g5', 1, 'lanza', 'sword', 'flmde_attack r1 d1d6', -1, -1),
(1, 'g5', 2, 'arco corto', 'bow', 'flmde_rangedAttack r5,10,15 d1d6', 10, 10);

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
(1, 'bar', 112, '15 6', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `idBoard` int(11) NOT NULL,
  `name` varchar(3) COLLATE utf8_spanish2_ci NOT NULL,
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
(1, 'bar', 'bar', 1, 14, 23, 1, 1, 1, '12,19,12,20,12,21,11,21,11,22,12,22,13,22,14,22,14,23', 1, '005.png', '5px+solid+lime', 1, 122, 1),
(1, 'exp', 'exp', 1, 14, 24, 1, 1, 1, NULL, 1, '006.png', '5px+solid+lime', 1, 26, 2),
(1, 'elf', 'elf', 1, 14, 25, 1, 1, 1, NULL, 1, '007.png', '5px+solid+lime', 1, 40, 3),
(1, 'g1', 'goblin', 0, 16, 9, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 1, 91, 2),
(1, 'g2', 'goblin', 0, 8, 14, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 1, 92, 1),
(1, 'g3', 'goblin', 0, 17, 8, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 1, 93, 1),
(1, 'g4', 'goblin', 0, 19, 18, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 1, 94, 2),
(1, 'e1', 'skeleton', 0, 5, 4, 1, 1, 1, NULL, 1, 'skeleton.jpg', '5px+solid+red', 1, 95, 1),
(1, 'o1', 'ogre', 0, 11, 17, 1, 2, 2, NULL, 1, 'ogre.jpg', '5px+solid+red', 1, 111, 1),
(1, 'g5', 'goblin', 0, 26, 26, 1, 1, 1, NULL, 1, 'goblin.jpg', '5px+solid+red', 1, 106, 1);

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
-- Indexes for table `output`
--
ALTER TABLE `output`
  ADD PRIMARY KEY (`idBoard`,`tokenName`);

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
