<?php
	require "db.php";
	$reservationId = $_GET["reservationId"];
	$cancelled = 1;

	$mutation = $db->prepare("UPDATE reservations SET cancelled=? WHERE id = ?;");
	$mutation->bind_param("isi", $cancelled, $reservationId);
	$mutation->execute();

	$query = $db->query("SELECT * FROM reservations WHERE id = $reservationId");
	$row = $query->fetch_assoc();
	print_r(json_encode($row));
?>