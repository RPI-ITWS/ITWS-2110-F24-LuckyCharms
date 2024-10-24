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
    window.location.href = '../login.html';
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
    
    populateHistory();
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

    populateHistory();
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

function populateHistory(){
    if(document.cookie.substring(document.cookie.indexOf('admin=')+6)==="1"){
        populateAdminHistory();
    } else {
        populateUserHistory()
    }
}

function populateUserHistory(){
    $("#table-head").html("<th>Item Name</th><th>Lab/Place</th><th>Status</th><th>Reservation Date</th><th>Expected Return Date</th>");
    let id = parseInt(document.cookie.substring(7, document.cookie.indexOf(";")));

    $.getJSON("../../data.json", function(dat) {
        let itemList = "";
        for(let x of dat.reservations){
            if((x.date_returned === null || $("#chosen").html() === "Borrowing History") && x.user_id===id){
                let stat;
                if(dat.items[x.item_id-1].borrowable===0){
                    stat = "Borrowable - No Return";
                } else if(x.date_returned!==null){
                    let ret = new Date(x.date_returned);
                    stat = `Returned ${ret}`;
                } else if(x.expected_return===null){
                    stat = "No Expected Return Date";
                } else if(new Date() > new Date(x.expected_return)){
                    stat = "OVERDUE - RETURN NOW";
                } else {
                    stat = "Not Due Yet";
                }
                let res = new Date(x.date_reserved);
                let exp_ret = new Date(x.expected_return);
                itemList += `<tr><td class="item-name">${dat.items[x.item_id-1].name}</td><td class="place">${dat.locations[dat.items[x.item_id-1].location_id-1].name}</td><td><span class="status">${stat}</span></td><td class="reservation">${res.toUTCString()}</td><td class="expected-return-date">${x.expected_return===null ? "None" : exp_ret.toUTCString()}</td></tr>`;
            }
        }
        
        $("tbody").html(itemList);

        colorItemStatus();
    });
}

function populateAdminHistory(){
    $("#table-head").html("<th>Item Name</th><th>Borrower Name</th><th>Lab/Place</th><th>Status</th><th>Reservation Date</th><th>Expected Return Date</th>");
    let id = parseInt(document.cookie.substring(7, document.cookie.indexOf(";")));

    $.getJSON("../../data.json", function(dat) {
        let itemList = "";
        let allowedLabs=[];
        for(let pair of dat.allowed_user_locations){
            if (pair.user_id == id){
                allowedLabs.push(pair.location_id);
            }
        }

        for(let x of dat.reservations){
            if((x.date_returned === null || $("#chosen").html() === "Borrowing History") && allowedLabs.includes(dat.items[x.item_id-1].location_id)){
                let stat;
                if(dat.items[x.item_id-1].borrowable===0){
                    stat = "Borrowable - No Return";
                } else if(x.date_returned!==null){
                    let ret = new Date(x.date_returned);
                    stat = `Returned ${ret}`;
                } else if(x.expected_return===null){
                    stat = "No Expected Return Date";
                } else if(new Date() > new Date(x.expected_return)){
                    stat = "OVERDUE - RETURN NOW";
                } else {
                    stat = "Not Due Yet";
                }
                let res = new Date(x.date_reserved);
                let exp_ret = new Date(x.expected_return);
                itemList += `<tr><td class="item-name">${dat.items[x.item_id-1].name}</td><td class="borrower-name">${dat.users[x.user_id-1].username}</td><td class="place">${dat.locations[dat.items[x.item_id-1].location_id-1].name}</td><td><span class="status">${stat}</span></td><td class="reservation">${res.toUTCString()}</td><td class="expected-return-date">${x.expected_return===null ? "None" : exp_ret.toUTCString()}</td></tr>`;
            }
        }
        
        $("tbody").html(itemList);

        colorItemStatus();
    });
}

$(document).ready(() => {
    
    
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

    //If the userid or admin cookies aren't set, redirect to login page
    if(document.cookie.indexOf('userid=')===-1 || document.cookie.indexOf('admin=')===-1){
      location.href="../../login.html";
    }
    
    populateHistory();
});