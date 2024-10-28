function toggle(source) {
    var checkboxes = document.querySelectorAll('tbody input[type="checkbox"]'); // Only target checkboxes in the tbody
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = source.checked;  // Set all checkboxes' checked status to match the source (header checkbox)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const deleteButton = document.getElementById('delete');  // Make sure this matches the button ID in HTML

    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');  // Find checked checkboxes in the table body
            checkboxes.forEach(function(checkbox) {
                const row = checkbox.closest('tr');  // Get the closest <tr> (the row that contains the checkbox)
                row.remove();  // Remove the row
            });
        });
    }
});
