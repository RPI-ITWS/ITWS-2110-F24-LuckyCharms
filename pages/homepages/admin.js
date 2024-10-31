function toggle(source) {
    var checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = source.checked; 
    }
    updateDeleteButtonVisibility();
}

function updateDeleteButtonVisibility() {
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]'); 
    const deleteButton = document.getElementById('delete');
    const countLabel = document.getElementById('checked-count');

    // check if at least one checkbox is checked
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    countLabel.textContent = checkedCount > 0 ? `${checkedCount} selected` : ''; 

    // show/hide the delete button based on checked state
    if (checkedCount > 0) {
        deleteButton.style.visibility = 'visible';
    } else {
        deleteButton.style.visibility = 'hidden';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const deleteButton = document.getElementById('delete'); 
    deleteButton.style.visibility = 'hidden';

    // add event listener to all checkboxes
    const labItems = document.getElementById('lab-items');
    labItems.addEventListener('change', function(event) {
        if (event.target.matches('input[type="checkbox"]')) { 
            updateDeleteButtonVisibility();
        }
    });

    // event listener for the delete button click
    // add code for deleteing it from the database 
    deleteButton.addEventListener('click', function() {
        const checkedCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked'); 
        checkedCheckboxes.forEach(function(checkbox) {
            const row = checkbox.closest('tr'); 
            row.remove();
        });
        updateDeleteButtonVisibility();
    });
});
