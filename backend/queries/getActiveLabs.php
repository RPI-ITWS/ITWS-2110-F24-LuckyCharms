<?php
	require "db.php";
	$userId = $_GET["userId"];
	$result = $db->query("SELECT location_name FROM alloweduserlocations WHERE user_id = $userId");

	$locations = array();

	if ($result->num_rows == 0) {
		echo "This user has no locations for them";
		return;
	} else {
		while ($row = $result->fetch_assoc()) {
			$locations[] = $row;
		}
	}
	print_r(json_encode($locations));
?>