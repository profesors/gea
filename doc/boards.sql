-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 17, 2020 at 02:12 PM
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
(1, 'Phandelver intro', 67, 67, 30, 19, 14, 92, '001bg.jpg', 0, 268),
(2, 'Acampada nocturna', 70, 70, 20, 28, 0, 0, '002bg.jpg', 0, 268),
(3, 'Mazmorra 1', 50, 50, 48, 32, 150, 0, '003bgbg.jpg', 0, 268),
(4, 'Caravana', 70, 70, 20, 20, 0, 0, '004bg.jpg', 0, 268),
(5, 'Puente de lava', 70, 70, 20, 20, -22, -22, '005bg.jpg', 0, 268),
(6, 'Puente de lava 2', 75, 75, 20, 20, 0, 0, '006bg.jpg', 0, 268),
(7, 'Defensa de la fortaleza 1', 72, 72, 24, 24, 0, 0, '007bg.jpg', 0, 268),
(8, 'Rio Amazonia', 70, 70, 20, 61, 0, 0, '008bg.jpg', 0, 268);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boards`
--
ALTER TABLE `boards`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `boards`
--
ALTER TABLE `boards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
