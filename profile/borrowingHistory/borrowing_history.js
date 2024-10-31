
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
    const userID = parseInt(document.cookie.substring(7, document.cookie.indexOf(";")));

    $.getJSON("../../resources/data.json", function(dat) {    
        const user = dat.users.find(u => u.id === userID);
        const userName = user ? user.username : "Guest";
        const isAdmin = user.is_admin ? true : false;
        // Call menuClick with the user's name when the menu button is clicked
        document.getElementById("menu-icon").onclick = () => {
            let labsPage = "../user"
            if (isAdmin) {
                labsPage = "../admin"
            }
        
            // Append the new dropdown content
            document.getElementById("dropdown").innerHTML = document.getElementById("dropdown").innerHTML + `<div class="dropdown-content"><h3>${userName}</h3><a href="../../profile">Profile</a><a href=../${labsPage}>My Labs</a><a href="../../profile/borrowingHistory">Borrowing History</a><a href="../../" id="logout">Logout</a></div>`;
        
            // Toggle visibility when the menu is clicked
            document.getElementById("dropdown").onclick = () => {
                let coll = document.getElementsByClassName("dropdown-content");
                for(let i=0; i<coll.length; i++){
                    if (coll[i].classList.contains("show")) {
                        // If it is visible, hide it
                        coll[i].classList.remove("show");
                    } else{
                        // If it is hidden, show it
                        coll[i].classList.add("show");
                    }
                }
            }
        };
            
        if(document.cookie.substring(document.cookie.indexOf('admin=')+6)==="1"){
            populateAdminHistory(dat);
        } else {
            populateUserHistory(dat);
        }
    });
}

function populateUserHistory(dat){
    document.getElementById("table-head").innerHTML = "<th>Item Name</th><th>Lab/Place</th><th>Status</th><th>Reservation Date</th><th>Expected Return Date</th>";
    let id = parseInt(document.cookie.substring(7, document.cookie.indexOf(";")));

    let itemList = "";
    for(let x of dat.reservations){
        if((x.date_returned === null || document.getElementById("chosen").innerHTML === "Borrowing History") && x.user_id===id){
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
    
    let coll = document.getElementsByTagName("tbody");
    for(let x of coll){
        x.innerHTML = itemList;
    }

    colorItemStatus();
}

function populateAdminHistory(dat){
    document.getElementById("table-head").innerHTML = "<th>Item Name</th><th>Borrower Name</th><th>Lab/Place</th><th>Status</th><th>Reservation Date</th><th>Expected Return Date</th>";
    let id = parseInt(document.cookie.substring(7, document.cookie.indexOf(";")));

    let itemList = "";
    let allowedLabs=[];
    for(let pair of dat.allowed_user_locations){
        if (pair.user_id == id){
            allowedLabs.push(pair.location_id);
        }
    }

    for(let x of dat.reservations){
        if((x.date_returned === null || document.getElementById("chosen").innerHTML === "Borrowing History") && allowedLabs.includes(dat.items[x.item_id-1].location_id)){
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
    
    let coll = document.getElementsByTagName("tbody");
    for(let x of coll){
        x.innerHTML = itemList;
    }

    colorItemStatus();
}

document.addEventListener('DOMContentLoaded', function() {  
    //If the userid or admin cookies aren't set, redirect to login page
    if(document.cookie.indexOf('userid=')===-1 || document.cookie.indexOf('admin=')===-1){
      location.href="../../login.html";
    }
    
    populateHistory();
});

document.addEventListener("DOMContentLoaded", function () {
    colorItemStatus();
});