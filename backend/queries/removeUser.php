<?php
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

        $nextQuery = $db->prepare("DELETE FROM alloweduserlocations WHERE user_id = ? AND location_name = ?");
        $nextQuery->bind_param("is", $userId, $labName);
        $nextQuery->execute();

        header("Content-Type: application/json");
        echo "success";
    }
    else {
        header("Content-Type: application/json");
        echo "No results found!";
    }
?>