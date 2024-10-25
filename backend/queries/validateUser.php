<?php
	require "db.php";
	if (!isset($_SESSION["userId"])) {
		redirect("../../");
		return;
	}
?>