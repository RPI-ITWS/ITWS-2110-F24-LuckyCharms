<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
  <script src="../resources/script.js"></script>
  <script src="../resources/lablist.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
  <script src="../resources/checkout_form.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function(){
      
      //If the userid or admin cookies aren't set, or if they are not an admin, redirect to login page
      if(document.cookie.indexOf('userid=')===-1 || document.cookie.indexOf('admin=')===-1 ||
          document.cookie.substring(document.cookie.indexOf('admin=')+6)!=="0"){
        location.href="../login";
      }
      // Populates the page based on the userid stored in the userid cookie
      $.getJSON("../resources/data.json", function(dat) {
        populate(dat);

        const userID = parseInt(document.cookie.substring(7, document.cookie.indexOf(";")));
        const user = dat.users.find(u => u.id === userID);
        const userName = user ? user.username : "Guest";
        const isAdmin = user.is_admin ? true : false;

        // Call menuClick with the user's name when the menu button is clicked
        document.getElementById("menu-icon").onclick = () => {menuClick(userName, isAdmin);};
        
        // Populate labs with the user's labs
        userLabs(userID, dat);
      });

    });
  </script>
  <link rel="stylesheet" href="../homepage.css" media="screen">
  <link rel="stylesheet" type="text/css" href="style.css">
  <link rel="stylesheet" type="text/css" href="../resources/checkout_form.css">
<body>
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
      </ul>
    </div>

    <div class="content">
      <div class="lab-title">
        <h2 id="lab-name">No Labs</h2>
        <div class="search-bar">
          <input type="text" placeholder="Search">
        </div>
      </div>
  
      <table id="item-table">
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

    <div class="right-sidebar">
      <p id="go-back">&raquo;</p>

      <div id="item-title">
        <h3 id="item-title-text">Item 1</h3>
      </div>

      <div id="item-type">
        <h3 class="item-labels">Item Type</h3>
        <h4 class="item-status" id="item-type-text">Borrowable</h4>
      </div>

      <div id="item-status">
        <h3 class="item-labels">Status</h3>
        <h4 class="item-status">In Stock</h4>
      </div>

      <div id="item-quantity">
        <h3 class="item-labels">Quantity Availible</h3>
        <h4 id="item-quantity-text">100 out of 1000</h4>
      </div>

      <div id="item-description">
        <h3 class="item-labels" id="description-title">Description</h3>
        
        <p id="item-description-list">Text</p>
      </div>

      <button id="checkout-button">CHECK OUT</button>
    </div>

    <div id="checkout-form">
      <div id="form-container">
        <h2 id="form-title">Checkout Item</h2>
        <form id="form-object">
          <label for="name">Full Name (Counts As Signiture):</label>
          <input type="text" id="name" name="name" required><br><br>

          <label for="returnDate" id="returnDateLabel">Planned Return Date (Within 2 weeks):</label>
          <input type="date" id="returnDate" name="returnDate" required><br id="returnDateBreak1"><br id="returnDateBreak2">
          
          <label for="quantity">Quantity:</label>
          <input type="number" id="quantity" name="quantity" min="1" max="100" required><br><br>

          <label for="reason">Reason for Checkout:</label>
          <textarea id="reason" name="reason" required placeholder="Explain why you need this item..."></textarea><br><br>

          <input type="checkbox" id="agreeReturn" name="agreeReturn" required>
          <label for="agreeReturn" id="agreeReturnLabel">I understand that I have a responsibility to return the item by the date provided.</label><br><br>

          <input type="checkbox" id="agreeNotify" name="agreeNotify" required>
          <label for="agreeNotify" id="agreeNotifyLabel">I understand that if I want to change the return date, I have to notify the lab administrator.</label><br><br>

          <button type="submit" id="checkout-form-button">CHECK OUT</button>
          <button type="button" id="cancel-checkout-form-button">CANCEL</button>
        </form>
      </div>
    </div>
  </main>

</body>
</html>