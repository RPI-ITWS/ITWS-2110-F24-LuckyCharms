<?php
	require "db.php";
	
	if (!isset($_GET['reservationId'])) {
		echo json_encode(['error' => 'Reservation ID is required']);
		return;
	}
	$reservationId = $_GET["reservationId"];
	$dateReturned = date('Y-m-d H:i:s');
	$cancelled = 1;

	$mutation = $db->prepare("UPDATE reservations SET cancelled = ?, date_returned = ? WHERE id = ?;");
	$mutation->bind_param("iss", $cancelled, $dateReturned, $reservationId);
	
	if ($mutation->execute()) {
		echo json_encode(['success' => true]);
	} else {
		echo json_encode(['error' => 'Failed to complete reservation']);
	}
	$query = $db->query("SELECT * FROM reservations WHERE id = $reservationId");
	$row = $query->fetch_assoc();
	print_r(json_encode($row));
?>