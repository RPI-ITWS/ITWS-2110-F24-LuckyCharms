<?php
	require "db.php";

	$userId = $_GET["userId"];

	$result = $db->prepare("SELECT location_name FROM alloweduserlocations WHERE user_id = ?");

	$result->bind_param("i", $userId);
	$result->execute();
	$locations = $result->get_result();

	$userLocations = array();
	while ($row = $locations->fetch_assoc()) {
		array_push($userLocations, $row);
	}

	print_r(json_encode($userLocations));
?>