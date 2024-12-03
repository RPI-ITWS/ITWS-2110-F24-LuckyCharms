<?php
	session_start();
	if (!isset($_SESSION["isAdmin"])) {
		echo false;
		return;
	}
	echo $_SESSION["isAdmin"];
?>