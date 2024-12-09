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
	
	$reservationId = intval($_GET['reservationId']);
	$userId = $_SESSION["userId"]; // Assuming user ID is stored in session
	$isAdmin = $_SESSION["isAdmin"]; // Assuming admin status is stored in session

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
		echo json_encode(['error' => 'You are not allowed to complete this reservation']);
		return;
	}

// Check if the admin is allowed in the item's location
	$itemQuery = $db->prepare("SELECT location_name, borrowable, stock FROM items WHERE id = ?");
	$itemQuery->bind_param("i", $itemId);
	$itemQuery->execute();
	$itemResult = $itemQuery->get_result();
	
	if ($itemResult->num_rows === 0) {
		echo json_encode(['error' => 'Item not found']);
		return;
	}
	
	$itemRow = $itemResult->fetch_assoc();
	$locationName = $itemRow['location_name'];
	$borrowable = $itemRow['borrowable'];
	$currentStock = $itemRow['stock'];
	
	if (!isUserAllowedInLocation($userId, $locationName)) {
		echo json_encode(['error' => 'Admin is not allowed to complete this reservation']);
		return;
	}
	
	$dateReturned = $_GET["returnDate"];

// Update the reservation status to completed
	$query = $db->prepare("UPDATE reservations SET completed = 1, date_returned = ? WHERE id = ?");
	$query->bind_param('si', $dateReturned, $reservationId);
	
	if ($query->execute()) {
		// If the item is borrowable, update the stock quantity
		if ($borrowable == 1) {
			$newStock = $currentStock + $amount;
			$updateStockQuery = $db->prepare("UPDATE items SET stock = ? WHERE id = ?");
			$updateStockQuery->bind_param("ii", $newStock, $itemId);
			$updateStockQuery->execute();
		}
		echo json_encode(['success' => true]);
	} else {
		echo json_encode(['error' => 'Failed to complete reservation']);
	}
?>