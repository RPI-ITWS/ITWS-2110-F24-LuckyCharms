<?php
    /*require "db.php";
    if (isset($_GET["location"], $_SESSION["user_id"])) {
        $userid = $_SESSION["user_id"];
        $location_name = $_GET["location"];
    } else {
        return;
    }

    $result = db->prepare("INSERT INTO alloweduserlocations (`user_id`, `location_name`) VALUES (?, ?)");
    $result->bind_param("ss", $userid, $location_name);
    $result->execute();*/

    require "db.php";

    if (!isset($_GET["username"], $_GET["labName"])) return;

    $username = $_GET["username"];
    $labName = $_GET["labName"];

    global $db;

    $query = $db->prepare("SELECT id FROM users WHERE username = ?;");
    $query->bind_param("s", $username);
    $query->execute();
    
    $result = $query->get_result();

    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $userId = (int) $row['id'];

        $nextQuery = $db->prepare("INSERT INTO alloweduserlocations (user_id, location_name) VALUES (?, ?)");
        $nextQuery->bind_param("is", $userId, $labName);
        $nextQuery->execute();

        header("Content-Type: application/json");
        echo "success!";
    }
    else {
        header("Content-Type: application/json");
        echo "No results found!";
    }
?>