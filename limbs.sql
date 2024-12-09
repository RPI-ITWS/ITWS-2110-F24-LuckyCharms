-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2024 at 10:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `limbs`
--

-- --------------------------------------------------------

--
-- Table structure for table `alloweduserlocations`
--

CREATE TABLE `alloweduserlocations` (
  `user_id` int(11) UNSIGNED NOT NULL COMMENT 'Unique identifier of a User',
  `location_name` varchar(256) NOT NULL COMMENT 'Name of a location the user is allowed in'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alloweduserlocations`
--

INSERT INTO `alloweduserlocations` (`user_id`, `location_name`) VALUES
(1, 'Cogswell Laboratory'),
(1, 'Darrin Communications Center'),
(1, 'Lally Hall'),
(3, 'Cogswell Laboratory'),
(3, 'Darrin Communications Center'),
(4, 'Lally Hall'),
(4, 'Low Center for Industrial Innovation'),
(4, 'Russell Sage Laboratory'),
(4, 'Walker Laboratory'),
(5, 'Cogswell Laboratory'),
(5, 'Darrin Communications Center'),
(5, 'Lally Hall'),
(6, 'Low Center for Industrial Innovation'),
(6, 'Russell Sage Laboratory'),
(6, 'Walker Laboratory');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Unique identifier of item',
  `name` text NOT NULL COMMENT 'Name of item',
  `borrowable` tinyint(1) NOT NULL COMMENT 'Whether or not the item can be borrowed.\r\nIf false, the item can just be taken.',
  `description` text DEFAULT NULL COMMENT 'Description of item',
  `stock` int(11) NOT NULL COMMENT 'Amount Of Item',
  `location_name` varchar(256) NOT NULL COMMENT 'The name of the location of this item'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `borrowable`, `description`, `stock`, `location_name`) VALUES
(1, 'Laptop', 1, 'A high-performance laptop.', 10, 'Cogswell Laboratory'),
(2, 'Projector', 1, 'A 4K projector.', 5, 'Darrin Communications Center'),
(3, 'Whiteboard', 0, 'A large whiteboard.', 20, 'Lally Hall'),
(4, '3D Printer', 1, 'A 3D printer for prototyping.', 2, 'Low Center for Industrial Innovation'),
(5, 'Microscope', 1, 'A high-resolution microscope.', 8, 'Russell Sage Laboratory'),
(6, 'Soldering Kit', 0, 'A complete soldering kit.', 15, 'Walker Laboratory'),
(7, 'Oscilloscope', 1, 'A digital oscilloscope for measuring electrical signals.', 4, 'Cogswell Laboratory'),
(8, 'Multimeter', 1, 'A digital multimeter for measuring voltage, current, and resistance.', 10, 'Darrin Communications Center'),
(9, 'Laser Cutter', 1, 'A laser cutter for precision cutting of materials.', 1, 'Lally Hall'),
(10, 'VR Headset', 1, 'A virtual reality headset for immersive experiences.', 6, 'Low Center for Industrial Innovation'),
(11, 'Arduino Kit', 0, 'A kit containing an Arduino board and various components.', 20, 'Russell Sage Laboratory'),
(12, 'Raspberry Pi', 0, 'A small single-board computer for various projects.', 15, 'Walker Laboratory'),
(13, 'Digital Camera', 1, 'A high-resolution digital camera.', 5, 'Cogswell Laboratory'),
(14, 'Tripod', 0, 'A sturdy tripod for cameras.', 10, 'Darrin Communications Center'),
(15, 'LED Light Panel', 1, 'A portable LED light panel.', 8, 'Lally Hall'),
(16, 'Microphone', 1, 'A high-quality microphone.', 12, 'Low Center for Industrial Innovation'),
(17, 'Audio Mixer', 1, 'An audio mixer for sound control.', 3, 'Russell Sage Laboratory'),
(18, 'Graphics Tablet', 1, 'A graphics tablet for digital art.', 7, 'Walker Laboratory'),
(19, 'Drone', 1, 'A drone for aerial photography.', 4, 'Cogswell Laboratory'),
(20, 'VR Gloves', 1, 'Gloves for virtual reality interaction.', 6, 'Darrin Communications Center'),
(21, '3D Scanner', 1, 'A 3D scanner for creating digital models.', 2, 'Lally Hall'),
(22, 'Laser Engraver', 1, 'A laser engraver for detailed work.', 1, 'Low Center for Industrial Innovation'),
(23, 'Portable Projector', 1, 'A compact portable projector.', 5, 'Russell Sage Laboratory'),
(24, 'Bluetooth Speaker', 0, 'A portable Bluetooth speaker.', 15, 'Walker Laboratory'),
(25, 'Smartphone Gimbal', 1, 'A gimbal for smartphone stabilization.', 10, 'Cogswell Laboratory'),
(26, 'Action Camera', 1, 'A durable action camera.', 8, 'Darrin Communications Center'),
(27, 'Wireless Microphone', 1, 'A wireless microphone system.', 6, 'Lally Hall'),
(28, 'Studio Monitor', 1, 'A high-fidelity studio monitor.', 4, 'Low Center for Industrial Innovation'),
(29, 'Green Screen', 0, 'A large green screen for video production.', 3, 'Russell Sage Laboratory'),
(30, 'Teleprompter', 1, 'A teleprompter for presentations.', 2, 'Walker Laboratory'),
(31, 'Lighting Kit', 1, 'A complete lighting kit for photography.', 5, 'Cogswell Laboratory'),
(32, 'Portable Hard Drive', 0, 'A portable hard drive for data storage.', 20, 'Darrin Communications Center');
-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `name` varchar(256) NOT NULL COMMENT 'Name of location'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`name`) VALUES
('Cogswell Laboratory'),
('Darrin Communications Center'),
('Lally Hall'),
('Low Center for Industrial Innovation'),
('Russell Sage Laboratory'),
('Walker Laboratory');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Unique identifier of reservation',
  `item_id` int(11) UNSIGNED NOT NULL COMMENT 'Unique identifier of item',
  `user_id` int(11) UNSIGNED NOT NULL COMMENT 'Unique identifier of user that made the reservation',
  `amount` int(11) NOT NULL COMMENT 'Amount of items user is reserving',
  `date_reserved` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Date the item was reserved',
  `date_expected_to_return` timestamp NULL DEFAULT NULL COMMENT 'The date the user is expected to return.',
  `date_returned` timestamp NULL DEFAULT NULL COMMENT 'The date the item was returned',
  `cancelled` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Whether the reservation is cancelled or not.',
  `completed` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Whether the reservation is completed or not.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

INSERT INTO `reservations` (`id`, `item_id`, `user_id`, `amount`, `date_reserved`, `date_expected_to_return`, `date_returned`, `cancelled`, `completed`) VALUES
(1, 1, 1, 1, '2024-12-01 10:00:00', '2024-12-15 10:00:00', NULL, 0, 0),
(2, 2, 3, 2, '2024-12-02 11:00:00', '2024-12-16 11:00:00', NULL, 0, 0),
(3, 3, 4, 1, '2024-12-03 12:00:00', '2024-12-17 12:00:00', NULL, 0, 0),
(4, 4, 5, 1, '2024-12-04 13:00:00', '2024-12-18 13:00:00', NULL, 0, 0),
(5, 5, 6, 3, '2024-12-05 14:00:00', '2024-12-19 14:00:00', NULL, 0, 0),
(6, 6, 8, 2, '2024-12-06 15:00:00', '2024-12-20 15:00:00', NULL, 0, 0),
(7, 7, 1, 1, '2024-12-07 16:00:00', '2024-12-21 16:00:00', NULL, 0, 0),
(8, 8, 3, 1, '2024-12-08 17:00:00', '2024-12-22 17:00:00', NULL, 0, 0),
(9, 9, 4, 1, '2024-12-09 18:00:00', '2024-12-23 18:00:00', NULL, 0, 0),
(10, 10, 5, 1, '2024-12-10 19:00:00', '2024-12-24 19:00:00', NULL, 0, 0),
(11, 11, 6, 1, '2024-12-11 20:00:00', '2024-12-25 20:00:00', NULL, 0, 0),
(12, 12, 8, 1, '2024-12-12 21:00:00', '2024-12-26 21:00:00', NULL, 0, 0),
(13, 13, 1, 1, '2024-12-13 22:00:00', '2024-12-27 22:00:00', NULL, 0, 0),
(14, 14, 3, 1, '2024-12-14 23:00:00', '2024-12-28 23:00:00', NULL, 0, 0),
(15, 15, 4, 1, '2024-12-15 00:00:00', '2024-12-29 00:00:00', NULL, 0, 0),
(16, 16, 5, 1, '2024-12-16 01:00:00', '2024-12-30 01:00:00', NULL, 0, 0),
(17, 17, 6, 1, '2024-12-17 02:00:00', '2024-12-31 02:00:00', NULL, 0, 0),
(18, 18, 8, 1, '2024-12-18 03:00:00', '2025-01-01 03:00:00', NULL, 0, 0),
(19, 19, 1, 1, '2024-12-19 04:00:00', '2025-01-02 04:00:00', NULL, 0, 0),
(20, 20, 3, 1, '2024-12-20 05:00:00', '2025-01-03 05:00:00', NULL, 0, 0);

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL COMMENT 'Unique identifier of user',
  `username` varchar(20) NOT NULL COMMENT 'username of user, must be unique',
  `password` varchar(100) NOT NULL COMMENT 'password of user',
  `email` varchar(256) NOT NULL COMMENT 'The email address of the user.',
  `phone` varchar(100) DEFAULT NULL COMMENT 'The user''s phone number',
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'timestamp user created account',
  `is_admin` tinyint(1) DEFAULT NULL COMMENT 'Whether the user is an admin or not.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `phone`, `creation_date`, `is_admin`) VALUES
(1, 'Jane Doe', '$2y$10$Udo2D11nB8MBg8HisRmTZ.8Z8YRRtjPcRLHeExRd.MHynR1r9weFW', 'aaaaaaaaaaaaaa', '911', '2024-10-06 06:41:30', 0),
(3, 'Dr. Smith', '$2y$10$J1aFG6K6vqSudzSV98lmD.1eAoF8L7hO86SijUrKZK17Yer7PXxCO', 'smitha14@rpi.edu', NULL, '2024-10-22 22:22:48', 1),
(4, 'John Miller', '$2y$10$rPQy2PKLPdC9yEMLbDDR.e8nubcfvzSaq0qcrE/qCGMzTSwhHDj/m', 'millej3@rpi.edu', NULL, '2024-10-22 22:23:07', 0),
(5, 'Alex Johnson', '$2y$10$hgjcXd4gQgsIUnfj3lVk9.oOWTXN4O4sFReNDEY03c0QY6WFjAFIO', 'alexarchjohnson@gmail.com', NULL, '2024-10-22 22:23:47', NULL),
(6, 'a', '$2y$10$rYPX6JWhpmfrqotWBh1Spul2jSZvu0F4OPyK/XDxhnySFXFNLpjie', 'people@rpi.edu', NULL, '2024-12-03 10:40:06', 0),
(8, 'aa', '$2y$10$iPobr3qUWYMHS5QKjOSow.H7E/DjLPhmtNyuoRjv4mhR2fzuotGra', 'people1@rpi.edu', NULL, '2024-12-03 10:45:26', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alloweduserlocations`
--
ALTER TABLE `alloweduserlocations`
  ADD UNIQUE KEY `user_id` (`user_id`,`location_name`),
  ADD KEY `alloweduserlocations_ibfk_3` (`location_name`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `items_ibfk_1` (`location_name`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservations_ibfk_1` (`item_id`),
  ADD KEY `reservations_ibfk_2` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier of item', AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier of reservation', AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier of user', AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alloweduserlocations`
--
ALTER TABLE `alloweduserlocations`
  ADD CONSTRAINT `alloweduserlocations_ibfk_3` FOREIGN KEY (`location_name`) REFERENCES `locations` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `alloweduserlocations_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`location_name`) REFERENCES `locations` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;