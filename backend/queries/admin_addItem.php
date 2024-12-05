<?php
    require "db.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["itemName"], $data["itemType"], $data["itemStock"], $data["labName"])) {
        echo json_encode(["error" => "Missing required fields"]);
        return;
    }

    $name = $data["itemName"];
    $borrowable = $data["itemType"];
    $stock = $data["itemStock"];
    $location_name = $data["labName"];

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

    try {
        $stmt = $db->prepare("INSERT INTO items (`name`, `borrowable`, `description`, `stock`, `image_link`, `location_name`) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("siisss", $name, $borrowable, $item_desc, $stock, $image, $location_name);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Item added successfully"]);
        } else {
            echo json_encode(["error" => "Failed to add item"]);
        }

        $stmt->close();
    } catch (Exception $e) {
        echo json_encode(["error" => "Server error: " . $e->getMessage()]);
    }
?>
