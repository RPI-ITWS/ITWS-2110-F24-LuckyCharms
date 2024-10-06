<?php
	require "db.php";
	$itemId = $_GET["itemId"];
	$userId = $_GET["userId"];
	$itemCount = $_GET["itemCount"];

	$item = $db->query("SELECT * FROM items WHERE id = $itemId");
	$itemDetails = $item->fetch_assoc();
	if ($itemDetails["stock"] - $itemCount < 0) {
		print_r("NO STOCK");
		return;
	}


	$mutation = $db->prepare("INSERT INTO reservations (item_id, user_id, amount, date_expected_to_return) VALUES (?, ?, ?, ?)");
	$mutation->bind_param("iiis", $itemId, $userId, $itemCount, $_GET["returnDate"]);
	$mutation->execute();

//	$row = $result->fetch_assoc();
	$id = mysqli_insert_id($db);
	$query = $db->query("SELECT * FROM reservations WHERE id = $id");
	$row = $query->fetch_assoc();
	print_r(json_encode($row));

	$update = $db->prepare("UPDATE items SET stock = stock - $itemCount WHERE id = $itemId");
	$update->execute();
?>