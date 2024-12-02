<?php
  session_start();
  require "../../backend/queries/db.php";
  require "../../backend/queries/validateUser.php";
  require "../../backend/queries/userInformation.php";
  
  if (!validateUser())
    redirect("../../");
  
  $user = json_decode(userInformation());
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Borrowing History</title>
        <link rel="stylesheet" href="borrowing_history.css" media="screen">
        <link rel="stylesheet" href="../../resources/pages.css" media="screen">
        <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
        <script src="borrowing_history.js"></script>
    </head>
    <body>
        <header>
            <h1 class="logo">LIMBS</h1>
            <nav class="navbar">
              <div id="dropdown">
                <button id="menu-icon">&#9776;</button>
                <div class="dropdown-content">
                  <?php
                    $labsLocation = $_SESSION["isAdmin"] ? "../../admin" : "../../user";
                    echo "
                      <h3>$user->username</h3>
                      <a href='../../profile'>Profile</a>
                      <a href='$labsLocation''>My Labs</a>
                      <a href='../../profile/borrowingHistory'>Borrowing History</a>
                      <a href='../../' id='logout'>Logout</a>
                      </div>
                    "
                  ?>
                </div>
              </div>
            </nav>
        </header>

        <div id="content">
            <div id="tab-bar">
                <h2 class="tab-button" onclick="borrowingHistory(<?php echo $_SESSION['isAdmin']?>, false)">Currently Borrowing</h2>
                <h2 class="tab-button" id="chosen" onClick="borrowingHistory(<?php echo $_SESSION['isAdmin']?>)">Borrowing History</h2>
                <div id="search-bar">
                    <input id="search" type="text" placeholder="Search" onkeydown="search(event)">
                    <button id="search-button" onclick="search()">Search</button>
                </div>
            </div>
            <table>
                <thead>
                    <tr id="table-head">
                    </tr>
                </thead>
                <tbody id="table-body">
                </tbody>
            </table>
            <br>
            <div id="pagination"></div>
        </div>
    </body>
    <script>
      // Call menuClick with the user's name when the menu button is clicked
      document.getElementById("menu-icon").onclick = async () => {
        // Append the new dropdown content
        // Toggle visibility when the menu is clicked
        document.getElementById("dropdown").onclick = () => {
          let coll = document.getElementsByClassName("dropdown-content");
          for(let i=0; i<coll.length; i++){
            if (coll[i].classList.contains("show")) {
              // If it is visible, hide it
              coll[i].classList.remove("show");
            } else{
              // If it is hidden, show it
              coll[i].classList.add("show");
            }
          }
        }
      }
    </script>
</html>