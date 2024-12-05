<?php
  require "db.php";

  if(!isset($_GET["itemId"])){
    print_r("MISSING ID");
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