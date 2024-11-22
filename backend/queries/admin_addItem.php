<?php
    require "db.php";

    if ($isset($_GET["itemName"], $_GET["itemType"], $_GET["itemStock"], $_GET["labName"])) {
        $name = $_GET["itemName"];
        $borrowable = $_GET["itemType"]; // borrowable
        $stock = $_GET["itemStock"];
        $location_name = $_GET["labName"];

    } else {
        return;
    }
    if (isset($_GET["itemDescription"])) {
        $item_desc = $_GET["itemDescription"]; // optional
    } else {
        $item_desc = NULL;
    }
    if (isset($_GET["itemImage"])) {
        $image = $_GET["itemImage"]; // optional
    } else {
        $image = NULL;
    }

    $result = $db->prepare("INSERT INTO items (`name`, `borrowable`, `description`, `stock`, `image_link`, `location_name`) VALUES (?, ?, ?, ?, ?, ?)");
    $result->bind_param("sisiss", $name, $borrowable, $item_desc, $stock, $image, $location_name);
    $result->execute();
?>
