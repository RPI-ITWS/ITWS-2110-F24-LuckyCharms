<?php
    require "db.php";

    // TAKE OUT ID AND STOCK FILTER
    // array should hold `name`, `borrowable, `location_name`
    // to make the query writing easier
    $filters = array();
    $columns = array();
    $query = "SELECT * FROM items";
    // for the binding parameters string
    $binding = "";


    // Location is mandatory but just in case...
    $location_name = $_GET["location_name"];
    if ($location_name) {
        array_push($filters, $location_name);
        array_push($columns, "location_name = ?");
        $binding .= "s";
    }

    $name = $_GET["name"];
    if ($name) {
        array_push($filters, "%".$name."%");
        array_push($columns, "name LIKE ?");
        $binding .= "s";
    }

    $borrowable = $_GET["borrowable"];
    if ($borrowable) {
        array_push($filters, $borrowable);
        array_push($columns, "borrowable = ?");
        $binding .= "i";
    }

    if (count($filters) > 0) {
        $query .= " WHERE (";
        $query .= join(" AND ", $columns);
        $query .= ")";
    }


    // limit constant is 10 for now, can change in the future
    // PAGINATION
    $offset = ($page - 1) * 10;
    array_push($limits, "LIMIT 10 OFFSET ");
    array_push($limits, $offset);


    // constructing the query
    $result = $db->prepare($query);
    $result->bind_param($binding, ...$filters);
    $result->execute();

    $items = $result->get_result();
    $filteredItems = array();
    while ($row = $items->fetch_assoc()) {
        array_push($filteredItems, $row);
    }

    print_r(json_encode($filteredItems));
?>
