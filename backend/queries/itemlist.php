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
	$location_name = $_GET["locationName"];

// Check if the user is allowed in the location
	if (!isUserAllowedInLocation($userId, $location_name)) {
		echo json_encode(['error' => 'User is not allowed in this location.']);
		return;
	}
	
	$validItems = array();
	$query = $db->prepare("SELECT * FROM items WHERE location_name = ?;");
	$query->bind_param("s", $location_name);
	$query->execute();
	$result = $query->get_result();
	
	while ($row = $result->fetch_assoc()) {
		$validItems[] = $row;
	}
	
	echo json_encode($validItems);
?>