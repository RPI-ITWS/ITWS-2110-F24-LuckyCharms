<?php
	session_start();
  require "../../backend/queries/db.php";
  require "../../backend/queries/validateUser.php";
  require "../../backend/queries/userInformation.php";
  if (!validateUser())
    redirect("../../");
  
  $userInfo = json_decode(userInformation());
  
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
  <script src="../../resources/script.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
  <link rel="stylesheet" type="text/css" href="../../resources/pages.css">
  <link rel="stylesheet" type="text/css" href="../profile.css">
  <link rel="stylesheet" type="text/css" href="change_password.css">
<body>

  <header>
    <h1 class="logo">LIMBS</h1>
    <nav class="navbar">
      <div id="dropdown">
        <button id="menu-icon">&#9776;</button>
      </div>
    </nav>
  </header>

  <div class="change-password-container">
    <h2 id="username">
      <?php
        print_r($userInfo->username);
      ?></h2>
    <form id="change-password-form" onsubmit="return validateChange(event);">
        <div class="field">
            <label for="old-password">Old Password</label>
            <input type="password" id="old-password" name="old-password" required>
        </div>
        <div class="field">
            <label for="new-password">Enter your new password</label>
            <input type="password" id="new-password" name="new-password" required>

            <label for="new-password-confirm">Re-enter the new password</label>
            <input type="password" id="new-password-confirm" name="new-password-confirm" required>
        </div>
        <button type="submit" class="change-password-btn">Save New Password</button>
    </form>
  </div>

  <script src="changePW.js"></script>
  <script>
    const menuIcon = document.getElementById("menu-icon");
    menuIcon.addEventListener("click", function() {
      menuClick("<?php echo $userInfo->username?>", <?php echo $_SESSION["isAdmin"] ?>, "../../");
    })
  </script>
</body>
</html>