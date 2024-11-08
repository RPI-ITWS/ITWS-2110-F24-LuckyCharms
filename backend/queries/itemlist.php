<?php
    require "db.php";

    // location name is the location the user clicks on
    $location_name = $_GET["location_name"];
    $query = $db->prepare("SELECT * FROM items WHERE location_name = ?;");
    $query->bind_param("s", $location_name);
    $query->execute();
    $result = $query->get_result();
    
    $validItems = array();
    while ($row = $result->fetch_assoc()) {
        $validItems[] = $row;
    }

    print_r(json_encode($validItems));
?>