<?php
	session_start();
	require "db.php";
	if (isset($_SESSION["userId"])) {
		unset($_SESSION["userId"]);
	}
	if (isset($_SESSION["isAdmin"])) {
		unset($_SESSION["isAdmin"]);
	}
?>