<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
<<<<<<<< HEAD:user_homepage.php
  <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
  <script src="resources/script.js" defer></script>
  <script defer>
/*    //If the userid or admin cookies aren't set, or if they are not a normal user, redirect to login page
========
  <script src="/resources/script.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
  <script defer>
    //If the userid or admin cookies aren't set, or if they are not an admin, redirect to login page
>>>>>>>> main:pages/homepages/user_homepage.html
    if(document.cookie.indexOf('userid=')===-1 || document.cookie.indexOf('admin=')===-1 ||
        document.cookie.substring(document.cookie.indexOf('admin=')+6)!=="0"){
      location.href="pages/login.php";
    }
    // Populates the page based on the userid stored in the userid cookie
    $.getJSON("/resources/data.json", function(dat) {
      const userID = parseInt(document.cookie.substring(7, document.cookie.indexOf(";")));
      const user = dat.users.find(u => u.id === userID);
      const userName = user ? user.username : "Guest";
      const isAdmin = user.is_admin ? true : false;

      // Call menuClick with the user's name when the menu button is clicked
      $('#menu-icon').on('click', function() {
        menuClick(userName, isAdmin);
      });
<<<<<<<< HEAD:user_homepage.php
    });*/
========

      // Populate labs with the user's labs
      userLabs(userID, dat);
    });
>>>>>>>> main:pages/homepages/user_homepage.html
  </script>
  <link rel="stylesheet" href="/homepage.css" media="screen">
  <link rel="stylesheet" type="text/css" href="user_homepage.css">
<body>
<<<<<<<< HEAD:user_homepage.php
  <?php
    require "./backend/queries/validateUser.php";
  ?>
========
>>>>>>>> main:pages/homepages/user_homepage.html
  <header>
    <h1 class="logo">LIMBS</h1>
    <nav class="navbar">
      <div id="dropdown">
        <button id="menu-icon">&#9776;</button>
      </div>
    </nav>
  </header>

  <main>
    <div class="sidebar">
      <div id="sidebar-title">Labs</div>
      <ul id="lab-list">
        <!-- labs populated dynamically -->
      </ul>
    </div>

    <div class="content">
      <div class="lab-title">
        <h2 id="lab-name">No Labs</h2>
        <div class="search-bar">
          <input type="text" placeholder="Search">
        </div>
      </div>
  
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Type</th>
            <th>Status</th>
          </tr>
        </thead>
  
        <tbody id="lab-items">
          <!-- items populated dynamically -->
        </tbody>
      </table>
    </div>
  </main>

</body>
</html>