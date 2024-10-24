-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2024 at 07:20 AM
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
(1, 'Darrin Communications Center');

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
  `image_link` text DEFAULT NULL COMMENT 'The link of the image',
  `location_name` varchar(256) NOT NULL COMMENT 'The name of the location of this item'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `borrowable`, `description`, `stock`, `image_link`, `location_name`) VALUES
(1, 'Scissors', 1, 'This cuts things', 95, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR84qsQGI5DqIGNR3Z80ALpzu7ZXfDkafybkEAqCz2iTfhVOK1nEu7NhjugZ_6RR6kOFmlpJcbY3afewrg-0sFOPD-WpRM4w5XprL-J9LSjU2_zSPoXPVvXhf8', 'Darrin Communications Center'),
(2, 'Marker', 0, 'I barely know her!', 69, NULL, 'Darrin Communications Center'),
(3, 'HK416', 1, 'What is this doing in a lab?', 0, NULL, 'Walker Laboratory'),
(4, 'Plasma TV', 0, 'Plz return it when done, it costed millions of munny.', 1, NULL, 'Lally Hall'),
(5, 'Gigantic Light Bulb', 0, 'Read the name.', 45, NULL, 'Darrin Communications Center'),
(6, 'Ball', 1, NULL, 4, 'https://www.yogadirect.com/cdn-cgi/image/quality%3D85/assets/images/anti-burst-yoga-ball-red.jpg', 'Low Center for Industrial Innovation'),
(7, 'Scissors', 1, 'This cuts things', 99, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR84qsQGI5DqIGNR3Z80ALpzu7ZXfDkafybkEAqCz2iTfhVOK1nEu7NhjugZ_6RR6kOFmlpJcbY3afewrg-0sFOPD-WpRM4w5XprL-J9LSjU2_zSPoXPVvXhf8', 'Russell Sage Laboratory');

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

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `item_id`, `user_id`, `amount`, `date_reserved`, `date_expected_to_return`, `date_returned`, `cancelled`, `completed`) VALUES
(31, 1, 1, 1, '2024-10-14 21:21:59', '2024-10-22 01:05:44', '2024-10-15 01:21:59', 0, 1);

-- --------------------------------------------------------

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
(5, 'Alex Johnson', '$2y$10$hgjcXd4gQgsIUnfj3lVk9.oOWTXN4O4sFReNDEY03c0QY6WFjAFIO', 'alexarchjohnson@gmail.com', NULL, '2024-10-22 22:23:47', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alloweduserlocations`
--
ALTER TABLE `alloweduserlocations`
  ADD KEY `alloweduserlocations_ibfk_3` (`location_name`),
  ADD KEY `alloweduserlocations_ibfk_4` (`user_id`);

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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier of item', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier of reservation', AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Unique identifier of user', AUTO_INCREMENT=6;

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
