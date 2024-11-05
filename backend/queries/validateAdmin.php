<?php
	require "validateUser.php";

	if (!isset($_SESSION["isAdmin"]))
		redirect("../user");

	if ($_SESSION["isAdmin"] != 1)
		redirect("../user");
?>