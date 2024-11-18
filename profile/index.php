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
  <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
  <script>
//
//    function populateProfile(userID, data){
//        for(let user of data.users){
//            if(user.id === userID){
//                document.getElementById("username").innerText = user.username;
//                document.getElementById("email").value = user.email;
//                // add in for phone number if we add it to the json file
//            }
//        }
//    }
//
//    // Populates the page based on the userid stored in the userid cookie
//    $.getJSON("../resources/data.json", function(dat) {
//      const userID = parseInt(document.cookie.substring(7, document.cookie.indexOf(";")));
//      const user = dat.users.find(u => u.id === userID);
//      const userName = user ? user.username : "Guest";
//      const isAdmin = true;
//
//      // Call menuClick with the user's name when the menu button is clicked
//      $('#menu-icon').on('click', function() {
//        menuClick(userName, isAdmin);
//      });
//
//      // Populate labs with the user's labs
//      populateProfile(userID, dat);
//    });
  </script>
  <link rel="stylesheet" type="text/css" href="../resources/style.css">
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