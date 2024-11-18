//For user homepage and admin homepage, listing labs

/*Adds rows to the lab-items table displaying each item associated with the
  lab, if it's borrowable, and if it's available. */
async function labItems(labName, currentPage=1, searchValue="") {
  // Hide the checkout panel
  const checkoutPanel = document.getElementsByClassName('right-sidebar')[0];
  if (checkoutPanel)
    checkoutPanel.style.display = 'none';

  // Pagination
  const pagination = await fetch(`../backend/queries/totalItems.php?locationName=${labName}&name=${searchValue}`).then((res) => res.json());
  const totalPages = Math.ceil(pagination.totalItems / 10);

  $("#pagination").html("");
  for (let i = 1; i <= totalPages; i++) {
    $("#pagination").append(`<button class="page-button" ${currentPage === i ? "disabled" : ""} 
      onclick="labItems('${labName}', ${i}, '${searchValue}')">${i}
    </button>`);
  }

  const items = await fetch(`../backend/queries/filterItems.php?locationName=${labName}&page=${currentPage}&name=${searchValue}`).then((res) => res.json());
  // Iterate over the items in the lab
  let labItems = "";
  for (let item of items) {
    let status = item.stock > 0 ? "Available" : "Unavailable";
    let type = item.borrowable ? "Borrowable" : "Removable";
    
    // Append each item as a row in the table
    labItems += `<tr id="${item.id}">
      <td class="item-name">${item.name}</td>
      <td><span class="tag">${type}</span></td>
      <td>${status}</td>
    </tr>`;
  }
  // Updates the content
  $("#lab-name").html(labName);
  $("#lab-items").html(labItems);

}

async function search(event=null) {
  if (event) {
    if (event.key !== 'Enter') {
      return;
    }
  }
  const searchValue = document.getElementById('search').value;
  await labItems(document.getElementById('lab-name').textContent, 1, searchValue);
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

async function populateItemDetails(labLocation, itemId) {
  const item = await fetch(`../backend/queries/itemDetail.php?id=${itemId}`).then((res) => res.json());

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
  itemTitleText.textContent = item.name;

  // Set type according to whether the item is borrowable or not
  if (item.borrowable == 0) {
    itemBorrowableText.textContent = "Removable";
  }
  else {
    itemBorrowableText.textContent = "Borrowable";
  }

  // Set the stock status based on whether there is stock left
  // The check out button will change depending on if the item is availible or not
  if (item.stock > 0) {
    itemStatusText.textContent = "In Stock";
    checkoutButton.textContent = "CHECK OUT";
    checkoutButton.style.backgroundColor = "lightgreen";
  }
  else {
    itemStatusText.textContent = "Out Of Stock";
    checkoutButton.textContent = "UNAVAILIBLE";
    checkoutButton.style.backgroundColor = "lightred";
  }

  // Set the stock to the amount of items in stock currently
  itemQuantityText.textContent = item.stock;

  // Set the item description text to the item description, if it exists
  if (item.description === "" || item.description === null) {
    descriptionText.textContent = "No Description Provided.";
  }
  else {
    descriptionText.textContent = item.description;
  }

  checkoutButton.onclick = function() {
    checkout(itemId, item.stock);
  };
}

function populate() {
  const table = document.getElementById('item-table');
  const checkoutPanels = document.getElementsByClassName('right-sidebar');
  const checkoutPanel = checkoutPanels[0];
  const closePanel = document.getElementById('go-back');

  // Check to see if any of the item in the table have been clicked on
  table.addEventListener('click', async function (event) {
    event.preventDefault();

    if (event.target.tagName === 'TD') {
      // Display the side panel if an item is clicked on
      checkoutPanel.style.display = 'flex';
      const labName = document.getElementById('lab-name').textContent;

      // Select all <tr> elements
      const allTDs = document.querySelectorAll('tr');

      // Loop through all the <tr> elements
      allTDs.forEach(tr => {
        if (tr.className === 'highlighted') {
          // Remove the highlight from all
          tr.removeAttribute('class');
        }
      });

      // Add the highlight to the clicked table item
      const trElement = event.target.parentElement;
      trElement.className = 'highlighted';
      const itemId = trElement.id;

      // Populate the side panel with that items details
      await populateItemDetails(labName, itemId);
    }
  });

  // Check if the side panel shall be closed
  closePanel.addEventListener('click', function() {
    checkoutPanel.style.display = 'none';
  
    // Select all <tr> elements
    const allTDs = document.querySelectorAll('tr');
  
    // Loop through all the <tr> elements
    allTDs.forEach(tr => {
      if (tr.className === 'highlighted') {
        // Remove the highlight from all
        tr.removeAttribute('class');
      }
    });
  });
}