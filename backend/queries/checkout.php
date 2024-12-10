<?php
	session_start();
	require "db.php";
	require "validateUserLocation.php";
	
	if (!isset($_SESSION["userId"])) {
		print_r("NO USER");
		return;
	}
	if (!isset($_GET["itemId"])) {
		print_r("NO ITEM");
		return;
	}
	if (!isset($_GET["quantity"])) {
		print_r("NO QUANTITY");
		return;
	}
	
	$userId = $_SESSION["userId"];
	$itemId = $_GET["itemId"];
	$quantity = $_GET["quantity"];

	$item = $db->query("SELECT * FROM items WHERE id = $itemId");
	$itemDetails = $item->fetch_assoc();
	if ($itemDetails["stock"] - $quantity < 0) {
		print_r("NO STOCK");
		return;
	}
	if(!isset($_GET["returnDate"])){
		if($itemDetails["borrowable"]==1){
			print_r("NO RETURN DATE");
			return;
		} else {
			$_GET["returnDate"] = NULL;
		}
	}
	
	// Check if the user is allowed in the item's location
	$location_name = $itemDetails["location_name"];
	if (!isUserAllowedInLocation($userId, $location_name)) {
		print_r("NOT ALLOWED IN LOCATION");
		return;
	}

	$mutation = $db->prepare("INSERT INTO reservations (item_id, user_id, amount, date_expected_to_return) VALUES (?, ?, ?, ?)");
	$mutation->bind_param("iiis", $itemId, $userId, $quantity, $_GET["returnDate"]);
	$mutation->execute();

//	$row = $result->fetch_assoc();
	$id = mysqli_insert_id($db);
	$query = $db->query("SELECT * FROM reservations WHERE id = $id");
	$row = $query->fetch_assoc();
	print_r(json_encode($row));

	$update = $db->prepare("UPDATE items SET stock = stock - $quantity WHERE id = $itemId");
	$update->execute();
?>