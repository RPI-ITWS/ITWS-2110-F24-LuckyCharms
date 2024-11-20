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

  var_dump($_GET);

  $item_id = $_GET["itemId"];

  print_r($item_id);

  $delete = $db->prepare("DELETE FROM `items` WHERE `id` = ?");
  $delete->bind_param("i", $item_id);
  $delete->execute();

  print_r(json_encode(['status' => 0]));
?>