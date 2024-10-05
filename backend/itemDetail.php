<?php
    require "db.php";
	$id = $_GET["id"];
	$result = $db->query("SELECT * FROM items WHERE id = $id");
//	if ($result->num_rows == 0) {
//		echo "There are no items matching the id.";
//	} else {
		print_r(json_encode($result->fetch_assoc()));
//	}
?>