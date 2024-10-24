<?php
	require "validateUser.php";

	if ($user["is_admin"] != 1) {
		redirect("./user_homepage.php");
	}
?>