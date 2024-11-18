<?php
    session_start();
    require "db.php";

    $INCORRECT_PASSWORD = 1;
    $REPEAT_PASSWORD_WRONG = 2;
    $PASSWORD_CHANGED = 3;

    if (!isset($_GET["oldPassword"]) || !isset($_GET["newPassword"]) || !isset($_GET["newPasswordConfirm"])) {
        echo json_encode(['status' => 'Missing parameters']);
        return;
    }

    $oldPassword = $_GET["oldPassword"];
    $newPassword = $_GET["newPassword"];
    $newPasswordConfirm = $_GET["newPasswordConfirm"];
    $userId = $_SESSION['userId'];

    $passwordMatch = $newPassword == $newPasswordConfirm;

    $user = $db->prepare("SELECT * FROM users WHERE id = ?");
    $user->bind_param("i", $userId);
    $user->execute();

    $userInfo = $user->get_result()->fetch_assoc();

    if (password_verify($oldPassword, $userInfo["password"])) {

        if ($passwordMatch) {
            $hashedNewPassword = password_hash($newPassword, PASSWORD_BCRYPT);
            
            $updateStmt = $db->prepare("UPDATE users SET `password` = ? WHERE id = ?");
            $updateStmt->bind_param("si", $hashedNewPassword, $userId);
            $updateStmt->execute();

            echo json_encode(['status' => $PASSWORD_CHANGED]);
        } else {
            echo json_encode(['status' => $REPEAT_PASSWORD_WRONG]);
        }

    } else {
        echo json_encode(['status' => $INCORRECT_PASSWORD]);
    }
?>