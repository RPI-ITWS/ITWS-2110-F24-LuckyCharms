<?php
	require "db.php";
	$reservationId = $_GET["reservationId"];
	$returnDate = $_GET["returnDate"];
	$completed = 1;

	$mutation = $db->prepare("UPDATE reservations SET completed=?, date_returned=? WHERE id = ?;");
	$mutation->bind_param("isi", $completed, $returnDate, $reservationId);
	$mutation->execute();

	$query = $db->query("SELECT * FROM reservations WHERE id = $reservationId");
	$row = $query->fetch_assoc();
	print_r(json_encode($row));
?>