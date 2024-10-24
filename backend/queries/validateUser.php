<?php
	require "db.php";
	// Specific cookies not existing will be part of the return value since it's a warning
	// We want to prevent this behavior
	error_reporting(E_ERROR);

	if (!$_COOKIE["username"]) {
		redirect("./");
		return;
	}
	if (!$_COOKIE["password"]) {
		redirect("./");
		return;
	}
	$username = $_COOKIE["username"];
	$password = $_COOKIE["password"];

	$query = $db->prepare("SELECT * FROM users WHERE username = ?");
	$query->bind_param("s", $username);
	$query->execute();

	$user = $query->get_result()->fetch_assoc();
	if (!password_verify($password, $user["password"])) {
		redirect("./");
		return;
	}

	error_reporting(E_ALL);
?>