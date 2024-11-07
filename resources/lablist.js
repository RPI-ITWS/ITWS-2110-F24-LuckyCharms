//For user homepage and admin homepage, listing labs

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
      let status = (item.stock - countRemoved(item.id, data) > 0) ? "Available" : "Unavailable";
      let type = item.borrowable ? "Borrowable" : "Removable";
      
      // Append each item as a row in the table
      $("#lab-items").append(`<tr>
        <td class="item-name">${item.name}</td>
        <td><span class="tag">${type}</span></td>
        <td>${status}</td>
      </tr>`);
    }
  }
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

function populateItemDetails(labName, itemName, itemData) {
  var labLocation;
  
  // Get the current lab of the item clicked on
  for (const location of itemData.locations) {
    if (location.name === labName) {
      labLocation = location.id;
    }
  }

  // Find the specific item in the lab by name
  var specificItem;
  for (const item of itemData.items) {
    if (item.location_id === labLocation && item.name === itemName) {
      specificItem = item;
    }
  }

  // Get the text container for the item title
  const itemTitleText = document.getElementById('item-title-text');

  // Get the container for the item type
  const itemTypeContainer = document.getElementById('item-type');
  const typeDescriptions = itemTypeContainer.getElementsByClassName('item-status');
  const itemBorrowableText = typeDescriptions[0];

  // Get the container for the item status
  const itemStatusContainer = document.getElementById('item-status');
  const statusDescriptions = itemStatusContainer.getElementsByClassName('item-status');
  const itemStatusText = statusDescriptions[0];

  // Get the containers for the item quantity, item description, and the checkout button
  const itemQuantityText = document.getElementById('item-quantity-text');
  const descriptionText = document.getElementById('item-description-list');
  const checkoutButton = document.getElementById('checkout-button');

  // Set the item title to the name of the item
  itemTitleText.textContent = specificItem.name;

  // Set type according to whether the item is borrowable or not
  if (specificItem.borrowable == 0) {
    itemBorrowableText.textContent = "Removable";
  }
  else {
    itemBorrowableText.textContent = "Borrowable";
  }

  // Set the stock status based on whether there is stock left
  // The check out button will change depending on if the item is availible or not
  if (specificItem.stock > 0) {
    itemStatusText.textContent = "In Stock";
    checkoutButton.textContent = "CHECK OUT";
    checkoutButton.style.backgroundColor = "lightgreen";
  }
  else {
    itemStatusText.textContent = "Out Of Stock";
    checkoutButton.textContent = "UNAVAILIBLE";
    checkoutButton.style.backgroundColor = "lightred";
  }

  // Set the stock to the amount of items in stcok currently
  itemQuantityText.textContent = specificItem.stock;

  // Set the item description text to the item description, if it exists
  if (specificItem.description === "" || specificItem.description === null) {
    descriptionText.textContent = "No Description Provided.";
  }
  else {
    descriptionText.textContent = specificItem.description;
  }
}

function populate(itemData) {
  const table = document.getElementById('item-table');
  const checkoutPanels = document.getElementsByClassName('right-sidebar');
  const checkoutPanel = checkoutPanels[0];
  const closePanel = document.getElementById('go-back');

  // Check to see if any of the item in the table have been clicked on
  table.addEventListener('click', function(event) {
    event.preventDefault();

    if (event.target.tagName === 'TD') {
      // Display the side panel if an item is clicked on
      checkoutPanel.style.display = 'flex';
      const labName = document.getElementById('lab-name').textContent;
      const itemName = event.target.textContent;

      // Select all <tr> elements
      const allTDs = document.querySelectorAll('tr');

      // Loop through all the <tr> elements
      allTDs.forEach(tr => {
        if (tr.id === 'highlighted') {
          // Remove the highlight from all
          tr.removeAttribute('id');
        }
      });

      // Add the highlight to the clicked table item
      const trElement = event.target.parentElement;
      trElement.id = 'highlighted';

      // Populate the side panel with that items details
      populateItemDetails(labName, itemName, itemData);
    }
  });

  // Check if the side panel shall be closed
  closePanel.addEventListener('click', function() {
    checkoutPanel.style.display = 'none';

    // Select all <tr> elements
    const allTDs = document.querySelectorAll('tr');

    // Loop through all the <tr> elements
    allTDs.forEach(tr => {
      if (tr.id === 'highlighted') {
        // Remove the highlight from all
        tr.removeAttribute('id');
      }
    });
  });
}