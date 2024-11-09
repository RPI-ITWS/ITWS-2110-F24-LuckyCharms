document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-button');

    addButton.addEventListener('click', function() {
        const addForm = document.getElementById('add-form');
        addForm.style.display = "flex";
    });

    const addForm = document.getElementById('add-form-object');
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formContainer = document.getElementById('add-form');
        formContainer.style.display = "none";

        // Make sure the user is an admin here

        const itemName = document.getElementById('item-name').value;
        const itemType = document.getElementById('type-dropdown').value;
        const itemDescription = document.getElementById('new-item-description').value;
        const itemStock = document.getElementById('item-quantity').value;
        const itemImage = document.getElementById('item-image').value;

        // Fetch and POST to PHP here

        console.log("Item Name: ", itemName);
        console.log("Item Type: ", itemType);
        console.log("Item Description: ", itemDescription);
        console.log("Item Stock: ", itemStock);
        console.log("Item Image: ", itemImage);

        addForm.reset();
    });

    const cancelAddFormButton = document.getElementById('cancel-add-form-button');
    cancelAddFormButton.addEventListener('click', function () {
        const addForm = document.getElementById('add-form-object');
        addForm.reset();

        const formContainer = document.getElementById('add-form');
        formContainer.style.display = "none";
    });
});