function homePage(event,homepage=null){if(homepage)
  window.location.href="./";else window.location.href="../"}
  function featuresPage(event,homepage=null){if(homepage)
  window.location.href="./features";else window.location.href="../features"}
  function aboutUsPage(event,homepage=null){if(homepage)
  window.location.href="./about";else window.location.href="../about"}
  function loginPage(event,homepage=null){if(homepage)
  window.location.href="./login";else window.location.href="../login"}
  function signUpPage(event,homepage=null){if(homepage)
  window.location.href="./signup";else window.location.href="../signup"}
  document.addEventListener('DOMContentLoaded',function(){const logoButton=document.getElementById('logo');logoButton.addEventListener('mouseenter',function(){logoButton.style.cursor='pointer'});logoButton.addEventListener('mouseleave',function(){logoButton.style.cursor='default'});const featuresButton=document.getElementById('featuresButton');featuresButton.addEventListener('mouseenter',function(){featuresButton.style.cursor='pointer'});featuresButton.addEventListener('mouseleave',function(){featuresButton.style.cursor='default'});const aboutUsButton=document.getElementById('aboutUsButton');aboutUsButton.addEventListener('mouseenter',function(){aboutUsButton.style.cursor='pointer'});aboutUsButton.addEventListener('mouseleave',function(){aboutUsButton.style.cursor='default'});const loginButton=document.getElementById('login-button');loginButton.addEventListener('mouseenter',function(){loginButton.style.cursor='pointer'});loginButton.addEventListener('mouseleave',function(){loginButton.style.cursor='default'});const signUpButton=document.getElementById('sign-up-button');signUpButton.addEventListener('mouseenter',function(){signUpButton.style.cursor='pointer'});signUpButton.addEventListener('mouseleave',function(){signUpButton.style.cursor='default'})})