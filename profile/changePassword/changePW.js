async function validateChange(event) {
    event.preventDefault();

    const oldPassword = event.target[0].value;
    const newPassword = event.target[1].value;
    const newPasswordConfirm = event.target[2].value; // Corrected index

    try {
        const response = await fetch(`../../backend/queries/changePassword.php?oldPassword=${oldPassword}&newPassword=${newPassword}&newPasswordConfirm=${newPasswordConfirm}`);
        
        if (!response.ok) {
            throw new Error("Failed to change password: " + response.status);
        }

        const data = await response.json();

        const INCORRECT_PASSWORD = 1;
        const REPEAT_PASSWORD_WRONG = 2;
        const PASSWORD_CHANGED = 3;

        if (data.status === PASSWORD_CHANGED) {
            alert("Password changed!");
        } else if (data.status === REPEAT_PASSWORD_WRONG) {
            $("#new-password-confirm").css("border", "2px solid red");
            alert("Passwords do not match!");
        } else if (data.status === INCORRECT_PASSWORD) {
            $("#old-password").css("border", "2px solid red");
            alert("Incorrect password.");
        } else {
            alert("Unexpected error.");
        }
    } catch (error) {
        console.error(error);
        alert("An error occurred while changing the password.");
    }
}