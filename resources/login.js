async function validateLogin(event) {
  const USER_DOES_NOT_EXIST = 1;
  const USER_LOGGED_IN = 2;
  const INCORRECT_PASSWORD = 3;


  event.preventDefault();
  const username = event.target[0].value;
  const password = event.target[1].value;

  // No need to check if they exist since it should be handled by the form
  const user = await fetch(`./backend/queries/login.php?username=${username}&password=${password}`).then((res) => res.json());
  if (user.status === USER_DOES_NOT_EXIST) {
    location.replace("./");
  } else if (user.status === USER_LOGGED_IN) {
    if (user.isAdmin) {
      location.replace("./admin_homepage.php");
    } else {
      location.replace("./user_homepage.php");
    }
  } else if (user.status === INCORRECT_PASSWORD) {
    $("#pass").css("border", "2px solid red");
    alert("Incorrect password.");
  }

}
