async function signup(e) {
  e.preventDefault();
  const email = e.target[0].value;
  const username = e.target[1].value;
  const password = e.target[2].value;
  const confirmPassword = e.target[3].value;

  const details = await fetch(`../backend/queries/signUp.php?username=${username}&email=${email}&password=${password}&confirmPW=${confirmPassword}`)
    .then(response => response.text());
  if (details.length) {
    alert(details);
    return false;
  }
  alert('Account created successfully, Directing you to the login page...');
  window.location.href = '../login';
}