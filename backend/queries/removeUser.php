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
	
	if (!isset($_GET["username"], $_GET["labName"])) {
		echo json_encode(['error' => 'Username and lab name are required.']);
		return;
	}
	
	$username = $_GET["username"];
	$labName = $_GET["labName"];

// Check if the admin is allowed in the location
	if (!isUserAllowedInLocation($userId, $labName)) {
		echo json_encode(['error' => 'Admin is not allowed in this location.']);
		return;
	}
	
	global $db;
	
	$query = $db->prepare("SELECT id FROM users WHERE username = ?;");
	$query->bind_param("s", $username);
	$query->execute();
	
	$result = $query->get_result();
	
	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		$userId = (int) $row['id'];
		
		$nextQuery = $db->prepare("DELETE FROM alloweduserlocations WHERE user_id = ? AND location_name = ?");
		$nextQuery->bind_param("is", $userId, $labName);
		
		if ($nextQuery->execute()) {
			header("Content-Type: application/json");
			echo json_encode(["success" => true]);
		} else {
			header("Content-Type: application/json");
			echo json_encode(["error" => "Database operation failed"]);
		}
	} else {
		header("Content-Type: application/json");
		echo json_encode(["error" => "User not found"]);
	}
?>