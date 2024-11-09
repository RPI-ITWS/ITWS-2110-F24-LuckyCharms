document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-button');

    addButton.addEventListener('click', function() {
        const addForm = document.getElementById('add-form');
        addForm.style.display = "flex";
    });

    const addForm = document.getElementById('add-form-object');
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemType = document.getElementById('type-dropdown').value;
        const itemDescription = document.getElementById('new-item-description').value;
        const itemStock = document.getElementById('item-quantity').value;
        const itemImage = document.getElementById('item-image').value;

        if (itemName.length > 50) {
            alert("The item name must be less than 100 charecters!")
        }
        else {
            const formContainer = document.getElementById('add-form');
            formContainer.style.display = "none";

            // Fetch and POST to PHP here

            console.log("Item Name: ", itemName);
            console.log("Item Type: ", itemType);
            console.log("Item Description: ", itemDescription);
            console.log("Item Stock: ", itemStock);
            console.log("Item Image: ", itemImage);

            addForm.reset();
        }
    });

    const cancelAddFormButton = document.getElementById('cancel-add-form-button');
    cancelAddFormButton.addEventListener('click', function () {
        const addForm = document.getElementById('add-form-object');
        addForm.reset();

        const formContainer = document.getElementById('add-form');
        formContainer.style.display = "none";
    });
});