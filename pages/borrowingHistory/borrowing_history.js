function profileClick() {
    window.location.href = '../profilePage/profile.html';
}

function myLabsClick() {
    window.location.href = '../user_homepage.html';
}

function borrowingHistoryClick() {
    window.location.href = './borrowing_history.html';
}

function logoutClick() {
    window.location.href = '../login_and_signup_page.html';
}

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

    const menuButton = document.getElementById('menu-icon');
    const dropdownContent = document.querySelector('.dropdown-content');

    menuButton.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('#menu-icon') && 
            !event.target.matches('.dropdown-content') &&
            !event.target.matches('h3') && 
            !event.target.matches('h4') && 
            !event.target.matches('h5')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });
});