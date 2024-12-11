<?php
	session_start();
	require "db.php";
	require "validateUserLocation.php";
	
	if (!isset($_GET['reservationId'])) {
		echo json_encode(['error' => 'Reservation ID is required']);
		return;
	}
	
	if (!isset($_GET["returnDate"])) {
		echo json_encode(['error' => 'Date Required']);
		return;
	}
	
	if (!isset($_SESSION["userId"], $_SESSION["isAdmin"])) {
		echo json_encode(['error' => 'User is not logged in.']);
		return;
	}
	
	$reservationId = $_GET["reservationId"];
	$userId = $_SESSION["userId"];
	$isAdmin = $_SESSION["isAdmin"];

// Verify that the reservation belongs to the logged-in user or is an admin
	$query = $db->prepare("SELECT user_id, item_id, amount FROM reservations WHERE id = ?");
	$query->bind_param("i", $reservationId);
	$query->execute();
	$result = $query->get_result();
	
	if ($result->num_rows === 0) {
		echo json_encode(['error' => 'Reservation not found']);
		return;
	}
	
	$row = $result->fetch_assoc();
	$itemId = $row['item_id'];
	$amount = $row['amount'];
	
	if ($isAdmin != 1) {
		echo json_encode(['error' => 'You are not allowed to cancel this reservation']);
		return;
	}

// Check if the admin is allowed in the item's location
	$itemQuery = $db->prepare("SELECT location_name, stock FROM items WHERE id = ?");
	$itemQuery->bind_param("i", $itemId);
	$itemQuery->execute();
	$itemResult = $itemQuery->get_result();
	
	if ($itemResult->num_rows === 0) {
		echo json_encode(['error' => 'Item not found']);
		return;
	}
	
	$itemRow = $itemResult->fetch_assoc();
	$locationName = $itemRow['location_name'];
	$currentStock = $itemRow['stock'];
	
	if (!isUserAllowedInLocation($userId, $locationName)) {
		echo json_encode(['error' => 'Admin is not allowed to cancel this reservation']);
		return;
	}
	
	$dateReturned = date('Y-m-d H:i:s');
	$cancelled = 1;

// Update the reservation status to cancelled
	$mutation = $db->prepare("UPDATE reservations SET cancelled = ?, date_returned = ? WHERE id = ?");
	$mutation->bind_param("iss", $cancelled, $dateReturned, $reservationId);
	
	if ($mutation->execute()) {
		// Update the stock quantity of the item
		$newStock = $currentStock + $amount;
		$updateStockQuery = $db->prepare("UPDATE items SET stock = ? WHERE id = ?");
		$updateStockQuery->bind_param("ii", $newStock, $itemId);
		$updateStockQuery->execute();
		
		echo json_encode(['success' => true]);
	} else {
		echo json_encode(['error' => 'Failed to cancel reservation']);
	}
?>