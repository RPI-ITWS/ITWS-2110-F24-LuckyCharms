/* For functions used in multiple pages. */

/* This should show the menu options when the menu button
  on the navbar is clicked. */
  function menuClick(userName, isAdmin){

    let labsPage = "/pages/homepages/user_homepage.html"
    if (isAdmin) {
      labsPage = "/pages/homepages/admin_homepage.html"
    }

    // Clear any existing dropdown content to avoid duplication
    $('#dropdown .dropdown-content').remove();
    
    // Append the new dropdown content
    $('#dropdown').append(`
      <div class="dropdown-content">
            <h3>${userName}</h3>
            <a href="profileClick()">Profile</a>
            <a href=${labsPage}>My Labs</a>
            <a href="/pages/borrowingHistory/borrowing_history.html">Borrowing History</a>
            <a href="/index.html" id="logout">Logout</a>
      </div>
    `);
  
    // Toggle visibility when the menu is clicked
    $('.dropdown-content').toggleClass('show');
  }

/*Creates the list of labs the user has access to in the sidebar and displays
  the info of the lab they can access with the lowest ID number. */
function userLabs(userID, data){
  let flag = true; // To load the first lab's items by default

  // Clear any existing labs in the list
  $("#lab-list").html("");

  // Iterate over the allowed labs for the user
  for (let x of data.allowed_user_locations) {
    if (x.user_id === userID) {
      let lab = data.locations.find(l => l.id === x.location_id);
      let labName = lab.name;

      // Check the first lab by default
      let checkedStatus = flag ? "checked" : "";

      // Add each lab as a radio button with label
      $("#lab-list").append(`
        <li>
          <input type="radio" id="lab${lab.id}" name="lab" ${checkedStatus} onClick="labItems(${lab.id})">
          <label for="lab${lab.id}">${labName}</label>
        </li>
      `);

      // Load items for the first lab by default
      if (flag) {
        labItems(lab.id,data);
        flag = false;
      }
    }
  }
}

/*Adds rows to the lab-items table displaying each item associated with the
  lab, if it's borrowable, and if it's available. */
  function labItems(labID, data) {
    let labName = data.locations.find(l => l.id === labID).name;
    
    // Update the lab name
    $("#lab-name").html(labName);
  
    // Clear the table content
    $("#lab-items").html("");
    
    // Iterate over the items in the lab
    for (let item of data.items) {
      if (item.location_id === labID) {
        let status = (item.stock - countRemoved(item.id, data) > 0) ? "available" : "unavailable";
        let type = item.borrowable ? "borrowable" : "removable";
        
        // Append each item as a row in the table
        $("#lab-items").append(`<tr onClick="itemDetails(${item.id})">
          <td class="item-name">${item.name}</td>
          <td><span class="tag">${type}</span></td>
          <td>${status}</td>
        </tr>`);
      }
    }
  }


  /*Currently unwritten. This is what's called when they click on an item in the
  list, e.g. if they click on the Voltmeter. This should show a pop-up with
  the item's details; if the user isn't an admin and the item is available, it
  should allow them to check it out. */
function itemDetails(itemID){
  console.log("called with arg "+itemID);
}

//Returns number of items with id itemID currently removed/checked out
//Used to check if an item is available
function countRemoved(itemID, data){
  let count = 0;
  for(i in data.reservations){
    if(i.item_id === itemID && i.date_returned === null){
      count += i.amount;
    }
  }
  return count;
}