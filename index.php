<?php
    // Should the user come to the homepage, they should be logged out
    session_start();
    session_destroy();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>LIMBS</title>
        <link rel="stylesheet" href="resources/style.css">
        <link rel="stylesheet" href="homepage.css" media="screen">
        <script src="resources/script.js" defer></script>
        <script src="homepage.js" defer></script>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                /*For the sign up button on the general homepage introduction*/
                const titleSignUpButton = document.getElementById('title-sign-up-button');
                titleSignUpButton.addEventListener('click', signUpPage);
                titleSignUpButton.addEventListener('mouseenter', function() {
                    titleSignUpButton.style.cursor = 'pointer';
                });
                titleSignUpButton.addEventListener('mouseleave', function() {
                    titleSignUpButton.style.cursor = 'default';
                });

                /*For the features button on the general homepage introduction*/
                const titleFeaturesButton = document.getElementById('title-features-button');
                titleFeaturesButton.addEventListener('click', featuresPage);
                titleFeaturesButton.addEventListener('mouseenter', function() {
                    titleFeaturesButton.style.cursor = 'pointer';
                });
                titleFeaturesButton.addEventListener('mouseleave', function() {
                    titleFeaturesButton.style.cursor = 'default';
                });

                /*For the getting started button on the general homepage introduction*/
                const gettingStartedButton = document.getElementById('getting-started-button');
                gettingStartedButton.addEventListener('click', signUpPage);
                gettingStartedButton.addEventListener('mouseenter', function() {
                    gettingStartedButton.style.cursor = 'pointer';
                });
                gettingStartedButton.addEventListener('mouseleave', function() {
                    gettingStartedButton.style.cursor = 'default';
                });
            });
        </script>
    </head>
    <body>
        <div id="navbar">
            <h1 id="logo" onclick="homePage(event, 'home')">LIMBS</h1>
            <h2 class="nav-text" id="featuresButton" onclick="featuresPage(event, 'home')">Features</h2>
            <h2 class="nav-text" id="aboutUsButton" onclick="aboutUsPage(event, 'home')">About Us</h2>
            <button class="nav-button" id="login-button" onclick="loginPage(event, 'home')">Login</button>
            <button class="nav-button" id="sign-up-button" onclick="signUpPage(event, 'home')">Sign Up</button>
        </div>

        <div id="content">
            <div id="intro">
                <div id="title-left">
                    <h2 id="introduction-text">Introducing LIMBS</h2>
                    <h3><span class="first-letter">L</span>ab</h3>
                    <h3><span class="first-letter">I</span>nventory</h3>
                    <h3><span class="first-letter">M</span>anagement &</h3>
                    <h3><span class="first-letter">B</span>orrowing</h3>
                    <h3><span class="first-letter">S</span>ystem</h3>
                </div>

                <div id="title-right">
                    <h2 id="slogan">Keeping track so you don't have to!</h2>
                    <button id="title-sign-up-button">Sign up for free</button>
                </div>

                <div class="image">
                    <img id="title-image" src="./resources/landingPageImages/labHomepageDisplay.png" alt="LIMBS Lab Homepage Display">
                </div>

                <div class="description">
                    <p class="paragraph" id="initalDescription">LIMBS is a catalog system that allows both students and faculty to better keep track of equipment. It is expandable, adaptable, and easy to use.</p>
                    <button id="title-features-button">Explore Possibilities</button>
                </div>

                <div class="image-display">
                    <p class="title-text">Ease Of Use</p>
                    <p class="paragraph">LIMBS comes free and easy to use! Checking out an item happens with one click of a button. LIMBS also clearly displays information regarding an items availibility, return due date, and other important information.</p>
                    <img src="./resources/landingPageImages/checkoutPrompt.png" alt="LIMBS Checkout Prompt">
                </div>

                <!-- <div class="description">
                    <p class="paragraph">LIMBS comes free and easy to use! Checking out an item happens with one click of a button. LIMBS also clearly displays information regarding an items availibility, return due date, and other important information.</p>
                </div> -->

                <div class="image-display">
                    <p class="title-text">Secure & Organized</p>
                    <p class="paragraph">LIMBS seperates accounts by three types: User, Admin, and Superuser. Each account type has their own permissions and only has the necessary permissions for their role. This keeps labs and the catalog of items in each lab oragnized and secure.</p>
                    <img src="./resources/landingPageImages/accountTypes.png" alt="LIMBS Account Types Image">
                </div>

                <!-- <div class="description">
                </div> -->

                <div class="image-display">
                    <p class="title-text">Detailed & Informative</p>
                    <p class="paragraph">LIMBS has the ability to display an endless amount of information for every item by simply clicking on it. This will allow the user to find exactly what they need!</p>
                    <img src="./resources/landingPageImages/itemDetails.png" alt="LIMBS Item Details">
                </div>

                <div class="description">
                    <button id="getting-started-button">Get Started With LIMBS Today!</button>
                </div>
            </div>
        </div>
    </body>
</html>