<?php
    require "db.php";

    // array should hold `name`, `borrowable, `location_name`
    // to make the query writing easier
    $array = array();

    // to identify if the values are null, eg 
    // if the filter is empty (any)
    $indexarr = array();

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
    $query = "SELECT * FROM items WHERE (";
    for ($i = 0; $i < sizeof($array) - 1; $i++) {
        $query .= $array[$i] . ",";
    }
    $query .= $array[sizeof($array) - 1] . ")";

    // binding the parameters
    if (sizeof($array) === 3) {
        if (strcmp($binding, "sis") === 0) {
            // 1 poss
            // name borr loc
            $result->bind_param($binding, $name, $borrowable, $location_name);
            $result->execute();
        }
    } else if (sizeof($array) === 2) {
        if (strcmp($binding, "is") === 0) {
            // 1 poss
            // borr loc
            $result->bind_param($binding, $borrowable, $location_name);
            $result->execute();
        } else if (strcmp($binding, "si") === 0) {
            // 1 poss
            // name borr
            $result->bind_param($binding, $name, $borrowable);
            $result->execute();
        } else if (strcmp($binding, "ss") === 0) {
            // 1 poss
            // name loc
            $result->bind_param($binding, $name, $location_name);
            $result->execute();
        }
    } else if (sizeof($array) === 1) {
        // 3 poss
        // name, borr, loc
        if (strcmp($binding, "s") === 0) {
            // can either be nme or loc
            if ($location_name == null) {
                $result->bind_param($binding, $name);
                $result->execute();
            } else {
                $result->bind_param($bindingm $location_name);
                $result->execute();
            }
        } else if (strcmp($binding, "i") === 0) {
            // borr
            $result->bind_param($binding, $borrowable);
            $result->execute();
        }
    }
?>