-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 08, 2020 at 10:42 AM
-- Server version: 5.7.29-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.3

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
  `idAction` int(11) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(255) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `actions`
--

INSERT INTO `actions` (`idUser`, `idBoard`, `idAction`, `ts`, `action`) VALUES
(1, 4, 1, '2020-04-08 08:42:06', '@bar p16,14,1,1 !img_src _5px+solid+lime'),
(1, 4, 2, '2020-04-08 08:42:06', '@bar [maxhp:56,hp:56]'),
(1, 4, 3, '2020-04-08 08:42:06', '@bar (1)#1d20+5,1d12+2'),
(1, 4, 4, '2020-04-08 08:42:06', '@bar (2)#1d20+3,1d8+2'),
(1, 4, 5, '2020-04-08 08:42:07', '@exp p14,14,1,1 !img_src _5px+solid+lime'),
(1, 4, 6, '2020-04-08 08:42:07', '@exp [maxhp:40,hp:40]'),
(1, 4, 7, '2020-04-08 08:42:07', '@exp (1)#1d20+4,1d8+2'),
(1, 4, 8, '2020-04-08 08:42:07', '@exp (2)#1d20,1d8+2'),
(1, 4, 9, '2020-04-08 08:42:07', '@elf p15,16,1,1 !img_src _5px+solid+lime'),
(1, 4, 10, '2020-04-08 08:42:07', '@elf [maxhp:24,hp:24]'),
(1, 4, 11, '2020-04-08 08:42:08', '@elf (1)#1d20+5,1d8+2'),
(1, 4, 12, '2020-04-08 08:42:08', '@elf (2)#1d20+6,1d8+1'),
(1, 4, 13, '2020-04-08 08:42:08', '@cle p15,17,1,1 !img_src _5px+solid+lime'),
(1, 4, 14, '2020-04-08 08:42:08', '@cle [maxhp:28,hp:28]'),
(1, 4, 15, '2020-04-08 08:42:08', '@cle (1)#1d20+3,1d8+1'),
(1, 4, 16, '2020-04-08 08:42:09', '@cle (2)#1d20+2,1d8'),
(1, 4, 17, '2020-04-08 08:42:09', '@lad p18,15,1,1 !img_src _5px+solid+lime'),
(1, 4, 18, '2020-04-08 08:42:09', '@lad [maxhp:20,hp:20]'),
(1, 4, 19, '2020-04-08 08:42:09', '@lad (1)#1d20+2,1d8'),
(1, 4, 20, '2020-04-08 08:42:10', '@lad (2)#1d20+2,1d6'),
(1, 4, 21, '2020-04-08 08:42:10', '@g1 p1,16,1,1 !img_src _5px+solid+red'),
(1, 4, 22, '2020-04-08 08:42:10', '@g1 [maxhp:5,hp:5]'),
(1, 4, 23, '2020-04-08 08:42:10', '@g1 (1)#1d20,1d6'),
(1, 4, 24, '2020-04-08 08:42:10', '@g1 (2)#1d20,1d4'),
(1, 4, 25, '2020-04-08 08:42:10', '@g2 p2,17,1,1 !img_src _5px+solid+red'),
(1, 4, 26, '2020-04-08 08:42:11', '@g2 [maxhp:5,hp:5]'),
(1, 4, 27, '2020-04-08 08:42:11', '@g2 (1)#1d20,1d6'),
(1, 4, 28, '2020-04-08 08:42:11', '@g2 (2)#1d20,1d4'),
(1, 4, 29, '2020-04-08 08:42:11', '@g3 p2,18,1,1 !img_src _5px+solid+red'),
(1, 4, 30, '2020-04-08 08:42:11', '@g3 [maxhp:5,hp:5]'),
(1, 4, 31, '2020-04-08 08:42:11', '@g3 (1)#1d20,1d6'),
(1, 4, 32, '2020-04-08 08:42:11', '@g3 (2)#1d20,1d4'),
(1, 4, 33, '2020-04-08 08:42:12', '@g4 p12,7,1,1 !img_src _5px+solid+red'),
(1, 4, 34, '2020-04-08 08:42:12', '@g4 [maxhp:5,hp:5]'),
(1, 4, 35, '2020-04-08 08:42:12', '@g4 (1)#1d20,1d6'),
(1, 4, 36, '2020-04-08 08:42:12', '@g4 (2)#1d20,1d4'),
(1, 4, 37, '2020-04-08 08:42:12', '@g5 p13,3,1,1 !img_src _5px+solid+red'),
(1, 4, 38, '2020-04-08 08:42:12', '@g5 [maxhp:5,hp:5]'),
(1, 4, 39, '2020-04-08 08:42:13', '@g5 (1)#1d20,1d6'),
(1, 4, 40, '2020-04-08 08:42:13', '@g5 (2)#1d20,1d4'),
(1, 4, 41, '2020-04-08 08:42:13', '@g6 p10,2,1,1 !img_src _5px+solid+red'),
(1, 4, 42, '2020-04-08 08:42:13', '@g6 [maxhp:5,hp:5]'),
(1, 4, 43, '2020-04-08 08:42:13', '@g6 (1)#1d20,1d6'),
(1, 4, 44, '2020-04-08 08:42:14', '@g6 (2)#1d20,1d4'),
(1, 4, 45, '2020-04-08 08:42:14', '@o1 p13,1,1,1 !img_src _5px+dashed+red'),
(1, 4, 46, '2020-04-08 08:42:14', '@o1 [maxhp:6,hp:6]'),
(1, 4, 47, '2020-04-08 08:42:14', '@o1 (1)#1d20,1d6+2'),
(1, 4, 48, '2020-04-08 08:42:14', '@o2 p12,2,1,1 !img_src _5px+solid+red'),
(1, 4, 49, '2020-04-08 08:42:15', '@o2 [maxhp:6,hp:6]'),
(1, 4, 50, '2020-04-08 08:42:15', '@o2 (1)#1d20,1d6+2'),
(1, 4, 51, '2020-04-08 08:42:15', '@o3 p17,4,1,1 !img_src _5px+solid+red'),
(1, 4, 52, '2020-04-08 08:42:15', '@o3 [maxhp:6,hp:6]'),
(1, 4, 53, '2020-04-08 08:42:15', '@o3 (1)#1d20,1d6+2'),
(1, 4, 54, '2020-04-08 08:42:15', '@o4 p10,1,1,1 !img_src _5px+solid+red'),
(1, 4, 55, '2020-04-08 08:42:16', '@o4 [maxhp:6,hp:6]'),
(1, 4, 56, '2020-04-08 08:42:16', '@o4 (1)#1d20,1d6+2'),
(1, 4, 57, '2020-04-08 08:42:16', '@o5 p1,15,1,1 !img_src _5px+solid+red'),
(1, 4, 58, '2020-04-08 08:42:16', '@o5 [maxhp:6,hp:6]'),
(1, 4, 59, '2020-04-08 08:42:16', '@o5 (1)#1d20,1d6+2'),
(1, 4, 60, '2020-04-08 08:42:16', '@o6 p3,17,1,1 !img_src _5px+solid+red'),
(1, 4, 61, '2020-04-08 08:42:17', '@o6 [maxhp:6,hp:6]'),
(1, 4, 62, '2020-04-08 08:42:17', '@o6 (1)#1d20,1d6+2');

