<?php
	require "db.php";
	session_start();
	
	if (!isset($_SESSION["userId"], $_GET["getAllReservations"])) return;
	
	$userId = $_SESSION["userId"];
	$getAllReservations = $_GET["getAllReservations"] === "true";
	
	// Users can't perform SQL injection with session tokens so directly placing in the variable should be fine
	$allowedLocationsQuery = $db->query("SELECT location_name FROM alloweduserlocations WHERE user_id = $userId");
	
	$allowedLocations = array();
	
	while ($row = $allowedLocationsQuery->fetch_assoc()) {
		array_push($allowedLocations, $row['location_name']);
	}
	
	$allowedLocationsList = "'" . implode("','", $allowedLocations) . "'";
	
	$query = $db->query("
    SELECT COUNT(*) as totalReservations
    FROM reservations
    JOIN items ON reservations.item_id = items.id
    JOIN users ON reservations.user_id = users.id
    WHERE (
        items.location_name IN ($allowedLocationsList) AND (reservations.user_id = $userId OR $_SESSION[isAdmin] = 1)
    )
    " . ($getAllReservations ? "" : " AND reservations.cancelled = 0 AND reservations.completed = 0") . "
    ORDER BY " . ($getAllReservations ? "reservations.cancelled, reservations.completed, reservations.date_reserved DESC" : "reservations.date_expected_to_return ASC")
	);
	
	
	$reservationsTotal = $query->fetch_assoc();
	
	print_r(json_encode($reservationsTotal));
?>