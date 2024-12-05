<?php
	session_start();
	require "../backend/queries/getActiveLabs.php";
	require "../backend/queries/userInformation.php";

  // Set CSP Here
  header("Content-Security-Policy: default-src 'self';");
	
	if (!isset($_SESSION["isAdmin"])) {
		redirect("../");
			return;
	}
	if ($_SESSION["isAdmin"] != 1) {
		redirect("../user");
		return;
	}
	$isAdmin = $_SESSION['isAdmin'];
	$userId = $_SESSION['userId'];
	$allowedUserLocations = getActiveLabs($userId);
	$currentLocation = "No Labs";
	$userInfo = userInformation();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home</title>
  <script src="../resources/script.js"></script>
  <script src="../resources/lablist_and_checkout.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
  <script src="admin.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      // Populates the page based on the userid stored in the userid cookie
      populate();
      
      <?php
        $isAdmin = $_SESSION['isAdmin'];
        echo "
          const user = $userInfo;
          const userName = user.username;
          const isAdmin = $isAdmin;
          document.getElementById('menu-icon').onclick = () => { menuClick(userName, isAdmin); };
        ";
      ?>

      // Populate labs with the user's labs
      // userLabs(userID, dat);
    });
  </script>
  <link rel="stylesheet" href="../resources/pages.css" media="screen">
  <link rel="stylesheet" type="text/css" href="../user/style.css">
  <link rel="stylesheet" type="text/css" href="admin_forms.css">
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
	      <?php
		      // Populates the labs based on the user's allowed labs
		      $allowedUserLocations = json_decode($allowedUserLocations);
		      $checked = "checked";
		      foreach ($allowedUserLocations as $location) {
			      $locationName = $location->location_name;
			      echo "
              <li class='lab'>
                <input type='radio' $checked id='$locationName' name='lab' onClick='labItems(`$locationName`)'>
                <label for='$locationName'>$locationName</label>
              </li>
					  ";
			      if ($checked === "checked") {
				      $checked = "";
				      $currentLocation = $locationName;
				      echo "<script>labItems('$locationName')</script>";
			      }
		      }
	      ?>
      </ul>
    </div>

    <div class="content">
      <div class="lab-title">
        <h2 id="lab-name">No Labs</h2>
        <div class="search-bar">
          <input id="search" type="text" placeholder="Search" onkeydown="search(event)">
          <button id="search-button" onclick="search()">Search</button>
        </div>
      </div>

      <div id="tab-bar">
        <h2 class="tab-button" id="chosen" onclick="labItemsClick()">Lab Items</h2>
        <h2 class="tab-button" onclick="labUsersClick()">Lab Users</h2>
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
      <button id="add-button" onclick="add()"><span id="add-icon">+</span> Add Item</button>

      <br>
      <div id="pagination"></div>
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

      <button class="form-button" id="checkout-button">CHECK OUT</button>
      <button class="form-button" style="background-color: #778DA9;" id="edit-button" onclick="edit_form()">EDIT ITEM</button>
      <button class="form-button" style="background-color: red;" id="remove-button" onclick="delete_form()">REMOVE ITEM</button>
    </div>

    <div id="add-form">
      <div id="add-form-container">
        <h2 id="add-form-title">Add Item</h2>

        <form id="add-form-object">
          <label for="item-name">Item Name:</label>
          <input type="text" id="item-name" name="item-name" required><br><br>

          <label for="new-item-description">Item Description:</label>
          <textarea id="new-item-description" name="new-item-description" maxlength="1000" placeholder="Describe the item..."></textarea><br><br>

          <label for="type-dropdown">Item Type:</label>
          <select id="type-dropdown" required>
            <option value="" disabled selected>Select an option</option>
            <option value="Borrowable">Borrowable</option>
            <option value="Removable">Removable</option>
          </select><br><br>

          <label for="item-quantity-input">Stock:</label>
          <input type="number" id="item-quantity-input" name="item-quantity-input" min="1" max="1000" required><br><br>

          <label for="item-image">Item Image:</label>
          <input type="file" id="item-image" accept="image/*">

          <button type="submit" class="form-button" style="background-color: lightgreen;"  id="add-form-button">ADD ITEM</button>
          <button type="button" class="form-button" style="background-color: lightcoral;" id="cancel-add-form-button">CANCEL</button>
        </form>
      </div>
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
          <input type="number" id="quantity" name="quantity" min="1" max="100" value="1" required><br><br>

          <label for="reason">Reason for Checkout:</label>
          <textarea id="reason" name="reason" maxlength="1000" required placeholder="Explain why you need this item..."></textarea><br><br>

          <input type="checkbox" id="agreeReturn" name="agreeReturn" required>
          <label for="agreeReturn" id="agreeReturnLabel">I understand that I have a responsibility to return the item by the date provided.</label><br><br>

          <input type="checkbox" id="agreeNotify" name="agreeNotify" required>
          <label for="agreeNotify" id="agreeNotifyLabel">I understand that if I want to change the return date, I have to notify the lab administrator.</label><br><br>

          <button type="submit" class="form-button" style="background-color: lightgreen;" id="checkout-form-button">CHECK OUT</button>
          <button type="button" class="form-button" style="background-color: lightcoral;" id="cancel-checkout-form-button">CANCEL</button>
        </form>
      </div>
    </div>

    <div id="edit-form">
      <div id="edit-form-container">
        <h2 id="edit-form-title">Edit Item</h2>

        <form id="edit-form-object">
          <label for="edit-name">Name:</label>
          <input type="text" id="edit-name" name="edit-name" required><br><br>

          <label for="edit-description">Description:</label>
          <textarea id="edit-description" name="edit-description" maxlength="1000" required placeholder="Currently Empty."></textarea><br><br>

          <label for="edit-type-dropdown">Type:</label>
          <select id="edit-type-dropdown" required>
            <option value="" disabled selected>Select an option</option>
            <option value="Borrowable">Borrowable</option>
            <option value="Removable">Removable</option>
          </select><br><br>
          
          <label for="edit-quantity">Stock:</label>
          <input type="number" id="edit-quantity" name="edit-quantity" min="1" max="1000" required><br><br>

          <label for="edit-item-image">Item Image (Will keep old image if no file attached):</label>
          <input type="file" id="edit-item-image" accept="image/*">

          <button type="submit" class="form-button" style="background-color: #778DA9;" id="edit-form-button">EDIT ITEM</button>
          <button type="button" class="form-button" style="background-color: lightcoral;" id="cancel-edit-form-button">CANCEL</button>
        </form>
      </div>
    </div>

    <div id="delete-item">
      <div id="delete-container">
        <h2 id="delete-title">Delete Item</h2>

        <p id="warning">Are you sure you want to remove this item from the lab list?</p>

        <button type="button" class="form-button" style="background-color: red;" id="delete-button">DELETE ITEM</button>
        <button type="button" class="form-button" style="background-color: lightcoral;" id="cancel-delete-button">CANCEL</button>
      </div>
    </div>

    <div id="add-user">
      <div id="add-user-container">
          <h2 id="add-user-title">Add User</h2>

          <form id="add-user-object">
            <label for="add-username">Username:</label><br>
            <input type="text" id="add-username" name="add-username" min="1" max="100" required><br><br>

            <button type="submit" class="form-button" style="background-color: lightgreen;" id="add-user-button">ADD USER</button>
            <button type="button" class="form-button" style="background-color: lightcoral;" id="cancel-add-user-button">CANCEL</button>
          </form>
      </div>
    </div>

    <div id="remove-user">
      <div id="remove-user-container">
          <h2 id="remove-user-title">Remove User</h2>

          <p id="user-warning">Are you sure you want to remove this user from the lab?</p>

          <button type="button" class="form-button" style="background-color: red;" id="delete-user-button">DELETE USER</button>
          <button type="button" class="form-button" style="background-color: lightcoral;" id="cancel-delete-user-button">CANCEL</button>
      </div>
    </div>

  </main>

</body>
</html>