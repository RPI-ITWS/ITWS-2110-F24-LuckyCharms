/* For functions used in multiple pages. */

/*Currently unwritten. This should show the menu options when the menu button
  on the navbar is clicked. */
function menuClick(){

}

/*Creates the list of labs the user has access to in the sidebar and displays
  the info of the lab they can access with the lowest ID number. */
function userLabs(userID, data){
  //flag means will default to only displaying the info of the 1st lab
  let flag = true;
  for(let x of data.allowed_user_locations){
    if(x.user_id === userID){
      //Assumes that location ids are 1, 2, 3,..., in order; is true for now.
      $("#lab-list").append(`<li><button type="button" onClick='labItems(${x.location_id})'>${data.locations[x.location_id-1].name}</button></li>`);
      if(flag){
        labItems(x.location_id, data);
        flag = false;
      }
    }
  }
}

/*Adds rows to the lab-items table displaying each item associated with the
  lab, if it's borrowable, and if it's available. */
function labItems(labID, data){
  $("#lab-name").html(data.locations[labID-1].name);
  $("#lab-items").html("<tr><th>Item Name</th><th>Item Type</th><th>Status</th></tr>")
  for(let x of data.items){
    if(x.location_id === labID){

      let status = (x.stock - countRemoved(x.id, data) > 0);

      $("#lab-items").append(`<tr onClick="itemDetails(${x.id})"><td> ${x.name} </td><td> ${x.borrowable === 1 ? "borrowable" : "removable"} </td><td> ${status === true ? "available" : "unavailable"} </td></tr>`);
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