-- --------------------------------------------------------

--
-- Table structure for table `attrs`
--

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
(4, 'bar', 'hp', 56),
(4, 'bar', 'maxhp', 56),
(4, 'cle', 'hp', 28),
(4, 'cle', 'maxhp', 28),
(4, 'elf', 'hp', 24),
(4, 'elf', 'maxhp', 24),
(4, 'exp', 'hp', 40),
(4, 'exp', 'maxhp', 40),
(4, 'g1', 'hp', 5),
(4, 'g1', 'maxhp', 5),
(4, 'g2', 'hp', 5),
(4, 'g2', 'maxhp', 5),
(4, 'g3', 'hp', 5),
(4, 'g3', 'maxhp', 5),
(4, 'g4', 'hp', 5),
(4, 'g4', 'maxhp', 5),
(4, 'g5', 'hp', 5),
(4, 'g5', 'maxhp', 5),
(4, 'g6', 'hp', 5),
(4, 'g6', 'maxhp', 5),
(4, 'lad', 'hp', 20),
(4, 'lad', 'maxhp', 20),
(4, 'o1', 'hp', 6),
(4, 'o1', 'maxhp', 6),
(4, 'o2', 'hp', 6),
(4, 'o2', 'maxhp', 6),
(4, 'o3', 'hp', 6),
(4, 'o3', 'maxhp', 6),
(4, 'o4', 'hp', 6),
(4, 'o4', 'maxhp', 6),
(4, 'o5', 'hp', 6),
(4, 'o5', 'maxhp', 6),
(4, 'o6', 'hp', 6),
(4, 'o6', 'maxhp', 6);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `boards`
--

