<?php
  session_start();

  if($_SESSION["isAdmin"] != 1){
    print_r(json_encode(['status' => 1]));
    return;
  }

  if(!isset($_GET["itemId"])){
    print_r(json_encode(['status'=>2]));
    return;
  }

  require "db.php";

  $item_id = $_GET["itemId"];
  
  $delete_res = $db->prepare("DELETE FROM `reservations` WHERE `item_id` = ?");
  $delete_res->bind_param("i", $item_id);
  $delete_res->execute();

  $delete_item = $db->prepare("DELETE FROM `items` WHERE `id` = ?");
  $delete_item->bind_param("i", $item_id);
  $delete_item->execute();

  print_r(json_encode(['status' => 0]));
?>