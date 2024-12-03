//code for the forms to add and delete items from the lab
let current_page = 'item';

async function labItemsClick() {
    const current = document.getElementById('chosen');

    if (current) {
        current.removeAttribute('id');
    }

    const tabBar = document.getElementById('tab-bar');
    const tabBarButtons = tabBar.querySelectorAll('h2');
    const labItemsButton = tabBarButtons[0];

    labItemsButton.id = 'chosen';

    const table = document.getElementById('item-table');
    const tableHeaders = table.querySelectorAll('th');
    const itemName = tableHeaders[0];
    const itemType = tableHeaders[1];
    const itemStatus = tableHeaders[2];
    itemName.textContent = "Item Name";
    itemType.textContent = "Item Type";
    itemStatus.textContent = "Status";

    const tableItems = document.querySelectorAll('.item-name');
    tableItems.forEach(tableItem => {
        tableItem.classList.remove('narrow');
    });

    const tableBody = document.getElementById('lab-items');
    const tableEntries = tableBody.querySelectorAll('tr');
    tableEntries.forEach(function(tr) {
        const secondTD = tr.querySelectorAll('td')[1];
        secondTD.classList.remove('email-column');
    });

    const addButton = document.getElementById('add-button');
    addButton.innerHTML = '<span id="add-icon">+</span> Add Item';

    current_page = 'item';

    const labTable = document.getElementById('lab-items');
    labTable.innerHTML = "";

    const labName = document.getElementById('lab-name').textContent;
    labItems(labName, 1, "");
}

async function labUsersClick(page=1) {
    const current = document.getElementById('chosen');

    if (current) {
        current.removeAttribute('id');
    }

    const tabBar = document.getElementById('tab-bar');
    const tabBarButtons = tabBar.querySelectorAll('h2');
    const labUsersButton = tabBarButtons[1];

    labUsersButton.id = 'chosen';

    const table = document.getElementById('item-table');
    const tableHeaders = table.querySelectorAll('th');
    const userName = tableHeaders[0];
    const userEmail = tableHeaders[1];
    const userActions = tableHeaders[2];
    userName.textContent = "Full Name";
    userEmail.textContent = "Email";
    userActions.textContent = "Actions";

    const tableItems = document.querySelectorAll('.item-name');
    tableItems.forEach(tableItem => {
        tableItem.classList.add('narrow');
    });

    const tableBody = document.getElementById('lab-items');
    const tableEntries = tableBody.querySelectorAll('tr');
    tableEntries.forEach(function(tr) {
        const secondTD = tr.querySelectorAll('td')[1];
        secondTD.classList.add('email-column');
    });

    const addButton = document.getElementById('add-button');
    addButton.innerHTML = '<span id="add-icon">+</span> Add User';

    current_page = 'user';

    const checkoutPanels = document.getElementsByClassName('right-sidebar');
    const checkoutPanel = checkoutPanels[0];
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

    const labTable = document.getElementById('lab-items');
    labTable.innerHTML = "";

    const labName = document.getElementById('lab-name').textContent;

    const result = await fetchAssociatedUsers(labName, page);

    let users = [];

    for (const item of result) {
        const resultUser = await fetchUserInformation(item.user_id);

        users.push(resultUser);
    }

    const pagination = await fetch(`../backend/queries/totalUsers.php?locationName=${labName}`).then(response => response.json());

    const totalPages = Math.ceil(pagination.totalUsers / 10);

    let pageButtons = "";

    if (totalPages !== 1) {
        for (let i = 1; i <= totalPages; i++) {
            pageButtons += `<button class="page-button" onclick="labUsersClick(${i})" ${i === page ? "disabled" : ""}>${i}</button>`;
        }
    }

    document.getElementById('pagination').innerHTML = pageButtons;

    // Must seperate the list of users into pages.


    let labUsers = "";

    // Must divide this by 10 and display it on pages.
    for (const user of users) {
        labUsers += `<tr id="">
        <td class="item-name narrow">${user.username}</td>
        <td>${user.email}</td>
        <td><button class="removeUser">REMOVE</button></td>
        </tr>`;
    }

    $("#lab-items").html(labUsers);
}

async function fetchAssociatedUsers(labName, page=1) {
    const response = await fetch(`../backend/queries/getActiveUsers.php?locationName=${labName}&page=${page}`)
      .then((res) => res.json());

    return response;
}

async function fetchUserInformation(item_user_id) {
    const response = await fetch(`../backend/queries/getUserInformation.php?userId=${item_user_id}`);
    const user = await response.json();

    return user;
}

async function 
  () {
    if (current_page === 'item') {
        const addForm = document.getElementById('add-form');
        addForm.style.display = "flex";
        console.log("called");
        addForm.onsubmit = async function(event) {
            event.preventDefault();
            await add_item(event);
        };

        const cancelAddButton = document.getElementById('cancel-add-form-button');
        cancelAddButton.onclick = async function() { await cancel_add(); };
    }
}

