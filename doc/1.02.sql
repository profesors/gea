-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 17, 2020 at 02:47 PM
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
  `idAction` int(11) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(255) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `guidelines`
--

CREATE TABLE `guidelines` (
  `idBoard` int(11) NOT NULL,
  `tokenName` varchar(3) COLLATE utf8_spanish2_ci NOT NULL,
  `guideNumber` tinyint(4) NOT NULL,
  `guideName` varchar(128) COLLATE utf8_spanish2_ci NOT NULL,
  `guideAction` varchar(120) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

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
  `actionId` int(11) NOT NULL,
  `dice_result` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `dice_actionId` int(11) DEFAULT '0',
  `dice_action_targets` varchar(128) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
