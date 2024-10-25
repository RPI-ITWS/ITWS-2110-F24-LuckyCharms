<?php
	require "db.php";
	if (!isset($_SESSION["userId"])) {
		redirect("../../");
		return;
	}
	echo $_SESSION["userId"];
?>