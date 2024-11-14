document.addEventListener("DOMContentLoaded", function(){
    //populate labs

    //If the userid or admin cookies aren't set, or if they are not an admin, redirect to login page
    if(document.cookie.indexOf('userid=')===-1 || document.cookie.indexOf('admin=')===-1 ||
        document.cookie.substring(document.cookie.indexOf('admin=')+6)!=="1"){
      location.href="../login";
    }
    // Populates the page based on the userid stored in the userid cookie
    $.getJSON("../resources/data.json", function(dat) {
      populate(dat);

      const userID = parseInt(document.cookie.substring(7, document.cookie.indexOf(";")));
      const user = dat.users.find(u => u.id === userID);
      const userName = user ? user.username : "Guest";
      const isAdmin = user.is_admin ? true : false;

      // Call menuClick with the user's name when the menu button is clicked
      document.getElementById("menu-icon").onclick = () => {menuClick(userName, isAdmin);}

      // Populate labs with the user's labs
      userLabs(userID, dat);
    });

    //code for the forms to add and delete items from the lab
    const addButton = document.getElementById('add-button');

    addButton.addEventListener('click', function() {
        const addForm = document.getElementById('add-form');
        addForm.style.display = "flex";
    });

    const addForm = document.getElementById('add-form-object');
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const labName = document.getElementById('lab-name').textContent;
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

            console.log("Lab Name: ", labName);
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

    const removeButton = document.getElementById('remove-button');

    removeButton.addEventListener('click', function() {
        const deleteForm = document.getElementById('delete-item');
        deleteForm.style.display = "flex";

        const deleteTitle = document.getElementById('delete-title');
        const itemTitleContainer = document.getElementById('item-title-text');
        const itemTitle = itemTitleContainer.textContent;
        deleteTitle.textContent = "Delete " + itemTitle;
    });

    const deleteButton = document.getElementById('delete-button');
    deleteButton.addEventListener('click', function() {
        const itemTitleContainer = document.getElementById('item-title-text');
        const itemTitle = itemTitleContainer.textContent;

        const labName = document.getElementById('lab-name').textContent;

        // Insert PHP to find the specific item from the lab name and remove it

        console.log("Lab to check:", labName);
        console.log("Item to delete: ", itemTitle);

        const deleteContainer = document.getElementById('delete-item');
        deleteContainer.style.display = "none";
    });

    const cancelButton = document.getElementById('cancel-delete-button');
    cancelButton.addEventListener('click', function() {
        const deleteContainer = document.getElementById('delete-item');
        deleteContainer.style.display = "none";
    });
});