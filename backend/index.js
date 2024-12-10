async function getItemDetails(htmlElement){const itemId=htmlElement.parentElement[0].value;if(!itemId){console.warn("Please input a value in the field.");return}
await fetch(`./queries/itemDetail.php?id=${itemId}`).then((response)=>response.json()).then((result)=>console.log(result))}
async function checkout(htmlElement){const itemId=htmlElement.parentElement[0].value;const userId=htmlElement.parentElement[1].value;const itemCount=htmlElement.parentElement[2].value;if(!itemId){console.warn("Please input a value into item ID");return}
if(!userId){console.warn("Please input a value into User ID");return}
if(!itemCount){console.warn("Please input a value into Item Count");return}
const result=await fetch(`./queries/itemDetail.php?id=${itemId}`).then((response)=>response.json());let queryParams=`itemId=${itemId}&userId=${userId}&itemCount=${itemCount}`
if(parseInt(result.borrowable)){const today=new Date();const oneWeekLater=new Date(today.getTime()+7*24*60*60*1000);queryParams+=`&returnDate=${oneWeekLater.toISOString()}`}
await fetch(`./queries/checkout.php?${queryParams}`).then(async(response)=>response.text()).then((result)=>{if(isJsonString(result))
result=JSON.parse(result);console.log(result)})}
async function getActiveLabs(htmlElement){const userId=htmlElement.parentElement[0].value;if(!userId){console.warn("Please input a value into User ID");return}
await fetch(`./queries/getActiveLabs.php?userId=${userId}`).then((response)=>response.text()).then((result)=>{if(isJsonString(result))
result=JSON.parse(result);console.log(result)})}
async function markReservedItemAsReturned(htmlElement){const reservationId=htmlElement.parentElement[0].value;if(!reservationId){console.warn("Please input a value into Reservation ID");return}
await fetch(`./queries/returnReservedItems.php?reservationId=${reservationId}&returnDate=${new Date().toISOString()}`).then((response)=>response.text()).then((result)=>{if(isJsonString(result))
result=JSON.parse(result);console.log(result)})}
async function getLocation(htmlElement){const userId=htmlElement.parentElement[0].value;if(!userId){console.warn("Please input a user ID");return}
await fetch(`./queries/getLocations.php?userId=${userId}`).then((response)=>response.text()).then((result)=>{if(isJsonString(result))
result=JSON.parse(result);console.log(result);let options=`<select name="locations" form="filter-search-items">`
for(const location of result){options+=`<option value="${location.location_name}">${location.location_name}</option>`}
options+=`</select>`
document.getElementById("filter-search-items").innerHTML=`
                ${options}
                <input name="search_bar" placeholder="Item to search">
                <label for="is_borrowable">Borrowable</label>
                <input type="checkbox" name="is_borrowable" id="is_borrowable">
                <input onclick="searchItem(this)" type="button" value="Search/Filter Items">
            `})}
async function searchItem(htmlElement){const location=htmlElement.parentElement[0].value;const searchValue=htmlElement.parentElement[1].value;const isBorrowable=htmlElement.parentElement[2].checked;if(!location){console.warn("Please input a location");return}
await fetch(`./queries/filterItems.php?location_name=${location}&name=${searchValue}&borrowable=${isBorrowable ? 1 : 0}`).then((response)=>response.text()).then((result)=>{if(isJsonString(result))
result=JSON.parse(result);console.log(result)})}
async function userLogin(htmlElement){const username=htmlElement.parentElement[0].value;const password=htmlElement.parentElement[1].value;if(!username){console.warn("Please input a username");return}
if(!password){console.warn("Please input a password");return}
const user=await fetch(`./queries/login.php?username=${username}&password=${password}`).then((res)=>res.json());if(user.status===loginStatus.USER_DOES_NOT_EXIST){console.log("User does not exist")}
if(user.status===loginStatus.USER_LOGGED_IN){console.log("User successfully logged in")}
if(user.status===loginStatus.INCORRECT_PASSWORD){console.log("Incorrect Password")}}
function isJsonString(str){try{const json=JSON.parse(str);return(typeof json==='object')}catch(e){return!1}}