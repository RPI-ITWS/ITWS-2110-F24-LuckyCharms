<?php
		session_start();
    require "db.php";
		require "validateUserLocation.php";
		
    if (!isset($_GET["username"], $_GET["labName"])) return;
		
    $username = $_GET["username"];
    $labName = $_GET["labName"];
	
		if (!isUserAllowedInLocation($_SESSION["userId"], $labName)) {
			print_r(json_encode(['status' => 4, 'message' => 'Not allowed to add users in this location']));
			return;
		}

    global $db;

    $query = $db->prepare("SELECT id FROM users WHERE username = ?;");
    $query->bind_param("s", $username);
    $query->execute();
    
    $result = $query->get_result();

    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $userId = (int) $row['id'];

        $nextQuery = $db->prepare("INSERT INTO alloweduserlocations (user_id, location_name) VALUES (?, ?)");
        $nextQuery->bind_param("is", $userId, $labName);

        if ($nextQuery->execute()) {
            header("Content-Type: application/json");
            echo json_encode(["success" => true]);
        } else {
            header("Content-Type: application/json");
            echo json_encode(["error" => "Database operation failed"]);
        }
    }
    else {
        header("Content-Type: application/json");
        echo json_encode(["error" => "User not found"]);
    }
?>