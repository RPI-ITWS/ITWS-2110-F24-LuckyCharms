//code for the forms to add and delete items from the lab

async function add_form() {
    const addForm = document.getElementById('add-form');
    addForm.style.display = "flex";
    addForm.onsubmit = async function(event) {
        event.preventDefault();
        await add_item(event);
    };

    const cancelAddButton = document.getElementById('cancel-add-form-button');
    cancelAddButton.onclick = async function() { await cancel_add(); };
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