<?php
    require "db.php";
		if (!isset($_GET["id"])) {
      return;
    }
		$id = $_GET["id"];
		$result = $db->query("SELECT * FROM items WHERE id = $id");
		print_r(json_encode($result->fetch_assoc()));
?>