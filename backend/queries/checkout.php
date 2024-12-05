<?php
	require "db.php";
	session_start();
	
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
	if (!isset($_GET["reason"])) {
		print_r("NO REASON");
		return;
	}
	if (!isset($_GET["returnDate"])) {
		print_r("NO RETURN DATE");
		return;
	}
	
	$userId = $_SESSION["userId"];
	$itemId = $_GET["itemId"];
	$quantity = $_GET["quantity"];
	$reason = $_GET["reason"];
	$returnDate = $_GET["returnDate"];

	$returnDateTime = $returnDate . " 17:00:00";

	$item = $db->query("SELECT * FROM items WHERE id = $itemId");
	$itemDetails = $item->fetch_assoc();
	if ($itemDetails["stock"] - $quantity < 0) {
		print_r("NO STOCK");
		return;
	}

	$mutation = $db->prepare("INSERT INTO reservations (item_id, user_id, amount, date_reserved, date_expected_to_return) VALUES (?, ?, ?, NOW(), ?)");
	$mutation->bind_param("iiis", $itemId, $userId, $quantity, $returnDateTime);
	$mutation->execute();

	$id = mysqli_insert_id($db);
	$query = $db->query("SELECT * FROM reservations WHERE id = $id");
	$row = $query->fetch_assoc();
	print_r(json_encode($row));

	$update = $db->prepare("UPDATE items SET stock = stock - $quantity WHERE id = $itemId");
	$update->execute();
?>