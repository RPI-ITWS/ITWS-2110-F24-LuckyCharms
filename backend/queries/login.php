<?php
	require "db.php";
	class UserLogin {
		public $isAdmin;
		public $status;
	}

	$USER_DOES_NOT_EXIST = 1;
	$USER_LOGGED_IN = 2;
	$INCORRECT_PASSWORD = 3;

	$username = $_GET["username"];
	$password = $_GET["password"];


	$user = $db->prepare("SELECT * FROM users WHERE username = ?");
	$user->bind_param("s", $username);
	$user->execute();

	$userObj = new UserLogin();

	$userInfo = $user->get_result()->fetch_assoc();
	if (!$userInfo) {
		$userObj->status = $USER_DOES_NOT_EXIST;
	} else {
		if (password_verify($password, $userInfo["password"])) {
			$_COOKIE["username"] = $username;
			$_COOKIE["password"] = $password;
			$userObj->status = $USER_LOGGED_IN;
			$userObj->isAdmin = $userInfo["is_admin"];
		} else {
			$userObj->status = $INCORRECT_PASSWORD;
		}
	}
	print_r(json_encode($userObj));
?>