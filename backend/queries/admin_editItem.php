<?php
  require "db.php";

  if(!isset($_GET["itemId"])){
    print_r("MISSING ID");
    return;
  }
	
	// Retrieve the location of the item
	$query = $db->prepare("SELECT location_name FROM items WHERE id = ?");
	$query->bind_param("i", $_GET["itemId"]);
	$query->execute();
	$result = $query->get_result();
	
	if ($result->num_rows === 0) {
		print_r(json_encode(['status' => 3, 'message' => 'Item not found']));
		return;
	}
	
	$row = $result->fetch_assoc();
	$location_name = $row['location_name'];

// Check if the admin is allowed in the location
	if (!isUserAllowedInLocation($_SESSION["userId"], $location_name)) {
		print_r(json_encode(['status' => 4, 'message' => 'Not allowed to edit item in this location']));
		return;
	}
  
  $query = "UPDATE `items` SET ";
  $queryEnd = " WHERE `id` = ?";

  if(isset($_GET["editName"]) && isset($_GET["editDescription"]) &&
   isset($_GET["editType"]) && isset($_GET["editStock"])){
      
    //optional
    if(isset($_GET["editImage"])){
      $update = $db->prepare($query . "`name`=?, `description`=?, `borrowable`=?, `stock`=?, `image_link` = ?" . $queryEnd);
      $update->bind_param("ssiisi", $_GET["editName"], $_GET["editDescription"], $_GET["editType"], $_GET["editStock"], $_GET["editImage"], $_GET["itemId"]);
    } else {
      $update = $db->prepare($query . "`name`=?, `description`=?, `borrowable`=?, `stock`=?" . $queryEnd);
      $update->bind_param("ssiii", $_GET["editName"], $_GET["editDescription"], $_GET["editType"], $_GET["editStock"], $_GET["itemId"]);
    }
    
    $update->execute();

  } else {
    print_r("MISSING EDIT INFORMATION");
    return;
  }
?>