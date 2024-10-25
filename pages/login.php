<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Log In</title>
  <link rel="stylesheet" href="../resources/style.css" media="screen">
  <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
  <script src="../homepage.js" defer></script>
  <script src="../resources/login.js" defer></script>
  <script>
    // If there's no account with the username, tell them and do nothing; if
    // there is one, tell them if the password's wrong, or set userid cookie
    // with the record id and redirect to appropriate homepage.
    /*function validateLogin(event){
      event.preventDefault();
      $.getJSON("/resources/data.json", function(data){
        for(let x of data.users){
          if(x.username === $("#username").val()){
            if(x.password !== $("#pass").val()){
              alert("Incorrect password.");
              $("#pass").css("border", "2px solid red");
              return false;
            } else {
              //delete old cookies
              document.cookie = "userid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
              document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

              document.cookie = `userid=${x.id}; path=/`;
              if(x.is_admin === 1){
                document.cookie = `admin=1; path=/`;
                location.replace('./homepages/admin_homepage.html');
                return true;
              } else {
                document.cookie = `admin=0; path=/`;
                location.replace("./homepages/user_homepage.html");
                return true;
              }
            }
          }
        }
        alert("Account does not exist.");
        location.replace('./signup.html');
        return false;
    });
  }*/
  </script>
</head>
<body>
  <div id="navbar">
    <h1 id="logo">LIMBS</h1>
    <h2 class="nav-text" id="featuresButton">Features</h2>
    <h2 class="nav-text" id="aboutUsButton">About Us</h2>
    <button class="nav-button" id="login-button">Login</button>
    <button class="nav-button" id="sign-up-button">Sign Up</button>
</div>
  <div id="content">
    <div class="login_signup">
      <h4 class="first-letter">Log In</h4>
      <form id="login" onsubmit="return validateLogin(event);">
        <label for="username">username</label>
        <input name="username" id="username" type="text" required placeholder="type username here">
        <label for="pass">password</label>
        <input name="pass" id="pass" type="password" required>
        <!--Inline styling because this is the only page with something like this.-->
        <a style="text-align: right; margin-top: 11px; font-size: 12px; font-weight: bold;">Forgot Password?</a>
        <button id="submit" type="submit">Log In</button>
      </form>
      <a href="signup.html">Sign Up</a>
    </div>
  </div>
</body>
</html>