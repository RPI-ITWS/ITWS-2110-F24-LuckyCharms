<?php
		session_start();
    require "db.php";
		require "validateUserLocation.php";
		

    if (isset($_GET["itemName"], $_GET["itemType"], $_GET["itemStock"], $_GET["labName"])) {
        $name = $_GET["itemName"];
        $borrowable = $_GET["itemType"]; // borrowable
        $stock = $_GET["itemStock"];
        $location_name = $_GET["labName"];

    } else {
        return;
    }
		
		if (!isUserAllowedInLocation($_SESSION["userId"], $location_name)) {
				print_r(json_encode(['status' => 4, 'message' => 'Not allowed to add items in this location']));
				return;
		}
		
    if (isset($_GET["itemDescription"])) {
        $item_desc = $_GET["itemDescription"]; // optional
    } else {
        $item_desc = NULL;
    }

    $result = $db->prepare("INSERT INTO items (`name`, `borrowable`, `description`, `stock` , `location_name`) VALUES (?, ?, ?, ?, ?)");
    $result->bind_param("sisis", $name, $borrowable, $item_desc, $stock, $location_name);
    $result->execute();
?>
