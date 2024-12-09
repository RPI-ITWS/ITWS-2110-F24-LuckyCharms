<?php
	require "db.php";
	
	global $db;
	$userId = $_GET["userId"];
	
	$query = $db->prepare("SELECT * FROM users WHERE id = ?");
	$query->bind_param("i", $userId);
	$query->execute();
	$result = $query->get_result()->fetch_assoc();
	
	header('Content-Type: application/json');
	echo json_encode($result);
?>