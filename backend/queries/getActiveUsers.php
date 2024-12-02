<?php
	require "db.php";
	
	if (!isset($_GET["locationName"], $_GET["page"])) return;
	
  $locationName = $_GET["locationName"];
	$page = $_GET["page"];
	$offset = ($page - 1) * $itemLimit;

  global $db;
  $query = $db->prepare("SELECT user_id FROM alloweduserlocations WHERE location_name = ? LIMIT $itemLimit OFFSET ?");
	$query->bind_param("si", $locationName, $offset);
	$query->execute();
	
	$result = $query->get_result();
	
  $users = array();
  if ($result->num_rows != 0){
      while ($row = $result->fetch_assoc()) {
          $users[] = $row;
      }
  }
  
  header('Content-Type: application/json');
  echo json_encode($users);
?>