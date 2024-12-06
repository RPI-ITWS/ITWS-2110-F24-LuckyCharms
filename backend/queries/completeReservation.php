<?php
	require "db.php";
	
	if (!isset($_GET['reservationId'])) {
		echo json_encode(['error' => 'Reservation ID is required']);
		return;
	}
	
	$reservationId = intval($_GET['reservationId']);
	$dateReturned = date('Y-m-d H:i:s');
	
	$query = $db->prepare("UPDATE reservations SET completed = 1, date_returned = ? WHERE id = ?");
	$query->bind_param('si', $dateReturned, $reservationId);
	
	if ($query->execute()) {
		echo json_encode(['success' => true]);
	} else {
		echo json_encode(['error' => 'Failed to complete reservation']);
	}
?>