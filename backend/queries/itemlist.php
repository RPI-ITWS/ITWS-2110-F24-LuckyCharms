<?php
    require "db.php";

    // location name is the location the user clicks on
    $validItems = array();
    if (!isset($_GET["locationName"])) {
        print_r(json_encode($validItems));
        return;
    }
    $location_name = $_GET["locationName"];
    $query = $db->prepare("SELECT * FROM items WHERE location_name = ?;");
    $query->bind_param("s", $location_name);
    $query->execute();
    $result = $query->get_result();
    
    while ($row = $result->fetch_assoc()) {
        $validItems[] = $row;
    }

    print_r(json_encode($validItems));
?>