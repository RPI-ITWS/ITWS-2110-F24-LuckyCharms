<?php
	require "db.php";
	if (!isset($_GET["locationName"])) {
		return;
	}
	$locationName = $_GET["locationName"];
	
	// Name is optional
	$name = "";
	if (isset($_GET["name"])) {
		$name = $_GET["name"];
	}
	$name = '%'.$name.'%';
	
	$query = $db->prepare("SELECT COUNT(*) as totalItems FROM items where location_name = ? AND name LIKE ?;");
	$query->bind_param("ss", $locationName, $name);
	$query->execute();
	$result = $query->get_result();
	
	print_r(json_encode(['totalItems' => $result->fetch_assoc()['totalItems'], 'itemLimit' => $itemLimit]));
?>