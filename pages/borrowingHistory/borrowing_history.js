
function currentlyBorrowingClick() {
    const current = document.getElementById('chosen');

    if (current) {
        current.removeAttribute('id');
    }

    const tabBar = document.getElementById('tab-bar');
    const tabBarButtons = tabBar.querySelectorAll('h2');
    const currentlyBorrowingButton = tabBarButtons[0];

    currentlyBorrowingButton.id = 'chosen';
}

function borrowingHistoryClick() {
    const current = document.getElementById('chosen');

    if (current) {
        current.removeAttribute('id');
    }

    const tabBar = document.getElementById('tab-bar');
    const tabBarButtons = tabBar.querySelectorAll('h2');
    const borrowingHistoryButton = tabBarButtons[1];

    borrowingHistoryButton.id = 'chosen';
}

function colorItemStatus() {
    const itemStatusList = document.querySelectorAll('.status');

    itemStatusList.forEach((status) => {
        if (status.textContent === "OVERDUE - RETURN NOW") {
            status.style.backgroundColor = 'red';
        }
        else if (status.textContent === "Borrowable - No Return") {
            status.style.backgroundColor = 'green';
        }
        else if (status.textContent !== "") {
            status.style.backgroundColor = 'darkgray';
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    colorItemStatus();
});