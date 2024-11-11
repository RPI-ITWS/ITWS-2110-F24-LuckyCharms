//used by many different pages


/* This should show the menu options when the menu button
  on the navbar is clicked. */
function menuClick(userName, isAdmin){

    let labsPage = "../user"
    if (isAdmin) {
      labsPage = "../admin"
    }

    // Append the new dropdown content
    document.getElementById("dropdown").innerHTML = document.getElementById("dropdown").innerHTML + `
        <div class="dropdown-content">
            <h3>${userName}</h3>
            <a href="../profile">Profile</a>
            <a href=${labsPage}>My Labs</a>
            <a href="../profile/borrowingHistory">Borrowing History</a>
            <a href="../" id="logout">Logout</a>
        </div>
    `;

    // Toggle visibility when the menu is clicked
    document.getElementById("dropdown").onclick = (e) => {
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

/*Creates the list of labs the user has access to in the sidebar and displays
  the info of the lab they can access with the lowest ID number. */
async function userLabs(userID, userLocations){
  let flag = true; // To load the first lab's items by default

  // Iterate over the allowed labs for the user
  for (let location of userLocations) {
    let labName = location.location_name;

    // Check the first lab by default
    let checkedStatus = flag ? "checked" : "";

    // Add each lab as a radio button with label
    document.getElementById("lab-list").innerHTML = document.getElementById("lab-list").innerHTML + `
      <li>
        <input type="radio" id="${labName}" name="lab" ${checkedStatus} onClick='labItems(${labName}, ${JSON.stringify(userLocations)})'>
        <label for="${labName}">${labName}</label>
      </li>`;

    // Load items for the first lab by default
    // if (flag) {
    //   labItems(lab.id, data);
    //   flag = false;
    // }
  }
}
