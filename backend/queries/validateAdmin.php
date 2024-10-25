<?php
	require "validateUser.php";

	if (!isset($_SESSION["isAdmin"]))
		redirect("./user_homepage.php");

	if ($_SESSION["isAdmin"] != 1)
		redirect("./user_homepage.php");
?>