async function add_item(event) {
    event.preventDefault();

    const labName = document.getElementById('lab-name').textContent;
    const itemName = document.getElementById('item-name').value;
    const itemType = document.getElementById('type-dropdown').value;
    const itemDescription = document.getElementById('new-item-description').value;
    const itemStock = document.getElementById('item-quantity-input').value;
    const itemImage = document.getElementById('item-image').value;

    if (itemName.length > 100) {
        alert("The item name must be less than 100 charecters!")
    }
    else {
        const formContainer = document.getElementById('add-form');
        formContainer.style.display = "none";

        // Fetch and POST to PHP here

        console.log("Lab Name: ", labName);
        console.log("Item Name: ", itemName);
        console.log("Item Type: ", itemType);
        console.log("Item Description: ", itemDescription);
        console.log("Item Stock: ", itemStock);
        console.log("Item Image: ", itemImage);

        const addForm = document.getElementById('add-form-object');
        addForm.reset();
    }
}

async function cancel_add() {
    const addForm = document.getElementById('add-form-object');
    addForm.reset();

    const formContainer = document.getElementById('add-form');
    formContainer.style.display = "none";
}

async function edit_form() {
    const editForm = document.getElementById('edit-form');
    editForm.style.display = "flex";

    const editTitle = document.getElementById('edit-form-title');
    const itemTitleContainer = document.getElementById('item-title-text');
    const itemTitle = itemTitleContainer.textContent;
    editTitle.textContent = "Edit " + itemTitle;

    const itemNameContainer = document.getElementById('edit-name');
    const itemDescriptionContainer = document.getElementById('edit-description');
    const itemTypeContainer = document.getElementById('edit-type-dropdown');
    const itemStockContainer = document.getElementById('edit-quantity');

    // Should use PHP here to extract id of current item and populate the form fields with the items CURRENT information.
    // I have done this with the item name feild as an example of what I mean. This should be done with the remaining feilds with PHP.
    // Do not do this with the image feild.
    
    itemNameContainer.value = itemTitle;

    editForm.onsubmit = async function(event) {
        event.preventDefault();
        await edit_item(event);
    };

    const cancelEditButton = document.getElementById('cancel-edit-form-button');
    cancelEditButton.onclick = async function() { await cancel_edit(); };
}

async function edit_item(event) {
    event.preventDefault();

    const oldItemNameContainer = document.getElementById('item-title-text');
    const oldItemName = oldItemNameContainer.textContent;

    const labName = document.getElementById('lab-name').textContent;

    const newItemName = document.getElementById('edit-name').value;
    const newItemDescription = document.getElementById('edit-description').value;
    const newItemType = document.getElementById('edit-type-dropdown').value;
    const newItemStock = document.getElementById('edit-quantity').value;
    const newItemImage = document.getElementById('edit-item-image').value;

    if (newItemName.length > 150) {
        alert("The item name must be less than 150 charecters!")
    }
    else {
        const formContainer = document.getElementById('edit-form');
        formContainer.style.display = "none";

        console.log("Old Item Name: " + oldItemName);
        console.log("Current Lab: " + labName);
        console.log("New Item Name: " + newItemName);
        console.log("New Item Description: " + newItemDescription);
        console.log("New Item Type: " + newItemType);
        console.log("New Item Stock: " + newItemStock);
        console.log("New Item Image: " + newItemImage);

        // Insert PHP to find the specific item from the lab name and the old item name and edit it
        // All of the items properties should be changed to what was submitted in the form, with the exception of the item image.
        // If the item image is left blank, then any old image stored for the item should remain.

        const editForm = document.getElementById('edit-form-object');
        editForm.reset();
    }
}

async function cancel_edit() {
    const editForm = document.getElementById('edit-form-object');
    editForm.reset();

    const formContainer = document.getElementById('edit-form');
    formContainer.style.display = "none";
}

async function delete_form() {
    const deleteForm = document.getElementById('delete-item');
    deleteForm.style.display = "flex";

    const deleteTitle = document.getElementById('delete-title');
    const itemTitleContainer = document.getElementById('item-title-text');
    const itemTitle = itemTitleContainer.textContent;
    deleteTitle.textContent = "Delete " + itemTitle;

    const deleteButton = document.getElementById('delete-button');

    const cancelDeleteButton = document.getElementById('cancel-delete-button');
    cancelDeleteButton.onclick = async function() { await cancel_delete(); };
}

async function delete_item(labName, id, page, searchValue) {
    let queryParams = `?itemId=${id}`;
    await fetch(`../backend/queries/deleteItem.php${queryParams}`).then((response) => response.text())
    .then((result) => {
      if (isJsonString(result)){
        result = JSON.parse(result);
      }
      console.log(result);
    });

    const deleteContainer = document.getElementById('delete-item');
    deleteContainer.style.display = "none";
    await labItems(labName, page, searchValue);
}

async function cancel_delete() {
    const deleteContainer = document.getElementById('delete-item');
    deleteContainer.style.display = "none";
}