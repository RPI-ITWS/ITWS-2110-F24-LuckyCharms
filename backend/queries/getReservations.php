<?php
	require "db.php";
	session_start();
	
	if (!isset($_SESSION["userId"], $_GET["getAllReservations"], $_GET["page"], $_GET["searchValue"])) return;
	
	$userId = $_SESSION["userId"];
	$getAllReservations = $_GET["getAllReservations"] === "true";
	$page = $_GET["page"];
	$searchValue = '%'.$_GET["searchValue"].'%';
	$offset = ($page - 1) * $itemLimit;
	
	// Users can't perform SQL injection with session tokens so directly placing in the variable should be fine
	$allowedLocationsQuery = $db->query("SELECT location_name FROM alloweduserlocations WHERE user_id = $userId");
	
	$allowedLocations = array();
	
	while ($row = $allowedLocationsQuery->fetch_assoc()) {
		array_push($allowedLocations, $row['location_name']);
	}
	
	$allowedLocationsList = "'" . implode("','", $allowedLocations) . "'";
	
	$query = $db->prepare("
    SELECT reservations.*, items.location_name, items.name, items.borrowable, users.username
    FROM reservations
    JOIN items ON reservations.item_id = items.id
    JOIN users ON reservations.user_id = users.id
    WHERE (
        $_SESSION[isAdmin] = 1
        OR (items.location_name IN ($allowedLocationsList) AND reservations.user_id = $userId)
    ) AND (
        $_SESSION[isAdmin] = 1 AND users.username LIKE ?
        OR $_SESSION[isAdmin] = 0 AND items.name LIKE ?
    ) " . ($getAllReservations ? "" : " AND reservations.cancelled = 0 AND reservations.completed = 0") . "
    ORDER BY " . ($getAllReservations ? "reservations.cancelled, reservations.completed, reservations.date_reserved DESC" : "reservations.date_expected_to_return ASC") . "
    LIMIT $itemLimit OFFSET ?
");
	$query->bind_param("ssi", $searchValue, $searchValue, $offset);
	$query->execute();
	
	$result = $query->get_result();
	
	$reservations = array();
	while ($row = $result->fetch_assoc()) {
		array_push($reservations, $row);
	}
	
	print_r(json_encode($reservations));
?>