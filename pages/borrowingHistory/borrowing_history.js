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
        else if (status.textContent === "Not Borrowable - No Return") {
            status.style.backgroundColor = 'green';
        }
        else if (status.textContent !== "") {
            status.style.backgroundColor = 'darkgray';
        }
    });
}

$(document).ready(() => {
    //If the userid or admin cookies aren't set, or if they are not an admin, redirect to login page
    if(document.cookie.indexOf('userid=')===-1 || document.cookie.indexOf('admin=')===-1 ||
        document.cookie.substring(document.cookie.indexOf('admin=')+6)!=="0"){
      location.href="../../login.html";
    }
    let id = parseInt(document.cookie.substring(7, document.cookie.indexOf(";")));
    $.getJSON("../../data.json", function(dat) {

        for(let x of dat.reservations){
            if(x.date_returned === null && x.user_id===id){
                let stat;
                if(dat.items[x.item_id].borrowable===0){
                    stat = "Borrowable - No Return";
                } else if(x.expected_return===null){
                    stat = "No Expected Return Date";
                } else if(new Date() > new Date(x.expected_return)){
                    stat = "OVERDUE - RETURN NOW";
                } else {
                    stat = "Not Due Yet";
                }
                let res = new Date(x.date_reserved);
                let exp_ret = new Date(x.expected_return);
                $("tbody").append(`<tr><td class="item-name">${dat.items[x.item_id].name}</td><td class="place">${dat.locations[dat.items[x.item_id].location_id].name}</td><td><span class="status">${stat}</span></td><td class="reservation">${res.toUTCString()}</td><td class="expected-return-date">${x.expected_return===null ? "None" : exp_ret.toUTCString()}</td></tr>`);
            }
        }
    
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
});