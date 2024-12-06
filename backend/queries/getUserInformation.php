<?php
    require "db.php";

    global $db;
    $userId = $_GET["userId"];

    $item = $db->query("SELECT username, email, phone FROM users WHERE id = $userId;");
    $result = $item->fetch_assoc();

    header('Content-Type: application/json');
    echo json_encode($result);
?>