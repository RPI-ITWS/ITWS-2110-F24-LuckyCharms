<?php
  session_start();
  // Checks if they are logged in, if not, redirects to the home page
  require "../backend/queries/validateUser.php";
  require "../backend/queries/getActiveLabs.php";
  require "../backend/queries/userInformation.php";

  // Set CSP Here
  //header("Content-Security-Policy: default-src 'self';");

  if (!validateUser())
	  redirect("../");
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
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      // Populates the page
      populate();
      <?php
        echo "
          const user = $userInfo;
          const userName = user.username;
          const isAdmin = !!$isAdmin ?? false;
          // Call menuClick with the user's name when the menu button is clicked
          document.getElementById('menu-icon').onclick = () => { menuClick(userName, isAdmin); };
        ";
      ?>
    });
  </script>
  <link rel="stylesheet" href="../resources/pages.css" media="screen">
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
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
						echo "<script>
              labItems('$locationName');
            </script>";
					}
        }
			?>
	  </ul>
	</div>

	<div class="content">
	  <div class="lab-title">
		<h2 id="lab-name">
		</h2>
		<div class="search-bar">
      <input id="search" type="text" placeholder="Search" onkeydown="search(event)">
      <button id="search-button" onclick="search()">Search</button>
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
	  <br>
	  <div id="pagination"></div>
	</div>

	<div class="right-sidebar hidden">
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

		<button class="form-button status-available" id="checkout-button">CHECK OUT</button>
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
			<input type="number" class="quantity" id="quantity" name="quantity" min="1" max="100" required><br><br>

			<label for="reason">Reason for Checkout:</label>
			<textarea id="reason" name="reason" required placeholder="Explain why you need this item..."></textarea><br><br>

			<input type="checkbox" class="checkbox" id="agreeReturn" name="agreeReturn" required>
			<label for="agreeReturn" id="agreeReturnLabel">I understand that I have a responsibility to return the item by the date provided.</label><br><br>

			<input type="checkbox" class="checkbox" id="agreeNotify" name="agreeNotify" required>
			<label for="agreeNotify" id="agreeNotifyLabel">I understand that if I want to change the return date, I have to notify the lab administrator.</label><br><br>

			<button type="submit" class="form-button confirm" id="checkout-form-button">CHECK OUT</button>
			<button type="button" class="form-button cancel" id="cancel-checkout-form-button">CANCEL</button>
		</form>
	  </div>
	</div>
  </main>

</body>
</html>