<?php
	require "db.php";

	if (!isset($_SESSION["userId"])) {
		redirect("../");
		return;
	}
	$id = $_SESSION["userId"];

	$query = $db->prepare("SELECT * FROM users WHERE id = ?");
	$query->bind_param("i", $id);
	$query->execute();

	$user = $query->get_result()->fetch_assoc();
	if (!$user["id"]) {
		redirect("../");
		return;
	}
?>