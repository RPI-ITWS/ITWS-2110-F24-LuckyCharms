<?php
    require "db.php";
    if (isset($_GET["location"], $_SESSION["user_id"])) {
        $userid = $_SESSION["user_id"];
        $location_name = $_GET["location"];
    } else {
        return;
    }

    $result = db->prepare("INSERT INTO alloweduserlocations (`user_id`, `location_name`) VALUES (?, ?)");
    $result->bind_param("ss", $userid, $location_name);
    $result->execute();
?>