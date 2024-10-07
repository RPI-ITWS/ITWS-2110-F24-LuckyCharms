function homePage(event) {
    window.location.href = "./index.html";
}

function featuresPage(event) {
    window.location.href = "./resources/features.html";
}

function aboutUsPage(event) {
    window.location.href = "./resources/aboutUs.html";
}

function loginPage(event) {
    window.location.href = "./resources/login.html";
}

function signUpPage(event) {
    window.location.href = "./resources/signUp.html";
}

document.addEventListener('DOMContentLoaded', function() {
    const logoButton = document.getElementById('logo');
    logoButton.addEventListener('click', homePage);
    logoButton.addEventListener('mouseenter', function() {
        logoButton.style.cursor = 'pointer';
    });
    logoButton.addEventListener('mouseleave', function() {
        logoButton.style.cursor = 'default';
    });

    const featuresButton = document.getElementById('featuresButton');
    featuresButton.addEventListener('click', featuresPage);
    featuresButton.addEventListener('mouseenter', function() {
        featuresButton.style.cursor = 'pointer';
    });
    featuresButton.addEventListener('mouseleave', function() {
        featuresButton.style.cursor = 'default';
    });

    const aboutUsButton = document.getElementById('aboutUsButton');
    aboutUsButton.addEventListener('click', aboutUsPage);
    aboutUsButton.addEventListener('mouseenter', function() {
        aboutUsButton.style.cursor = 'pointer';
    });
    aboutUsButton.addEventListener('mouseleave', function() {
        aboutUsButton.style.cursor = 'default';
    });

    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', loginPage);
    loginButton.addEventListener('mouseenter', function() {
        loginButton.style.cursor = 'pointer';
    });
    loginButton.addEventListener('mouseleave', function() {
        loginButton.style.cursor = 'default';
    });

    const signUpButton = document.getElementById('sign-up-button');
    signUpButton.addEventListener('click', signUpPage);
    signUpButton.addEventListener('mouseenter', function() {
        signUpButton.style.cursor = 'pointer';
    });
    signUpButton.addEventListener('mouseleave', function() {
        signUpButton.style.cursor = 'default';
    });

    const titleSignUpButton = document.getElementById('title-sign-up-button');
    titleSignUpButton.addEventListener('click', signUpPage);
    titleSignUpButton.addEventListener('mouseenter', function() {
        titleSignUpButton.style.cursor = 'pointer';
    });
    titleSignUpButton.addEventListener('mouseleave', function() {
        titleSignUpButton.style.cursor = 'default';
    });
});