function toggle(source) {
    var checkboxes = document.querySelectorAll('tbody input[type="checkbox"]'); // Only target checkboxes in the tbody
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = source.checked;  // Set all checkboxes' checked status to match the source (header checkbox)
    }
    updateDeleteButtonVisibility();  // Update visibility after toggling
}

function updateDeleteButtonVisibility() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // All checkboxes in the tbody
    const deleteButton = document.getElementById('delete'); // The delete button

    // Check if at least one checkbox is checked
    const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    // Show or hide the delete button based on checked state
    if (isChecked) {
        deleteButton.style.display = 'block'; // Show the button
    } else {
        deleteButton.style.display = 'none'; // Hide the button
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const deleteButton = document.getElementById('delete');  // Make sure this matches the button ID in HTML

    // Initially hide the delete button
    deleteButton.style.display = 'none';

    // Add event listener to all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateDeleteButtonVisibility); // Update button visibility on change
    });

    // The delete button functionality
    deleteButton.addEventListener('click', function() {
        const checkedCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');  // Find checked checkboxes in the table body
        checkedCheckboxes.forEach(function(checkbox) {
            const row = checkbox.closest('tr');  // Get the closest <tr> (the row that contains the checkbox)
            row.remove();  // Remove the row
        });
        updateDeleteButtonVisibility(); // Update visibility after deletion
    });
});