INSERT INTO `boards` (`id`, `name`, `tilew`, `tileh`, `ntilesw`, `ntilesh`, `offsetx`, `offsety`, `bg`, `drawGrid`, `lastActionId`) VALUES
(1, 'Phandelver intro', 67, 67, 30, 19, 14, 92, '001bg.jpg', 0, 0),
(2, 'Acampada nocturna', 70, 70, 20, 28, 0, 0, '002bg.jpg', 0, 0),
(3, 'Mazmorra 1', 50, 50, 48, 32, 150, 0, '003bg.jpg', 0, 0),
(4, 'Caravana', 70, 70, 20, 20, 0, 0, '004bg.jpg', 0, 62),
(5, 'Puente de lava', 70, 70, 20, 20, -22, -22, '005bg.jpg', 0, 0),
(6, 'Puente de lava 2', 75, 75, 20, 20, 0, 0, '006bg.jpg', 0, 0),
(7, 'Defensa de la fortaleza 1', 72, 72, 24, 24, 0, 0, '007bg.jpg', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `guidelines`
--

CREATE TABLE `guidelines` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(3) COLLATE utf8_spanish2_ci NOT NULL,
  `guideName` tinyint(4) NOT NULL,
  `guideline` varchar(120) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `guidelines`
--

INSERT INTO `guidelines` (`idBoard`, `tokenName`, `guideName`, `guideline`) VALUES
(4, 'bar', 1, '#1d20+5,1d12+2'),
(4, 'bar', 2, '#1d20+3,1d8+2'),
(4, 'cle', 1, '#1d20+3,1d8+1'),
(4, 'cle', 2, '#1d20+2,1d8'),
(4, 'elf', 1, '#1d20+5,1d8+2'),
(4, 'elf', 2, '#1d20+6,1d8+1'),
(4, 'exp', 1, '#1d20+4,1d8+2'),
(4, 'exp', 2, '#1d20,1d8+2'),
(4, 'g1', 1, '#1d20,1d6'),
(4, 'g1', 2, '#1d20,1d4'),
(4, 'g2', 1, '#1d20,1d6'),
(4, 'g2', 2, '#1d20,1d4'),
(4, 'g3', 1, '#1d20,1d6'),
(4, 'g3', 2, '#1d20,1d4'),
(4, 'g4', 1, '#1d20,1d6'),
(4, 'g4', 2, '#1d20,1d4'),
(4, 'g5', 1, '#1d20,1d6'),
(4, 'g5', 2, '#1d20,1d4'),
(4, 'g6', 1, '#1d20,1d6'),
(4, 'g6', 2, '#1d20,1d4'),
(4, 'lad', 1, '#1d20+2,1d8'),
(4, 'lad', 2, '#1d20+2,1d6'),
(4, 'o1', 1, '#1d20,1d6+2'),
(4, 'o2', 1, '#1d20,1d6+2'),
(4, 'o3', 1, '#1d20,1d6+2'),
(4, 'o4', 1, '#1d20,1d6+2'),
(4, 'o5', 1, '#1d20,1d6+2'),
(4, 'o6', 1, '#1d20,1d6+2');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `idBoard` int(11) NOT NULL,
  `name` varchar(3) COLLATE utf8_spanish2_ci NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `z` int(11) NOT NULL,
  `w` tinyint(4) NOT NULL DEFAULT '1',
  `h` tinyint(4) NOT NULL DEFAULT '1',
  `step` float NOT NULL,
  `img` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `border` varchar(32) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `dice_result` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `dice_action` varchar(128) COLLATE utf8_spanish2_ci DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`idBoard`, `name`, `x`, `y`, `z`, `w`, `h`, `step`, `img`, `border`, `dice_result`, `dice_action`) VALUES
(4, 'bar', 16, 14, 1, 1, 1, 1, '005.png', '5px+solid+lime', NULL, '0'),
(4, 'cle', 15, 17, 1, 1, 1, 1, '011.png', '5px+solid+lime', NULL, '0'),
(4, 'elf', 15, 16, 1, 1, 1, 1, '007.png', '5px+solid+lime', NULL, '0'),
(4, 'exp', 14, 14, 1, 1, 1, 1, '006.png', '5px+solid+lime', NULL, '0'),
(4, 'g1', 1, 16, 1, 1, 1, 1, 'goblin.jpg', '5px+solid+red', NULL, '0'),
(4, 'g2', 2, 17, 1, 1, 1, 1, 'goblin.jpg', '5px+solid+red', NULL, '0'),
(4, 'g3', 2, 18, 1, 1, 1, 1, 'goblin.jpg', '5px+solid+red', NULL, '0'),
(4, 'g4', 12, 7, 1, 1, 1, 1, 'goblin.jpg', '5px+solid+red', NULL, '0'),
(4, 'g5', 13, 3, 1, 1, 1, 1, 'goblin.jpg', '5px+solid+red', NULL, '0'),
(4, 'g6', 10, 2, 1, 1, 1, 1, 'goblin.jpg', '5px+solid+red', NULL, '0'),
(4, 'lad', 18, 15, 1, 1, 1, 1, '010.png', '5px+solid+lime', NULL, '0'),
(4, 'o1', 13, 1, 1, 1, 1, 1, 'orc.jpg', '5px+dashed+red', NULL, '0'),
(4, 'o2', 12, 2, 1, 1, 1, 1, 'orc.jpg', '5px+solid+red', NULL, '0'),
(4, 'o3', 17, 4, 1, 1, 1, 1, 'orc.jpg', '5px+solid+red', NULL, '0'),
(4, 'o4', 10, 1, 1, 1, 1, 1, 'orc.jpg', '5px+solid+red', NULL, '0'),
(4, 'o5', 1, 15, 1, 1, 1, 1, 'orc.jpg', '5px+solid+red', NULL, '0'),
(4, 'o6', 3, 17, 1, 1, 1, 1, 'orc.jpg', '5px+solid+red', NULL, '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`idUser`,`idBoard`,`idAction`);

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
  ADD PRIMARY KEY (`idBoard`,`tokenName`,`guideName`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
