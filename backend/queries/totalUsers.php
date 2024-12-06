<?php
	require "db.php";
	
	if (!isset($_GET["locationName"])) return;
	
	$locationName = $_GET["locationName"];
	
	global $db;
	$query = $db->prepare("SELECT COUNT(*) as totalUsers FROM alloweduserlocations WHERE location_name = ?");
	$query->bind_param("s", $locationName);
	$query->execute();
	
	$result = $query->get_result();
	$users = $result->fetch_assoc();
	
	header('Content-Type: application/json');
	echo json_encode($users);
?>