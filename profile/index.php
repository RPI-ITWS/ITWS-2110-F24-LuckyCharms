<?php
	session_start();
  require "../backend/queries/db.php";
  require "../backend/queries/validateUser.php";
  require "../backend/queries/userInformation.php";
  if (!validateUser())
    redirect("../");
  
  $userInfo = json_decode(userInformation());
  
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
  <script src="../resources/script.js"></script>
  <link rel="stylesheet" type="text/css" href="../resources/pages.css">
  <link rel="stylesheet" type="text/css" href="profile.css">
<body>

  <header>
    <h1 class="logo">LIMBS</h1>
    <nav class="navbar">
      <div id="dropdown">
        <button id="menu-icon">&#9776;</button>
      </div>
    </nav>
  </header>

    <div class="profile-container">
        <h2 id="username">
          <?php
            print_r($userInfo->username);
          ?>
        </h2>
        <div class="field">
            <label for="email">Email</label>
            <input type="email" <?php echo "value='$userInfo->email'" ?> id="email" disabled>
        </div>
        <div class="field">
            <label for="phone">Phone Number</label>
            <input type="text" <?php echo "value='$userInfo->phone'" ?> id="phone" value="N/A" disabled>
        </div>
        <div class="field-with-button">
            <label for="password">Password</label>
            <a href="changePassword/index.php"><button class="change-password-btn">Change Password</button></a>
        </div>
    </div>
    <script>
      const menuIcon = document.getElementById("menu-icon");
      menuIcon.addEventListener("click", function() {
        menuClick("<?php echo $userInfo->username?>", <?php echo $_SESSION["isAdmin"] ?>);
      })
    </script>
</body>
</html>