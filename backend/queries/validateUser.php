<?php
	function validateUser() {
		if (isset($_SESSION["userId"]))
			return true;
		return false;
	}
?>