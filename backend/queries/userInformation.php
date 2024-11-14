<?php
    require "db.php";

    $item = db->prepare("SELECT username, email, phone FROM users WHERE id = ?;");
    $item->bind_param("s", $_SESSION["userId"]);
    $item->execute();
?>