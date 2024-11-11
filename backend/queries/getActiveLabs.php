<?php
	require "db.php";
	function getActiveLabs($userId) {
		global $db;
		$result = $db->query("SELECT location_name FROM alloweduserlocations WHERE user_id = $userId");

		$locations = array();

		if ($result->num_rows != 0){
			while ($row = $result->fetch_assoc()) {
				$locations[] = $row;
			}
		}
		return json_encode($locations);
	}
?>