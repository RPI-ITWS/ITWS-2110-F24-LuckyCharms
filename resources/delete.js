document.addEventListener('DOMContentLoaded', function () {
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

        // INsert PHP fetch statement here to delete the item

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