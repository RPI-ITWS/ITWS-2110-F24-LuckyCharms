<?php
  session_start();
	require "validateUserLocation.php";
	require "db.php";

  if($_SESSION["isAdmin"] != 1){
    print_r(json_encode(['status' => 1]));
    return;
  }

  if(!isset($_GET["itemId"])){
    print_r(json_encode(['status'=>2]));
    return;
  }
	$item_id = $_GET["itemId"];
	
	// Retrieve the location of the item
	$query = $db->prepare("SELECT location_name FROM items WHERE id = ?");
	$query->bind_param("i", $item_id);
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
		print_r(json_encode(['status' => 4, 'message' => 'Not allowed to delete item in this location']));
		return;
	}


  
  $delete_res = $db->prepare("DELETE FROM `reservations` WHERE `item_id` = ?");
  $delete_res->bind_param("i", $item_id);
  $delete_res->execute();

  $delete_item = $db->prepare("DELETE FROM `items` WHERE `id` = ?");
  $delete_item->bind_param("i", $item_id);
  $delete_item->execute();

  print_r(json_encode(['status' => 0]));
?>