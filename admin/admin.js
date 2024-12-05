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

async function labUsersClick() {
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

    // Create a query called "getActiveUsers" where it fetches from the alloweduserLocations the user ids associated with a specific lab
    // Make that fetch call here
    // This works similarly to the getActiveUsers, but the lab name is given and the users ids associated are what need to be fetched.

    // After that, fetch user information for every user based on the ids associated with the specific lab current displayed and then display those users in the table.
    // Also make that fetch call here

    // You will now have an array of users with their information, which you can divide by 10 so that they can be displayed via pagation.
}

async function add_form() {
    if (current_page === 'item') {
        const addForm = document.getElementById('add-form');
        addForm.style.display = "flex";
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

        // All of the items properties should be changed to what was submitted in the form, with the exception of the item image.
        // If the item image is left blank, then any old image stored for the item should remain.
        
        let id = document.getElementsByClassName("highlighted")[0].id;

        let queryParams = `?itemId=${id}&editName=${newItemName}&editDescription=${newItemDescription}&editType=${newItemType==="Borrowable" ? 1 : 0}&editStock=${newItemStock}`;
        if(newItemImage!==""){
            queryParams += `&editImage=${newItemImage}`
        }

        // Pass these values into PHP File starting here
        await fetch(`../backend/queries/admin_editItem.php${queryParams}`).then((response) => response.text())

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
    deleteButton.onclick = async function() { await delete_item(); };

    const cancelDeleteButton = document.getElementById('cancel-delete-button');
    cancelDeleteButton.onclick = async function() { await cancel_delete(); };
}

async function delete_item() {
    const itemTitleContainer = document.getElementById('item-title-text');
    const itemTitle = itemTitleContainer.textContent;

    const labName = document.getElementById('lab-name').textContent;

    // Insert PHP to find the specific item from the lab name and remove it

    console.log("Lab to check:", labName);
    console.log("Item to delete: ", itemTitle);

    const deleteContainer = document.getElementById('delete-item');
    deleteContainer.style.display = "none";
}

async function cancel_delete() {
    const deleteContainer = document.getElementById('delete-item');
    deleteContainer.style.display = "none";
}