<?php
	require "db.php";
	require "validateUserLocation.php";
	
	session_start();
	
	if (!isset($_SESSION["userId"])) {
		echo json_encode(['error' => 'User is not logged in.']);
		return;
	}
	
	if (!isset($_GET["locationName"])) {
		echo json_encode(['error' => 'Location name is required.']);
		return;
	}
	
	$userId = $_SESSION["userId"];
	$locationName = $_GET["locationName"];

// Check if the user is allowed in the location
	if (!isUserAllowedInLocation($userId, $locationName)) {
		echo json_encode(['error' => 'User is not allowed in this location.']);
		return;
	}

// Name is optional
	$name = "";
	if (isset($_GET["name"])) {
		$name = $_GET["name"];
	}
	$name = '%' . $name . '%';
	
	$query = $db->prepare("SELECT COUNT(*) as totalItems FROM items WHERE location_name = ? AND name LIKE ?;");
	$query->bind_param("ss", $locationName, $name);
	$query->execute();
	$result = $query->get_result();
	
	print_r(json_encode(['totalItems' => $result->fetch_assoc()['totalItems'], 'itemLimit' => $itemLimit]));
?>