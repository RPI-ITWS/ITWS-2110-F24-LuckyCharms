<?php
    session_start(); // might not need this
    require "db.php";

    // requires username, email, pw, confirmed pw
    // have query showing if user exists

    if (isset($_GET["username"])) {
        //
        $username = $_GET["username"];
        // if username already exists
        $checkQuery = "SELECT username FROM users WHERE username = ?";
        $stmt = prepare($checkQuery);
        $stmt->execute(['username' => $email]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            echo "Username already exists. Please choose another username.";
            return;
        }
    } else {
        echo "Username cannot be empty";
        return;
    } // usernames unique to database
    if (isset($_GET["email"])) {
        // ensure that it's an rpi email
        // if it is, check to see if it already exists
        $email = $_GET["email"];

        $checkQuery = "SELECT email FROM users WHERE email = ?";
        $stmt = prepare($checkQuery);
        $stmt->execute(['email' => $email]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!str_contains($email, '@rpi.edu')) {
            echo "Email must be an RPI email and follow \"...@rpi.edu\" formatting";
            return;
        } else if ($result) {
            echo "Account already exists. Please log in.";
            return;
        }
        
    } else {
        echo "Email cannot be empty.";
        return;
    }
    if (isset($_GET["password"]) and isset($_GET["confirmPW"])) {
        // ensure that the strings match exactly
        $pw = $_GET["password"];
        $conPW = $_GET["confirmPW"];
        if (!(strcmp($pw, $conPW) = 0)) {
            echo "Passwords don't match";
            return;
        }
        // hashing the pw
        $hashedpw = password_hash($_GET["password"], PASSWORD_BCRYPT);
    } else {
        echo "Password fields cannot be empty.";
        return;
    }
    // check to see if user already exists
    // need to find a way to verify if they're an admin, do i need to do that
    // get creation_date after all is verified
    $date = date("Y-m-d H:i:s");
    // default student?
    $isadmin = 0; // 0 student, 1 admin

    $result = $db->prepare("INSERT INTO users (`username`, `email`, `password`, `creation_date`, `isadmin`) VALUES (?,?,?,?,?)");
    $result->bind_param("ssssi", $username, $email, $hashedpw, $date, $isadmin);
    $result->execute();
?>