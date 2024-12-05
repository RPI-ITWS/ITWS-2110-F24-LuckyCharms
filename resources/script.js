//used by many different pages

/* This should show the menu options when the menu button
  on the navbar is clicked. */
function menuClick(userName, isAdmin, routing = "../") {
  let labsPage = `${routing}user`;
  if (isAdmin) {
    labsPage = `${routing}admin`;
  }

  // Append the new dropdown content
  document.getElementById("dropdown").innerHTML += `
    <div class="dropdown-content">
      <h3>${userName}</h3>
      <a href="${routing}profile">Profile</a>
      <a href="${labsPage}">My Labs</a>
      <a href="${routing}profile/borrowingHistory">Borrowing History</a>
      <a href="${routing}" id="logout">Logout</a>
    </div>
  `;

  const dropdownContent = document.querySelector('.dropdown-content');

  // Toggle visibility when the menu is clicked
  document.getElementById("menu-icon").onclick = (e) => {
    e.stopPropagation(); 
    dropdownContent.classList.toggle("show");
  };

  // Close the dropdown when clicking outside
  document.addEventListener('click', (event) => {
    if (!dropdownContent.contains(event.target) && dropdownContent.classList.contains('show')) {
      dropdownContent.classList.remove('show');
    }
  });
}
