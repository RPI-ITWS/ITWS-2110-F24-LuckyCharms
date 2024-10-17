<?php
    require "db.php";

    // TAKE OUT ID AND STOCK FILTER
    // array should hold `name`, `borrowable, `location_name`
    // to make the query writing easier
    $array = array();

    // for the binding parameters string
    $binding = "";

    $name = $_GET["name"];
    if ($name) {
        array_push($array, "`name`");
        $binding .= "s";
    }

    $borrowable = $_GET["borrowable"];
    if ($borrowable) {
        array_push($array, "`borrowable`");
        $binding .= "i";
    }

    $location_name = $_GET["location_name"];
    if ($location_name) {
        array_push($array, "`location_name`");
        $binding .= "s";
    }

    // constructing the query
    $inputstr = "";
    for ($i = 0; $i < count($array) - 1; $i++) {
        $inputstr .= $array[$i] . " = ?, ";
    }
    $inputstr .= $array[count($array) - 1] . " = ?";
    $query = "SELECT * FROM items WHERE " . $inputstr;
    $result = $db->prepare($query);
    $result->bind_param($binding, ...$array);
    $result->execute();
?>
