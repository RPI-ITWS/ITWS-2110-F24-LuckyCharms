async function borrowingHistory(isAdmin=!1,getAll=!0,currentPage=1,searchValue=""){const current=document.getElementById('chosen');if(current)
  current.removeAttribute('id');const tabBar=document.getElementById('tab-bar');const tabBarButtons=tabBar.querySelectorAll('h2');let currentlyBorrowingButton
  if(!getAll)
  currentlyBorrowingButton=tabBarButtons[0];else currentlyBorrowingButton=tabBarButtons[1];currentlyBorrowingButton.id='chosen';const pagination=await fetch(`../../backend/queries/totalReservations.php?getAllReservations=${getAll}&searchValue=${searchValue}`).then((res)=>res.json());const totalPages=Math.ceil(pagination.totalReservations/10);document.getElementById("pagination").innerHTML="";if(totalPages>1){let buttons="";for(let i=1;i<=totalPages;i++){buttons+=`<button class="page-button" ${currentPage === i ? "disabled" : ""} onclick="borrowingHistory(${isAdmin}, ${getAll}, ${i})">${i}</button>`}
  document.getElementById("pagination").innerHTML=buttons}
  const history=await fetch(`../../backend/queries/getReservations.php?getAllReservations=${getAll}&page=${currentPage}&searchValue=${searchValue}`).then((res)=>res.json());if(history.length===0){document.getElementById("table-head").innerHTML="";document.getElementById("table-body").innerHTML=`
        <p class="no-reservations">No Reservations Found.</p>
    `;return}
  document.getElementById("table-head").innerHTML=`
      ${isAdmin ? "<th><p>User</p></th>" : ""}
      <th><p>Name</p></th>
      <th><p>Lab</p></th>
      <th>Amount</th>
      <th>Status</th>
      <th>Reservation Date</th>
      <th>Expected Return Date</th>
      ${getAll ? "<th>Date Returned/Cancelled</th>" : ""}
      ${isAdmin && !getAll ? "<th>Actions</th>" : ""}
    `;function getStatus(reservation){if(reservation.cancelled===1)
  return"<div class='status cancelled'>Cancelled</div>";if(reservation.completed===1)
  return"<div class='status completed'>Completed</div>";let expectedReturnDate;if(reservation.date_expected_to_return)
  expectedReturnDate=new Date(reservation.date_expected_to_return);if(expectedReturnDate<today&&!reservation.date_returned&&reservation.borrowable!==0)
  return"<div class='status danger'>OVERDUE - NEEDS TO BE RETURNED</div>";return"<div class='status ongoing'>Ongoing</div>"}
  function getDate(reservation){if((reservation.cancelled===1||reservation.completed===1)&&reservation.date_returned)
  return new Date(reservation.date_returned).toLocaleString();return"N/A"}
  function getExpectedDate(reservation){if(reservation.borrowable===0)
  return"Not Borrowable - No Return";return new Date(reservation.date_expected_to_return).toLocaleString()}
  let body="";const today=new Date();for(const reservation of history){body+=`
        <tr>
          ${isAdmin ? `<td>${reservation.username}</td>` : ""}
          <td><p>${reservation.name}</p></td>
          <td>${reservation.location_name}</td>
          <td>${reservation.amount}</td>
          <td>${getStatus(reservation)}</td>
          <td>${new Date(reservation.date_reserved).toLocaleString()}</td>
          <td>${getExpectedDate(reservation)}</td>
          ${getAll ? `<td>${getDate(reservation)||"N/A"}</td>` : ""}
          ${isAdmin && !getAll ? `<td><button class="complete-reservation" onclick='completeReservation(${reservation.id})'>Complete Reservation</button><button class="cancel-reservation" onclick='cancelReservation(${reservation.id})'>Cancel Reservation</button></td>` : ""}
        </tr>
      `}
  document.getElementById("table-body").innerHTML=body}
  async function search(event=null){if(event){if(event.key!=='Enter'){return}}
  const searchValue=document.getElementById('search').value;const current=document.getElementById('chosen');const isAdmin=await fetch('../../backend/queries/isAdmin.php').then(res=>res.text());if(current.innerText==="Borrowing History")
  await borrowingHistory(isAdmin,!0,1,searchValue);else await borrowingHistory(isAdmin,!1,1,searchValue)}
  async function completeReservation(reservationId){const date=new Date().toISOString().slice(0,19).replace('T',' ');const response=await fetch(`../../backend/queries/completeReservation.php?reservationId=${reservationId}&returnDate=${date}`).then((res)=>res.text()).catch(err=>console.err(err));await borrowingHistory(!0,!1)}
  async function cancelReservation(reservationId){const date=new Date().toLocaleString();const response=await fetch(`../../backend/queries/cancelReservation.php?reservationId=${reservationId}&returnDate=${date}`).then((res)=>res.text()).catch(err=>console.error(err));console.log(response);await borrowingHistory(!0,!1)}(async()=>{const isAdmin=await fetch('../../backend/queries/isAdmin.php').then(res=>res.text());await borrowingHistory(isAdmin==="1")})()