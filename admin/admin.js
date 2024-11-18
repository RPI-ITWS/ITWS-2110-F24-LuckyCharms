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

    if (itemName.length > 50) {
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

// THESE SHOULD BE MOVED TO Lablist.js UNDER populate_item_details() WHEN MERGED WITH BACKEND!
// Should be right below the call for checkout form in the current backend branch
// The addButtonContainer function can be run when the page is loaded (checkout side panel does not need to show for this button to display)
const addButtonContainer = document.getElementById('add-button');
addButtonContainer.onclick = async function() {
    add_form();
};

const removeButtonContainer = document.getElementById('remove-button');
removeButtonContainer.onclick = async function() {
    delete_form();
};