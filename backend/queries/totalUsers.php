<?php
	require "db.php";
	require "validateUserLocation.php";
	
	session_start();
	
	if (!isset($_SESSION["userId"], $_SESSION["isAdmin"])) {
		echo json_encode(['error' => 'User is not logged in or not an admin.']);
		return;
	}
	
	$userId = $_SESSION["userId"];
	$isAdmin = $_SESSION["isAdmin"];
	
	if ($isAdmin != 1) {
		echo json_encode(['error' => 'User is not an admin.']);
		return;
	}
	
	if (!isset($_GET["locationName"])) {
		echo json_encode(['error' => 'Location name is required.']);
		return;
	}
	
	$locationName = $_GET["locationName"];

// Check if the admin is allowed in the location
	if (!isUserAllowedInLocation($userId, $locationName)) {
		echo json_encode(['error' => 'Admin is not allowed in this location.']);
		return;
	}
	
	global $db;
	$query = $db->prepare("SELECT COUNT(*) as totalUsers FROM alloweduserlocations WHERE location_name = ?");
	$query->bind_param("s", $locationName);
	$query->execute();
	
	$result = $query->get_result();
	$users = $result->fetch_assoc();
	
	header('Content-Type: application/json');
	echo json_encode($users);
?>