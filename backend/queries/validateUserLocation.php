<?php
	function isUserAllowedInLocation($userId, $locationName): bool {
		global $db;
		
		$query = $db->prepare("SELECT 1 FROM alloweduserlocations WHERE user_id = ? AND location_name = ?");
		$query->bind_param("is", $userId, $locationName);
		$query->execute();
		
		$result = $query->get_result();
		
		return $result->num_rows > 0;
	}
?>