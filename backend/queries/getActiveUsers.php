<?php
	require "db.php";
	function getActiveLabs($locationName) {
		global $db;
		$result = $db->query("SELECT user_id FROM alloweduserlocations WHERE location_name = $locationName");

		$locations = array();

		if ($result->num_rows != 0){
			while ($row = $result->fetch_assoc()) {
				$locations[] = $row;
			}
		}
		return json_encode($locations);
	}
?>