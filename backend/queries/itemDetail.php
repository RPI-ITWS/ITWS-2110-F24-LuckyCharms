<?php
	require "db.php";
	require "validateUserLocation.php";
	
	session_start();
	
	if (!isset($_SESSION["userId"])) {
		echo json_encode(['error' => 'User is not logged in.']);
		return;
	}
	
	if (!isset($_GET["id"])) {
		echo json_encode(['error' => 'Item ID is required.']);
		return;
	}
	
	$userId = $_SESSION["userId"];
	$itemId = $_GET["id"];

// Retrieve item details
	$itemQuery = $db->prepare("SELECT * FROM items WHERE id = ?");
	$itemQuery->bind_param("i", $itemId);
	$itemQuery->execute();
	$itemResult = $itemQuery->get_result();
	
	if ($itemResult->num_rows === 0) {
		echo json_encode(['error' => 'Item not found.']);
		return;
	}
	
	$itemRow = $itemResult->fetch_assoc();
	$locationName = $itemRow['location_name'];

// Check if the user is allowed in the item's location
	if (!isUserAllowedInLocation($userId, $locationName)) {
		echo json_encode(['error' => 'User is not allowed in this location.']);
		return;
	}
	
	echo json_encode($itemRow);
?>