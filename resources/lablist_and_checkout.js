//For user homepage and admin homepage, listing labs & showing checkout form

/*Creates the list of labs the user has access to in the sidebar and displays
  the info of the lab they can access with the lowest ID number. */
function userLabs(userID, data){
  let flag = true; // To load the first lab's items by default

  // Iterate over the allowed labs for the user
  for (let x of data.allowed_user_locations) {
    if (x.user_id === userID) {
      let lab = data.locations.find(l => l.id === x.location_id);
      let labName = lab.name;

      // Check the first lab by default
      let checkedStatus = flag ? "checked" : "";

      // Add each lab as a radio button with label
      document.getElementById("lab-list").innerHTML = document.getElementById("lab-list").innerHTML + `<li><input type="radio" id="lab${lab.id}" name="lab" ${checkedStatus} onClick='labItems(${lab.id}, ${JSON.stringify(data)})'><label for="lab${lab.id}">${labName}</label></li>`;
      

      // Load items for the first lab by default
      if (flag) {
        labItems(lab.id, data);
        flag = false;
      }
    }
  }
}

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
  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      $("#pagination").append(`<button class="page-button" ${currentPage === i ? "disabled" : ""} 
        onclick="labItems('${labName}', ${i}, '${searchValue}')">${i}
      </button>`);
    }
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
    checkoutButton.style.cursor = "pointer";
  }
  else {
    itemStatusText.textContent = "Out Of Stock";
    checkoutButton.textContent = "UNAVAILABLE";
    checkoutButton.style.backgroundColor = "lightcoral";
    checkoutButton.style.cursor = "not-allowed";
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

  const deleteButton = document.getElementById("delete-button");
  deleteButton.onclick = function() {
    const labName = document.getElementById('lab-name').textContent;
    const currentPage = parseInt(document.querySelector('#pagination button[disabled]') === null ? 1 : document.querySelector('#pagination button[disabled]').textContent);
    const searchValue = document.getElementById('search').value;
    delete_item(labName, itemId, currentPage, searchValue);
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

    if (event.target.tagName === 'TD' && (window.location.href.includes("user") || document.getElementsByClassName('tab-button')[0]?.id === 'chosen')) {
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

//Checkout form
async function checkout(id, stock) {
  const cancelCheckoutFormButtn = document.getElementById('cancel-checkout-form-button');
  cancelCheckoutFormButtn.addEventListener('click', function () {
    const checkoutForm = document.getElementById('form-object');
    checkoutForm.reset();

    const formContainer = document.getElementById('checkout-form');
    formContainer.style.display = "none";
  });

  const checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton.textContent != "UNAVAILABLE") {
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.style.display = "flex";

    const checkoutFormTitle = document.getElementById('form-title');
    const itemTitleContainer = document.getElementById('item-title-text');
    const itemTitle = itemTitleContainer.textContent;
    checkoutFormTitle.textContent = "Checkout " + itemTitle;

    const quantityEl = document.getElementById("quantity");
    quantityEl.setAttribute('max', stock);


    checkoutForm.onsubmit = function(e) { e.preventDefault(); finalCheckout(id) };

    const itemTypeText = document.getElementById('item-type-text').textContent;
    if (itemTypeText === "Borrowable") {
      document.getElementById('returnDateLabel').style.display = "";
      document.getElementById('returnDateBreak1').style.display = "";
      document.getElementById('returnDateBreak2').style.display = "";
      const returnDateInput = document.getElementById('returnDate');
      returnDateInput.style.display = "";

      returnDateInput.setAttribute('required', 'required');

      const currentDate = new Date();
      const maxReturnDate = new Date();
      maxReturnDate.setDate(currentDate.getDate() + 14);
      const maxDateString = maxReturnDate.toISOString().split('T')[0];
      returnDateInput.setAttribute('max', maxDateString);
      returnDateInput.setAttribute('min', currentDate.toISOString().split('T')[0]);

      document.getElementById('agreeReturnLabel').textContent = "I understand that I have a responsibility to return the item within 2 weeks of the reservation.";
      document.getElementById('agreeNotifyLabel').textContent = "I understand that if I want to change the return date, I have to notify the lab administrator.";
    }
    else {
      document.getElementById('returnDateLabel').style.display = "none";
      document.getElementById('returnDateBreak1').style.display = "none";
      document.getElementById('returnDateBreak2').style.display = "none";
      const returnDateInput = document.getElementById('returnDate');
      returnDateInput.style.display = "none";

      if (returnDateInput.hasAttribute('required')) {
        returnDateInput.removeAttribute('required');
      }

      document.getElementById('agreeReturnLabel').textContent = "I understand that I do not have to return this item back to lab.";
      document.getElementById('agreeNotifyLabel').textContent = "I understand that if this item gets lost or damaged, I would have to discuss a replacement with the lab administrator.";
    }
  }
}

async function finalCheckout(id) {
  const checkoutForm = document.getElementById('form-object');

  const formContainer = document.getElementById('checkout-form');
  formContainer.style.display = "none";

  // Get account and other information to pass into PHP starting here

  const returnDate = document.getElementById('returnDate').value;
  const quantity = document.getElementById('quantity').value;
  const reason = document.getElementById('reason').value;

  let queryParams = `?itemId=${id}&quantity=${quantity}&reason=${reason}&returnDate=${returnDate}`;

  // Pass these values into PHP File starting here
  await fetch(`../backend/queries/checkout.php${queryParams}`).then((response) => response.text())
    .then((result) => {
      if (isJsonString(result))
        result = JSON.parse(result);
      console.log(result);
    });

  console.log('Return Date:', returnDate);
  console.log('Quantity:', quantity);
  console.log('Reason:', reason);
  checkoutForm.reset();
}

function isJsonString(str) {
  try {
    const json = JSON.parse(str);
    return (typeof json === 'object');
  } catch (e) {
    return false;
  }
}
