<?php
		function userInformation() {
			global $db;
			$item = $db->prepare("SELECT username, email, phone FROM users WHERE id = ?;");
			$item->bind_param("s", $_SESSION["userId"]);
			$item->execute();
			
			$result = $item->get_result();
			return json_encode($result->fetch_assoc());
		}
?>