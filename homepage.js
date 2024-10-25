/*For the general homepage*/

/*Go to the homepage*/
function homePage(event) {
    window.location.href = "/index.html";
}

/*Go to the features page*/
function featuresPage(event) {
    window.location.href = "/pages/features.html";
}

/*Go to the about us page*/
function aboutUsPage(event) {
    window.location.href = "/pages/aboutUs.html";
}

/*Go to the login page*/
function loginPage(event) {
    window.location.href = "pages/login.php";
}

/*Go to the create account/sign up page*/
function signUpPage(event) {
    window.location.href = "./pages/signup.html";
}

/*Code below runs AFTER the DOM is fully loaded*/
document.addEventListener('DOMContentLoaded', function() {
    /*For the logo button*/
    const logoButton = document.getElementById('logo');
    /*Each button has a click function that is activated when the button is clicked*/
    logoButton.addEventListener('click', homePage);
    /*Each button will be changing the cursor to a pointer when it is being hovered over*/
    logoButton.addEventListener('mouseenter', function() {
        logoButton.style.cursor = 'pointer';
    });
    logoButton.addEventListener('mouseleave', function() {
        logoButton.style.cursor = 'default';
    });

    /*For the features Button on the navigation bar*/
    const featuresButton = document.getElementById('featuresButton');
    featuresButton.addEventListener('click', featuresPage);
    featuresButton.addEventListener('mouseenter', function() {
        featuresButton.style.cursor = 'pointer';
    });
    featuresButton.addEventListener('mouseleave', function() {
        featuresButton.style.cursor = 'default';
    });

    /*For the about us button on the navigation bar*/
    const aboutUsButton = document.getElementById('aboutUsButton');
    aboutUsButton.addEventListener('click', aboutUsPage);
    aboutUsButton.addEventListener('mouseenter', function() {
        aboutUsButton.style.cursor = 'pointer';
    });
    aboutUsButton.addEventListener('mouseleave', function() {
        aboutUsButton.style.cursor = 'default';
    });

    /*For the login button on the navigation bar*/
    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', loginPage);
    loginButton.addEventListener('mouseenter', function() {
        loginButton.style.cursor = 'pointer';
    });
    loginButton.addEventListener('mouseleave', function() {
        loginButton.style.cursor = 'default';
    });

    /*For the sign up button on the navigation bar*/
    const signUpButton = document.getElementById('sign-up-button');
    signUpButton.addEventListener('click', signUpPage);
    signUpButton.addEventListener('mouseenter', function() {
        signUpButton.style.cursor = 'pointer';
    });
    signUpButton.addEventListener('mouseleave', function() {
        signUpButton.style.cursor = 'default';
    });
});