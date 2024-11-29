<?php
	require "db.php";

    $locationName = $_GET["locationName"];

    global $db;
    $result = $db->query("SELECT user_id FROM alloweduserlocations WHERE location_name = '$locationName'");

    $users = array();
    if ($result->num_rows != 0){
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    }
    
    header('Content-Type: application/json');
    echo json_encode($users);
?>