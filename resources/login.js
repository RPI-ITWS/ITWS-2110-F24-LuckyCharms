async function validateLogin(event) {
  const USER_DOES_NOT_EXIST = 1;
  const USER_LOGGED_IN = 2;
  const INCORRECT_PASSWORD = 3;


  event.preventDefault();
  const username = event.target[0].value;
  const password = event.target[1].value;

  // No need to check if they exist since it should be handled by the form
  const user = await fetch(`../backend/queries/login.php?username=${username}&password=${password}`).then((res) => res.json());
  if (user.status === USER_DOES_NOT_EXIST) {
    location.replace("./");
  } else if (user.status === USER_LOGGED_IN) {
    document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = `userid=1}; path=/`;
    if (user.isAdmin) {
      document.cookie = `admin=1; path=/`;
      location.replace("../admin");
    } else {
      document.cookie = `admin=0; path=/`;
      location.replace("../user");
    }
  } else if (user.status === INCORRECT_PASSWORD) {
    $("#pass").css("border", "2px solid red");
    alert("Incorrect password.");
  }

}
