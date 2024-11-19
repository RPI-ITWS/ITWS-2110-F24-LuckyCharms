<?php
  require "db.php";
  
  // Make sure these are set
	if (!isset($_GET["locationName"]) || !isset($_GET["page"])) return;
	
	
	$location_name = $_GET["locationName"];
	$page = $_GET["page"];
	
	// Name is optional
  $name = "";
  if (isset($_GET["name"])) {
    $name = $_GET["name"];
  }
	$name = '%'.$name.'%';

  // limit constant is 10 for now, can change in the future
  // PAGINATION
  $offset = ($page - 1) * $itemLimit;

	$query = "SELECT * FROM items WHERE location_name = ? AND name LIKE ? LIMIT $itemLimit OFFSET ?";
  // constructing the query
  $result = $db->prepare($query);
  $result->bind_param("ssi", $location_name, $name, $offset);
  $result->execute();

  $items = $result->get_result();
  $filteredItems = array();
  while ($row = $items->fetch_assoc()) {
      array_push($filteredItems, $row);
  }

  print_r(json_encode($filteredItems));
?>
