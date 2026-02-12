-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 12, 2026 at 08:27 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kebele_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `families`
--

CREATE TABLE `families` (
  `id` int(11) NOT NULL,
  `family_number` varchar(50) NOT NULL,
  `house_number` varchar(50) NOT NULL,
  `zone` varchar(100) NOT NULL,
  `address` text,
  `head_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `families`
--

INSERT INTO `families` (`id`, `family_number`, `house_number`, `zone`, `address`, `head_id`, `created_at`, `updated_at`, `is_active`) VALUES
(3, 'FAM-002', '94', 'Zone 1', 'Ginjo Guduru, Ginjo Guduru, Oromia', 21, '2025-12-15 19:18:05', '2025-12-15 19:18:05', 1),
(7, 'FAM-003', '27', 'Zone 4', 'Ginjo Guduru, Ginjo Guduru, Oromia', 8, '2025-12-15 19:46:04', '2025-12-15 19:46:04', 1),
(8, 'FAM-004', '73', 'zone 2', 'Ginjo Guduru, Ginjo Guduru, Oromia', 24, '2025-12-15 19:47:58', '2025-12-15 19:47:58', 1),
(9, 'FAM-005', '24', 'Zone 3', 'Ginjo Guduru, Ginjo Guduru, Oromia', 23, '2025-12-16 08:12:52', '2025-12-16 08:12:52', 1);

-- --------------------------------------------------------

--
-- Table structure for table `houses`
--

CREATE TABLE `houses` (
  `id` int(11) NOT NULL,
  `house_number` varchar(50) NOT NULL,
  `zone` varchar(50) NOT NULL,
  `kebele` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `region` varchar(100) NOT NULL,
  `address` text,
  `owner_name` varchar(200) DEFAULT NULL,
  `owner_phone` varchar(20) DEFAULT NULL,
  `owner_id_number` varchar(50) DEFAULT NULL,
  `property_type` enum('residential','commercial','mixed','government','religious','other') DEFAULT 'residential',
  `status` enum('occupied','vacant','under_construction','abandoned','damaged') DEFAULT 'vacant',
  `rooms` int(11) DEFAULT '1',
  `area` decimal(10,2) DEFAULT NULL,
  `construction_year` year(4) DEFAULT NULL,
  `has_electricity` tinyint(1) DEFAULT '1',
  `has_water` tinyint(1) DEFAULT '1',
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `houses`
--

INSERT INTO `houses` (`id`, `house_number`, `zone`, `kebele`, `city`, `region`, `address`, `owner_name`, `owner_phone`, `owner_id_number`, `property_type`, `status`, `rooms`, `area`, `construction_year`, `has_electricity`, `has_water`, `latitude`, `longitude`, `notes`, `created_at`, `updated_at`) VALUES
(1, '63', '3', 'Ginjo Guduru', 'Ginjo Guduru', 'Oromia', NULL, 'Jemal_Abafita', '+251 999 455 399', NULL, 'residential', 'vacant', 1, NULL, 2025, 1, 1, NULL, NULL, NULL, '2025-12-20 13:54:19', '2025-12-20 13:54:19'),
(2, '56', '3', 'Ginjo Guduru', 'Ginjo Guduru', 'Oromia', NULL, 'Ermiyas Teferi', '+251 922 288 111', NULL, 'residential', 'occupied', 1, NULL, 2025, 1, 1, NULL, NULL, NULL, '2025-12-20 14:26:00', '2025-12-20 14:26:00'),
(3, '43', '5', 'Ginjo Guduru', 'Ginjo Guduru', 'Oromia', NULL, 'Pop_Franscis', '+251 933 778 288', NULL, 'commercial', 'vacant', 1, NULL, 2025, 1, 1, NULL, NULL, NULL, '2025-12-21 06:23:32', '2025-12-21 06:23:32'),
(4, '23', '5', 'Ginjo Guduru', 'Ginjo Guduru', 'Oromia', NULL, 'unknown', '+251 983 445 004', NULL, 'residential', 'under_construction', 10, '334.80', 2025, 1, 1, NULL, NULL, NULL, '2025-12-21 07:29:18', '2025-12-21 07:29:18'),
(5, '91', '4', 'Ginjo Guduru', 'Ginjo Guduru', 'oromia', NULL, 'mamjhg ah', '+251 998 332 992', NULL, 'mixed', 'vacant', 10, '344.70', 2025, 1, 1, NULL, NULL, NULL, '2025-12-21 07:34:25', '2025-12-21 07:34:25'),
(6, '39', '3', 'Ginjo Guduru', 'Ginjo Guduru', 'oromia', NULL, 'haha', '+251 667 228 993', NULL, 'other', 'under_construction', 10, '553.80', 2025, 1, 1, NULL, NULL, NULL, '2025-12-21 07:44:57', '2025-12-21 07:44:57'),
(7, '71', '3', 'Ginjo Guduru', 'Ginjo Guduru', 'Oromia', NULL, 'hkg', '+251 983 991 110', NULL, 'other', 'under_construction', 10, '344.70', 2025, 1, 1, NULL, NULL, NULL, '2025-12-21 07:48:23', '2025-12-21 07:48:23'),
(8, '93', '4', 'Ginjo Guduru', 'Ginjo Guduru', 'oromia', NULL, 'hjfa', '+251 992 330 220', NULL, 'other', 'damaged', 10, '444.70', 2025, 1, 1, NULL, NULL, NULL, '2025-12-21 07:56:11', '2025-12-21 07:56:11'),
(9, '89', '7', 'Ginjo Guduru', 'Ginjo Guduru', 'oromia', NULL, 'giuoag', '+251 922 222 411', NULL, 'mixed', 'damaged', 4, '737.90', 2025, 1, 1, NULL, NULL, NULL, '2025-12-21 07:59:08', '2025-12-21 07:59:08'),
(10, '45', '5', 'Ginjo Guduru', 'Ginjo Guduru', 'oromia', NULL, 'uaaghj', '+251 999 111 201', NULL, 'commercial', 'damaged', 6, '456.00', 2025, 1, 1, NULL, NULL, NULL, '2025-12-21 08:04:06', '2025-12-21 08:04:06'),
(11, '85', '8', 'Ginjo Guduru', 'Ginjo Guduru', 'Oromia', NULL, 'Saint_Gabriel', '+251 983 200 172', NULL, 'religious', 'occupied', 7, '346.00', 2025, 1, 1, NULL, NULL, NULL, '2025-12-21 08:09:50', '2025-12-21 08:09:50'),
(12, '81', '8', 'Ginjo Guduru', 'Ginjo Guduru', 'Oromia', NULL, 'Saint_Gabriel', '+251 983 204 172', NULL, 'religious', 'occupied', 7, '346.00', 2025, 1, 1, NULL, NULL, NULL, '2025-12-21 08:10:58', '2025-12-21 08:10:58'),
(13, '42', '2', 'Ginjo Guduru', 'Ginjo Guduru', 'oromia', NULL, 'jkf', '+251 945 003 287', NULL, 'residential', 'vacant', 3, '419.00', 2025, 1, 1, NULL, NULL, NULL, '2025-12-21 08:15:33', '2025-12-21 08:15:33'),
(14, '83', 'Zone 2', 'Ginjo Guduru', 'Ginjo Guduru', 'Oromia', NULL, 'Reduwan Nura', '0978651256', NULL, 'residential', 'under_construction', 15, '497.00', 2025, 1, 1, NULL, NULL, NULL, '2025-12-26 18:19:31', '2025-12-26 18:19:31');

-- --------------------------------------------------------

--
-- Table structure for table `id_cards`
--

CREATE TABLE `id_cards` (
  `id` int(11) NOT NULL,
  `card_number` varchar(20) NOT NULL,
  `individual_id` int(11) NOT NULL,
  `family_id` int(11) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `status` enum('issued','pending','delivered','expired','revoked','lost') DEFAULT 'pending',
  `blood_type` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') DEFAULT NULL,
  `emergency_contact` varchar(20) DEFAULT NULL,
  `place_of_birth` varchar(100) DEFAULT NULL,
  `residence_address` varchar(255) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `zone` varchar(100) DEFAULT NULL,
  `woreda` varchar(100) DEFAULT NULL,
  `kebele` varchar(100) DEFAULT NULL,
  `house_number` varchar(20) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `signature_url` varchar(255) DEFAULT NULL,
  `issued_by` int(11) DEFAULT NULL,
  `delivered_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `id_cards`
--

INSERT INTO `id_cards` (`id`, `card_number`, `individual_id`, `family_id`, `issue_date`, `expiry_date`, `status`, `blood_type`, `emergency_contact`, `place_of_birth`, `residence_address`, `region`, `zone`, `woreda`, `kebele`, `house_number`, `photo_url`, `signature_url`, `issued_by`, `delivered_at`, `created_at`, `updated_at`) VALUES
(1, 'ET-2025-000001', 26, NULL, '2025-12-18', '2035-12-18', 'issued', 'A+', '', NULL, NULL, NULL, NULL, NULL, 'Ginjo', '87', NULL, NULL, 1, NULL, '2025-12-18 14:02:37', '2025-12-18 14:02:37'),
(2, 'ET-2025-000002', 24, NULL, '2025-12-18', '2035-12-18', 'issued', 'A+', '', NULL, NULL, NULL, NULL, NULL, 'ginjo', '73', NULL, NULL, 1, NULL, '2025-12-18 14:09:34', '2025-12-18 14:09:34'),
(3, 'ET-2025-000003', 21, NULL, '2025-12-18', '2035-12-18', 'issued', 'A+', '', NULL, NULL, NULL, NULL, NULL, 'Ginjo Guduru', '94', NULL, NULL, 1, NULL, '2025-12-18 15:59:37', '2025-12-18 15:59:37'),
(4, 'ET-2025-000004', 22, NULL, '2025-12-18', '2035-12-18', 'issued', 'A+', '+251 984 009 400', NULL, NULL, NULL, NULL, NULL, 'Ginjo Guduru', '40', NULL, NULL, 1, NULL, '2025-12-18 17:39:38', '2025-12-18 17:39:38'),
(5, 'ET-2025-000005', 27, NULL, '2025-12-26', '2035-12-26', 'issued', 'A+', '+251 988 321 030', NULL, NULL, NULL, NULL, NULL, 'Ginjo Guduru', '39', NULL, NULL, 1, NULL, '2025-12-26 18:25:55', '2025-12-26 18:25:55');

-- --------------------------------------------------------

--
-- Table structure for table `individuals`
--

CREATE TABLE `individuals` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `age` int(11) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `religion` enum('islam','orthodox','protestant','catholic','other') NOT NULL,
  `nationality` varchar(50) DEFAULT 'ethiopian',
  `occupation` varchar(100) NOT NULL,
  `education` enum('none','primary','secondary','diploma','bachelor','masters','phd') NOT NULL,
  `family_number` varchar(50) NOT NULL,
  `house_number` varchar(50) NOT NULL,
  `relationship` enum('head','spouse','child','parent','sibling','other') NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `family_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `individuals`
--

INSERT INTO `individuals` (`id`, `first_name`, `last_name`, `dob`, `age`, `gender`, `religion`, `nationality`, `occupation`, `education`, `family_number`, `house_number`, `relationship`, `phone`, `email`, `photo_url`, `is_active`, `created_at`, `updated_at`, `deleted_at`, `family_id`) VALUES
(8, 'meskel', 'meskel', '2002-11-08', 23, 'male', 'orthodox', 'ethiopian', 'Student', 'secondary', '2', '27', 'head', '+251947209009', NULL, '/uploads/individual-meskel101-1762677579408-899788316.jpeg', 1, '2025-11-09 08:39:39', '2025-12-15 19:46:04', NULL, 7),
(21, 'umera', 'umera', '2000-07-13', 25, 'male', 'orthodox', 'ethiopian', 'Student', 'bachelor', '3', '94', 'head', '+251900003870', NULL, '/uploads/individual-dreamina-2025-08-04-5119-one-of-the-balls--it-doesn-t-matter-whic----1763141610092-248589629.jpeg', 1, '2025-11-14 17:33:30', '2025-12-15 19:18:05', NULL, 3),
(22, 'sol', 'wende', '1999-10-15', 26, 'male', 'orthodox', 'ethiopian', 'Employee', 'bachelor', '8', '40', 'spouse', '+251975844004', NULL, '/uploads/individual-jimma2-1763181430762-756403533.jpg', 1, '2025-11-15 04:37:11', '2025-12-17 12:26:26', NULL, 7),
(23, 'mine', 'last', '2002-12-14', 22, 'male', 'orthodox', 'ethiopian', 'Student', 'masters', '9', '24', 'parent', '+251983994299', NULL, '/uploads/individual-untitled-design--1----copy-1763181639786-823001640.png', 1, '2025-11-15 04:40:39', '2025-12-17 12:19:31', NULL, 9),
(24, 'Semira', 'bedane', '2002-07-08', 23, 'female', 'orthodox', 'ethiopian', 'employee', 'masters', '24', '73', 'spouse', '+251957933409', NULL, '/uploads/individual-hanan-1765264549397-627176359.jpeg', 1, '2025-12-09 07:15:49', '2025-12-15 19:47:58', NULL, 8),
(25, 'derartu', 'shiferaw', '2000-11-14', 25, 'female', 'orthodox', 'ethiopian', 'Employee', 'masters', '7', '17', 'head', '+251922009344', NULL, '/uploads/individual-ww-1765694329370-52208328.jpeg', 1, '2025-12-14 06:38:49', '2025-12-17 12:54:30', NULL, 7),
(26, 'Natnale', 'Banjaw', '1999-07-18', 26, 'male', 'protestant', 'ethiopian', 'student', 'masters', '5', '87', 'head', '+251966788399', NULL, '/uploads/individual-expired-id-1766058473388-571784577.jpg', 1, '2025-12-18 11:47:53', '2025-12-18 11:47:53', NULL, NULL),
(27, 'Reduwan', 'Muleta', '1997-11-25', 28, 'male', 'islam', 'ethiopian', 'Student', 'masters', '6', '39', 'head', '+251988488200', NULL, '/uploads/individual-20251129-112301-1766768379788-836849975.jpg', 1, '2025-12-26 16:59:39', '2026-02-04 12:54:15', NULL, NULL),
(28, 'Sebrina', 'aman', '2002-05-12', 23, 'male', 'islam', 'ethiopian', 'student', 'masters', '5', '42', 'spouse', '+251933476534', NULL, '/uploads/individual-birr-1770883152596-600608683.png', 1, '2026-02-12 07:59:12', '2026-02-12 07:59:12', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` enum('Administrator','Data Entry Clerk','View Only') NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin@ginjoguduru.gov.et', 'admin123', 'Admin User', 'Administrator', 'Active', '2025-12-26 08:19:57', '2025-12-26 08:19:57'),
(2, 'clerk@ginjoguduru.gov.et', 'clerk123', 'Data Entry Clerk', 'Data Entry Clerk', 'Active', '2025-12-26 08:19:57', '2025-12-26 08:19:57'),
(3, 'viewer@ginjoguduru.gov.et', 'viewer123', 'View Only User', 'View Only', 'Active', '2025-12-26 08:19:57', '2025-12-26 08:19:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `families`
--
ALTER TABLE `families`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `family_number` (`family_number`),
  ADD UNIQUE KEY `house_number` (`house_number`),
  ADD KEY `idx_family_head` (`head_id`),
  ADD KEY `idx_family_house` (`house_number`),
  ADD KEY `idx_family_number` (`family_number`);

--
-- Indexes for table `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `house_number` (`house_number`),
  ADD KEY `idx_house_number` (`house_number`),
  ADD KEY `idx_zone` (`zone`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`);

--
-- Indexes for table `id_cards`
--
ALTER TABLE `id_cards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `card_number` (`card_number`),
  ADD KEY `idx_card_number` (`card_number`),
  ADD KEY `idx_individual_id` (`individual_id`),
  ADD KEY `idx_family_id` (`family_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_issue_date` (`issue_date`);

--
-- Indexes for table `individuals`
--
ALTER TABLE `individuals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_family_number` (`family_number`),
  ADD KEY `idx_house_number` (`house_number`),
  ADD KEY `idx_is_active` (`is_active`),
  ADD KEY `idx_individual_family` (`family_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `families`
--
ALTER TABLE `families`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `houses`
--
ALTER TABLE `houses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `id_cards`
--
ALTER TABLE `id_cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `individuals`
--
ALTER TABLE `individuals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `families`
--
ALTER TABLE `families`
  ADD CONSTRAINT `families_ibfk_1` FOREIGN KEY (`head_id`) REFERENCES `individuals` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `id_cards`
--
ALTER TABLE `id_cards`
  ADD CONSTRAINT `id_cards_ibfk_1` FOREIGN KEY (`individual_id`) REFERENCES `individuals` (`id`),
  ADD CONSTRAINT `id_cards_ibfk_2` FOREIGN KEY (`family_id`) REFERENCES `families` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `individuals`
--
ALTER TABLE `individuals`
  ADD CONSTRAINT `individuals_ibfk_1` FOREIGN KEY (`family_id`) REFERENCES `families` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
