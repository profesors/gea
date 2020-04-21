-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 21, 2020 at 05:16 PM
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

DROP TABLE IF EXISTS `actions`;
CREATE TABLE `actions` (
  `idUser` int(11) NOT NULL,
  `idBoard` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(255) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attrs`
--

DROP TABLE IF EXISTS `attrs`;
CREATE TABLE `attrs` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(3) COLLATE utf8_spanish2_ci NOT NULL,
  `attr` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `val` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `attrs`
--

INSERT INTO `attrs` (`idBoard`, `tokenName`, `attr`, `val`) VALUES
(1, 'bar', 'ac', 16),
(1, 'bar', 'car', 9),
(1, 'bar', 'con', 16),
(1, 'bar', 'dex', 13),
(1, 'bar', 'hp', 56),
(1, 'bar', 'int', 8),
(1, 'bar', 'maxhp', 56),
(1, 'bar', 'str', 17),
(1, 'bar', 'wis', 8),
(1, 'e1', 'ac', 13),
(1, 'e1', 'hp', 8),
(1, 'e1', 'maxhp', 8),
(1, 'exp', 'ac', 15),
(1, 'exp', 'car', 9),
(1, 'exp', 'con', 16),
(1, 'exp', 'dex', 14),
(1, 'exp', 'hp', 40),
(1, 'exp', 'int', 10),
(1, 'exp', 'maxhp', 40),
(1, 'exp', 'str', 16),
(1, 'exp', 'wis', 9),
(1, 'g1', 'ac', 10),
(1, 'g1', 'hp', 4),
(1, 'g1', 'maxhp', 8),
(1, 'g2', 'ac', 10),
(1, 'g2', 'hp', 4),
(1, 'g2', 'maxhp', 8),
(1, 'g3', 'ac', 10),
(1, 'g3', 'hp', 4),
(1, 'g3', 'maxhp', 8),
(1, 'g4', 'ac', 10),
(1, 'g4', 'hp', 4),
(1, 'g4', 'maxhp', 8);

-- --------------------------------------------------------

--
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `boards`
--

INSERT INTO `boards` (`id`, `name`, `tilew`, `tileh`, `ntilesw`, `ntilesh`, `offsetx`, `offsety`, `bg`, `drawGrid`, `lastActionId`) VALUES
(1, 'Caravana', 70, 70, 20, 20, 0, 0, '004bg.jpg', 0, 53);

-- --------------------------------------------------------

--
-- Table structure for table `guidelines`
--

DROP TABLE IF EXISTS `guidelines`;
CREATE TABLE `guidelines` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(3) COLLATE utf8_spanish2_ci NOT NULL,
  `guideNumber` tinyint(4) NOT NULL,
  `name` varchar(128) COLLATE utf8_spanish2_ci NOT NULL,
  `guideAction` varchar(120) COLLATE utf8_spanish2_ci NOT NULL,
  `n` int(11) DEFAULT NULL COMMENT 'Ammunition',
  `maxn` int(11) DEFAULT NULL COMMENT 'Max ammunition'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `guidelines`
--

INSERT INTO `guidelines` (`idBoard`, `tokenName`, `guideNumber`, `name`, `guideAction`, `n`, `maxn`) VALUES
(1, 'bar', 1, 'hacha 2 manos', 'flmde_attack r1 d1d12', -1, -1),
(1, 'bar', 2, 'hacha arrojadiza', 'flmde_rangedAttack r1,2,3 d1d8', 5, 5),
(1, 'e1', 1, 'espada', 'flmde_attack r1 d1d6', -1, -1),
(1, 'exp', 1, 'espada larga', 'flmde_attack_enemy r1 d1d8', -1, -1),
(1, 'exp', 2, 'arco largo', 'flmde_rangedAttack_enemy r8,15,23 d1d8', 20, 20),
(1, 'g1', 1, 'lanza', 'flmde_attack r1 d1d6', -1, -1),
(1, 'g1', 2, 'arco corto', 'flmde_rangedAttack r5,10,15 d1d6', 10, 10),
(1, 'g2', 1, 'lanza', 'flmde_attack r1 d1d6', -1, -1),
(1, 'g2', 2, 'arco corto', 'flmde_rangedAttack r5,10,15 d1d6', 10, 10),
(1, 'g3', 1, 'lanza', 'flmde_attack r1 d1d6', -1, -1),
(1, 'g3', 2, 'arco corto', 'flmde_rangedAttack r5,10,15 d1d6', 10, 10),
(1, 'g4', 1, 'lanza', 'flmde_attack r1 d1d6', -1, -1),
(1, 'g4', 2, 'arco corto', 'flmde_rangedAttack r5,10,15 d1d6', 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
  `idBoard` int(11) NOT NULL,
  `name` varchar(3) COLLATE utf8_spanish2_ci NOT NULL,
  `file` varchar(32) COLLATE utf8_spanish2_ci NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `z` int(11) NOT NULL,
  `w` tinyint(4) NOT NULL DEFAULT '1',
  `h` tinyint(4) NOT NULL DEFAULT '1',
  `step` float NOT NULL,
  `img` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `border` varchar(32) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `actionId` int(11) NOT NULL,
  `dice_result` varchar(32) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `dice_actionId` int(11) DEFAULT '0',
  `dice_action_targets` varchar(128) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`idBoard`, `name`, `file`, `x`, `y`, `z`, `w`, `h`, `step`, `img`, `border`, `actionId`, `dice_result`, `dice_actionId`, `dice_action_targets`) VALUES
(1, 'bar', 'bar', 16, 14, 1, 1, 1, 1, '005.png', '5px+solid+lime', 12, NULL, 0, NULL),
(1, 'e1', 'skeleton', 9, 17, 1, 1, 1, 1, 'skeleton.jpg', '5px+solid+red', 53, NULL, 0, NULL),
(1, 'exp', 'exp', 14, 14, 1, 1, 1, 1, '006.png', '5px+solid+lime', 24, NULL, 0, NULL),
(1, 'g1', 'goblin', 9, 14, 1, 1, 1, 1, 'goblin.jpg', '5px+solid+red', 30, NULL, 0, NULL),
(1, 'g2', 'goblin', 10, 15, 1, 1, 1, 1, 'goblin.jpg', '5px+solid+red', 36, NULL, 0, NULL),
(1, 'g3', 'goblin', 10, 16, 1, 1, 1, 1, 'goblin.jpg', '5px+solid+red', 42, NULL, 0, NULL),
(1, 'g4', 'goblin', 8, 17, 1, 1, 1, 1, 'goblin.jpg', '5px+solid+red', 48, NULL, 0, NULL);

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
