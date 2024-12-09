<?php
	require "db.php";
	require "validateUserLocation.php";
	
	session_start();
	
	if (!isset($_SESSION["userId"])) {
		echo json_encode(['error' => 'User is not logged in.']);
		return;
	}
	
	if (!isset($_GET["locationName"]) || !isset($_GET["page"])) {
		echo json_encode(['error' => 'Location name and page are required.']);
		return;
	}
	
	$userId = $_SESSION["userId"];
	$location_name = $_GET["locationName"];
	$page = $_GET["page"];

// Check if the user is allowed in the location
	if (!isUserAllowedInLocation($userId, $location_name)) {
		echo json_encode(['error' => 'User is not allowed in this location.']);
		return;
	}

// Name is optional
	$name = "";
	if (isset($_GET["name"])) {
		$name = $_GET["name"];
	}
	$name = '%' . $name . '%';

// limit constant is 10 for now, can change in the future
	$itemLimit = 10;
	$offset = ($page - 1) * $itemLimit;
	
	$query = "SELECT * FROM items WHERE location_name = ? AND name LIKE ? LIMIT ? OFFSET ?";
	$result = $db->prepare($query);
	$result->bind_param("ssii", $location_name, $name, $itemLimit, $offset);
	$result->execute();
	
	$items = $result->get_result();
	$filteredItems = array();
	while ($row = $items->fetch_assoc()) {
		array_push($filteredItems, $row);
	}
	
	echo json_encode($filteredItems);
?>