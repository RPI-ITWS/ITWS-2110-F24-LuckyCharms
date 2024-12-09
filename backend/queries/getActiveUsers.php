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
	
	if (!isset($_GET["locationName"], $_GET["page"])) {
		echo json_encode(['error' => 'Location name and page are required.']);
		return;
	}
	
	$locationName = $_GET["locationName"];
	$page = $_GET["page"];
	$offset = ($page - 1) * $itemLimit;

// Check if the admin is allowed in the location
	if (!isUserAllowedInLocation($userId, $locationName)) {
		echo json_encode(['error' => 'Admin is not allowed in this location.']);
		return;
	}
	
	global $db;
	$query = $db->prepare("SELECT user_id FROM alloweduserlocations WHERE location_name = ? LIMIT $itemLimit OFFSET ?");
	$query->bind_param("si", $locationName, $offset);
	$query->execute();
	
	$result = $query->get_result();
	
	$users = array();
	if ($result->num_rows != 0) {
		while ($row = $result->fetch_assoc()) {
			$users[] = $row;
		}
	}
	
	header('Content-Type: application/json');
	echo json_encode($users);
?>