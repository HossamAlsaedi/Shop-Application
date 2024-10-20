

const productsPerPage = 6;  // here you can change the number of products per page


const BgCover = document.querySelector('.bgCover');

    const alert = document.querySelector(".alert");

    function showAlert(type, message, duration = 2000) {
        // Check for an existing active alert and remove the active class if found
        const existingAlert = document.querySelector('.alert');

        if (existingAlert) {
            existingAlert.remove();
        }
    
        const alertContainer = document.createElement('div');

        alertContainer.className = `alert  ${type}`; 
        console.log(alertContainer)
    
        const alertMessage = document.createElement('p');
        alertMessage.innerHTML = message; // Set the alert message
    
        alertContainer.appendChild(alertMessage);
    
        document.body.appendChild(alertContainer); 
        setTimeout(() => {
            alertContainer.classList.add('active');
        }, 50);
        setTimeout(() => {
            alertContainer.classList.remove("active"); // Remove active class to hide the alert
        }, duration);
    }

        // showAlert("", "This is a default alert message."); // Example default message
        // showAlert("failed", "Something went wrong!"); // Failure message
        // showAlert("success", "Your reset code is: <strong>123456</strong>", 3000); if we want something to be more obvious 


//--------------------------------------- general account functions ---------------------------------------------------

// remove all account related forms from the DOM
function removeElements() {
    const elementIds = [
        "accountForm",
        "loginForm",
        "registerForm",
        "forgotPasswordForm",
        "resetCodeForm",
        "newPasswordForm",
        "accountUI",
        "logoutLink",
        "deleteAccountLink"
    ];
    elementIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
        }
    });
}

function addCloseIconToForm() {
    const deleteFormButton = document.getElementById("deleteAccountForm");
    const accountForm = document.getElementById("accountForm");

    // Define a function to remove the account form
    function removeAccountForm() {
        if (accountForm) {
            accountForm.remove();
            BgCover.style.display = "none";
        }
    }

    // Add event listeners to both elements
    if (deleteFormButton) {
        deleteFormButton.addEventListener("click", removeAccountForm);
    }

    if (BgCover) {
        BgCover.addEventListener("click", removeAccountForm);
    }
}

// making enter button work for confirmed links/buttons
function addEnterKeyListenerForForms() {
    // List of all forms where Enter key should trigger the Confirm action
    const inputSelectors = [
        "#registerUsername", "#registerPassword", "#confirmPassword", "#registerEmail",
        "#loginUsername", "#loginPassword",
        "#forgotPasswordEmail",
        "#resetCode",
        "#newPassword", "#newConfirmPassword"
    ];

    inputSelectors.forEach(selector => {
        const inputElement = document.querySelector(selector);
        if (inputElement) {
            inputElement.addEventListener("keydown", handleEnterKey);
        }
    });
}

function handleEnterKey(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default behavior

        // Determine the correct action based on which input is focused
        const activeElementId = document.activeElement.id;

        switch (activeElementId) {
            case "registerUsername":
            case "registerPassword":
            case "confirmPassword":
            case "registerEmail":
                document.getElementById("registerBtn").click();
                break;
            case "loginUsername":
            case "loginPassword":
                document.getElementById("loginBtn").click();
                break;
            case "forgotPasswordEmail":
                document.getElementById("sendResetCodeBtn").click();
                break;
            case "resetCode":
                document.getElementById("verifyResetCodeBtn").click();
                break;
            case "newPassword":
            case "newConfirmPassword":
                document.getElementById("resetPasswordBtn").click();
                break;
        }
    }
}

// back to login form 
function switchToLoginForm() {
    removeElements(); // Remove any existing form elements
    rebuildLoginForm(); // Rebuild the login form
}


//--------------------------------------- Account login/register functions ---------------------------------------------

function rebuildLoginForm() {
    let accountFormContainer = document.getElementById("accountForm");

    // If the container doesn't exist, create it
    if (!accountFormContainer) {
        accountFormContainer = document.createElement("div");
        accountFormContainer.id = "accountForm";
        document.body.appendChild(accountFormContainer);
    }

    // Clear any existing content inside the container
    accountFormContainer.innerHTML = '';

    // Build the Login Form using template literals
    const loginFormContent = `
        <div class="deleteContainer">
            <span class="delete" id="deleteAccountForm"><i class="fa-light fa-x"></i></span>
        </div>
        <div id="loginForm">
            <div class="form-group">
                <label for="loginUsername">Username</label>
                <input type="text" id="loginUsername" minlength="4" maxlength="12">
                <span class="invalid" id="InvalidLoginUsername">Invalid username</span>
            </div>
            <div class="form-group">
                <label for="loginPassword">Password</label>
                <input type="password" id="loginPassword" minlength="4" maxlength="15">
                <span class="invalid" id="InvalidLoginPassword">Invalid password</span>
            </div>
            <div class="form-group">
                <button id="loginBtn">Log In</button>
            </div>
            <div id="registerLink" class="link">Register</div>
            <div id="forgotPasswordLink" class="link">Forgot Password</div>
        </div>
    `;

    // Add the login form to the container
    accountFormContainer.innerHTML = loginFormContent;

    // Add event listeners
    const loginButton = document.getElementById("loginBtn");
    const registerLink = document.getElementById("registerLink");
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");

    loginButton.addEventListener("click", validateLogin);
    registerLink.addEventListener("click", switchToRegisterForm);
    forgotPasswordLink.addEventListener("click", switchToForgotPasswordForm);

    addCloseIconToForm();
    addEnterKeyListenerForForms();
}


function switchToRegisterForm() {
    // Get the container where the form should be added
    let accountFormContainer = document.getElementById("accountForm");
    
    // Clear any existing content inside the container
    accountFormContainer.innerHTML = '';
    
    // Create the register form using template literals
    const registerFormHTML = `
            <div class="deleteContainer">
                <span class="delete" id="deleteAccountForm"><i class="fa-light fa-x"></i></span>
            </div>
        <div id="registerForm">
            <div class="form-group">
                <label for="registerUsername">Username</label>
                <input type="text" id="registerUsername" minlength= "4" maxlength= "12">
                <span class="invalid" id="usernameInvalid">Username is already taken</span>
            </div>
            <div class="form-group">
                <label for="registerEmail">Email</label>
                <input type="email" id="registerEmail" minlength= "6" maxlength= "18">
                <span class="invalid" id="emailInvalid">Email is already registered</span>
            </div>
            <div class="form-group">
                <label for="registerPassword">Password</label>
                <input type="password" id="registerPassword" minlength= "4" maxlength= "15">
                <span class="invalid" id="registerPasswordInvalid">password must have least 4 characters</span>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" minlength= "4" maxlength= "15">
                <span class="invalid" id="passwordMismatch">Passwords do not match</span>
            </div>
            <div class="form-group">
                <button id="registerBtn">Register</button>
            </div>
            <div id="backToLoginFromRegister" class="link">Back to Log In</div>
        </div>
    `;

    // Inject the register form HTML into the accountForm container
    accountFormContainer.innerHTML = registerFormHTML;

    // Add event listeners
    document.getElementById("registerBtn").addEventListener("click", register);
    document.getElementById("backToLoginFromRegister").addEventListener("click", rebuildLoginForm);
    addCloseIconToForm()
    addEnterKeyListenerForForms();
}

// Function to store registration data in local storage
function register() {
    const username = document.getElementById('registerUsername');
    const email = document.getElementById('registerEmail');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');

    const usernameInvalid = document.getElementById('usernameInvalid');
    const emailInvalid = document.getElementById('emailInvalid');
    const registerPasswordInvalid = document.getElementById('registerPasswordInvalid');
    const passwordMismatch = document.getElementById('passwordMismatch');

    const minLength = 4; // Define minimum length for inputs

    // Hide specific invalid span and remove red borders when typing into input fields
    username.addEventListener('input', () => {
        usernameInvalid.style.display = 'none';
        username.style.border = ''; // Remove red border
    });
    email.addEventListener('input', () => {
        emailInvalid.style.display = 'none';
        email.style.border = ''; // Remove red border
    });
    password.addEventListener('input', () => {
        registerPasswordInvalid.style.display = 'none';
        password.style.border = ''; // Remove red border
    });
    confirmPassword.addEventListener('input', () => {
        passwordMismatch.style.display = 'none';
        password.style.border = ''; // Remove red border
        confirmPassword.style.border = ''; // Remove red border
    });

    // Check if all fields are filled
    if (username.value && email.value && password.value && confirmPassword.value) {
        let isInvalid = false;

        // Check for minimum length
        if (username.value.length < minLength) {
            usernameInvalid.textContent = `Username must be at least ${minLength} characters`;
            usernameInvalid.style.display = 'block';
            username.style.border = '1px solid red';
            isInvalid = true;
        }

        if (email.value.length < 6) {
            emailInvalid.textContent = `Email must be at least 6 characters`;
            emailInvalid.style.display = 'block';
            email.style.border = '1px solid red';
            isInvalid = true;
        }

        if (password.value.length < minLength) {
            registerPasswordInvalid.textContent = `Password must be at least ${minLength} characters`;
            registerPasswordInvalid.style.display = 'block';
            password.style.border = '1px solid red';
            isInvalid = true;
        }

        if (confirmPassword.value.length < minLength) {
            passwordMismatch.textContent = `Confirm password must be at least ${minLength} characters`;
            passwordMismatch.style.display = 'block';
            confirmPassword.style.border = '1px solid red';
            isInvalid = true;
        }

        // Check for password mismatch
        if (password.value !== confirmPassword.value) {
            passwordMismatch.textContent = "Passwords do not match";
            passwordMismatch.style.display = 'block';
            password.style.border = '1px solid red';
            confirmPassword.style.border = '1px solid red';
            isInvalid = true;
        }
        // Check for existing accounts in local storage
        const existingAccounts = JSON.parse(localStorage.getItem('account')) || [];
        const userExists = 
        existingAccounts.some(user => user.username.toLowerCase() === username.value.trim().toLowerCase() || user.email.toLowerCase() === email.value.trim().toLowerCase());


        if (userExists) {
            if (existingAccounts.some(user => user.username.toLowerCase() === username.value.trim().toLowerCase())) {
                usernameInvalid.textContent = "Username is already registered";
                usernameInvalid.style.display = 'block';
                username.style.border = '1px solid red';
            }
            if (existingAccounts.some(user => user.email.toLowerCase() === email.value.trim().toLowerCase())) {
                emailInvalid.textContent = "Email is already registered";
                emailInvalid.style.display = 'block';
                email.style.border = '1px solid red';
            }
            isInvalid = true;
        }

        // Stop registration process if any input is invalid
        if (isInvalid) {
            return;
        }

        // Register new user
        const newUser = { username: username.value, email: email.value, password: password.value };
        existingAccounts.push(newUser);
        localStorage.setItem('account', JSON.stringify(existingAccounts));

        showAlert("success", "User registered successfully")
        // Clear input fields
        username.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';

        switchToLoginForm();
    } else {
        showAlert("failed", "Please fill all fields")

        
        if (!username.value) {
        username.style.border = '1px solid red';
        isInvalid = true;
    }
    if (!email.value) {
        email.style.border = '1px solid red';
        isInvalid = true;
    }
    if (!password.value) {
        password.style.border = '1px solid red';
        isInvalid = true;
    }
    if (!confirmPassword.value) {
        confirmPassword.style.border = '1px solid red';
        isInvalid = true;
    }
    }
}


// Function to take the data from local storage and check if it exists and logged in
function validateLogin() {
    const loginUsernameInput = document.getElementById('loginUsername');
    const loginPasswordInput = document.getElementById('loginPassword');
    const invalidUsernameText = document.getElementById('InvalidLoginUsername');
    const invalidPasswordText = document.getElementById('InvalidLoginPassword');

    const username = loginUsernameInput.value.trim().toLowerCase();
    const password = loginPasswordInput.value.trim();

    console.log('Attempting login with:', username, password);

    // Retrieve the array of user accounts from local storage
    const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
    console.log('Stored accounts:', storedAccounts);

    // Find the user with the matching username
    const user = storedAccounts.find(user => user.username.toLowerCase() === username);

    // Clear previous error messages
    invalidUsernameText.style.display = 'none';
    invalidPasswordText.style.display = 'none';
    loginUsernameInput.style.border = '';
    loginPasswordInput.style.border = '';

    if (username === "" && password === "") {
        showAlert("failed", "Please fill all fields")
        loginUsernameInput.style.border = '1px red solid';
        loginPasswordInput.style.border = '1px red solid';
    } else if (!user) {  // If the user is not found, the username is incorrect
        invalidUsernameText.style.display = 'block';
        loginUsernameInput.style.border = '1px red solid';
    } else if (user && user.password !== password) { // Username correct, but password is incorrect
        invalidPasswordText.style.display = 'block';
        loginPasswordInput.style.border = '1px red solid';
    } else if (user && user.password === password) {
        console.log('User authenticated successfully:', user);

        // Save the logged-in user to local storage
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store with key 'loggedInUser'

        // Remove the login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.remove();
        }

        // Rebuild and show the account UI
        rebuildAccountInterface();

        // Update the text of the account button to "Welcome, [username]"
        const accountBtn = document.querySelector(".account-btn");
        if (accountBtn) {
            accountBtn.textContent = `Welcome, ${user.username}`;
        location.reload(); // Reload the page to reset the state
        }
    }

    loginUsernameInput.addEventListener('input', () => {
        loginUsernameInput.style.border = ''; // Remove border
        invalidUsernameText.style.display = 'none'; // Hide invalid text
    });

    loginPasswordInput.addEventListener('input', () => {
        loginPasswordInput.style.border = ''; // Remove border
        invalidPasswordText.style.display = 'none'; // Hide invalid text
    });
}


//--------------------------------------- Forgot password functions ----------------------------------------------------

function switchToForgotPasswordForm() {
    let accountFormContainer = document.getElementById("accountForm");
    if (!accountFormContainer) {
        accountFormContainer = document.createElement("div");
        accountFormContainer.id = "accountForm";
        document.body.appendChild(accountFormContainer);
    }

    accountFormContainer.innerHTML = '';

    const forgotPasswordFormContent = `
            <div class="deleteContainer">
                <span class="delete" id="deleteAccountForm"><i class="fa-light fa-x"></i></span>
            </div>
        <div id="forgotPasswordForm">
            <div class="form-group">
                <label for="forgotPasswordEmail">Email</label>
                <input type="email" id="forgotPasswordEmail">
                <span class="invalid" id="emailNotFound">Email not found</span>
            </div>
            <div class="form-group">
                <button id="sendResetCodeBtn">Send Reset Code</button>
            </div>
            <div id="backToLoginFromForgot" class="link">Back to Log In</div>
        </div>
    `;

    accountFormContainer.innerHTML = forgotPasswordFormContent;

    const sendResetCodeButton = document.getElementById("sendResetCodeBtn");
    const backToLoginLink = document.getElementById("backToLoginFromForgot");
    const emailInput = document.getElementById("forgotPasswordEmail");
    const emailNotFound = document.getElementById("emailNotFound");

    sendResetCodeButton.addEventListener("click", handleSendResetCode);
    backToLoginLink.addEventListener("click", rebuildLoginForm);

    // Hide the "invalid" message when typing in the email input
    emailInput.addEventListener("input", () => {
        emailNotFound.style.display = 'none';
        emailInput.style.border = ""
    });
    addEnterKeyListenerForForms()
    addCloseIconToForm()
}

// Function to handle sending the reset code after email verification
function handleSendResetCode() {
    const emailInput = document.getElementById("forgotPasswordEmail");
    const emailNotFound = document.getElementById("emailNotFound");
    const existingAccounts = JSON.parse(localStorage.getItem('account')) || [];

    const email = emailInput ? emailInput.value.trim().toLowerCase() : ''; 

    const user = existingAccounts.find(user => user.email.trim().toLowerCase() === email);
    if (!user) {
        emailNotFound.style.display = 'block';
        emailInput.style.border = "1px solid red"
        return;
    }

    emailNotFound.style.display = 'none';
    localStorage.setItem('resetEmail', email); 

    generateAndSendResetCode();
    rebuildResetCodeForm();
    addEnterKeyListenerForForms()
}

// Function to generate and send a reset code
function generateAndSendResetCode() {
    const email = localStorage.getItem('resetEmail'); 
    if (!email) return; 

    const resetCode = Math.floor(10000 + Math.random() * 90000).toString();
    localStorage.setItem('resetCode', JSON.stringify({ code: resetCode, email: email }));

    showAlert("", `Your reset code is: <strong>${resetCode}</strong>` , 3000);
}

// Function to handle resending the reset code
function handleResendCode() {
    generateAndSendResetCode();
}

// Function to rebuild the Reset Code Form
function rebuildResetCodeForm() {
    const accountFormContainer = document.getElementById("accountForm");
    accountFormContainer.innerHTML = '';

    const resetCodeFormContent = `
        <div class="deleteContainer">
            <span class="delete" id="deleteAccountForm"><i class="fa-light fa-x"></i></span>
        </div>
        <div id="resetCodeForm">
            <div class="form-group">
                <label for="resetCode">Reset Code</label>
                <input type="text" id="resetCode" maxlength="5">
                <span class="invalid" id="codeInvalid">Invalid code</span>
            </div>
            <div class="form-group">
                <button id="verifyResetCodeBtn">Verify Code</button>
            </div>
            <div id="resendVerifyCode" class="link">Resend the code</div>
            <div class="form-group">
                <div id="backToLoginFromReset" class="link">Back to Log In</div>
            </div>
        </div>
    `;

    accountFormContainer.innerHTML = resetCodeFormContent;

    const verifyResetCodeBtn = document.getElementById("verifyResetCodeBtn");
    const backToLoginFromReset = document.getElementById("backToLoginFromReset");
    const resendVerifyCode = document.getElementById("resendVerifyCode");
    const resetCodeInput = document.getElementById("resetCode");
    const codeInvalid = document.getElementById("codeInvalid");

    verifyResetCodeBtn.addEventListener("click", verifyResetCode);
    backToLoginFromReset.addEventListener("click", () => {
        clearResetData();
        rebuildLoginForm();
    });
    resendVerifyCode.addEventListener("click", handleResendCode);
    addCloseIconToForm();
    
    document.getElementById("deleteAccountForm").addEventListener("click", () => {
        clearResetData();
        accountFormContainer.innerHTML = '';
    });
    
    resetCodeInput.addEventListener("input", () => {
        codeInvalid.style.display = 'none';
        resetCodeInput.style.border = "";
    });

    BgCover.addEventListener("click", () => {
        removeElements();
        clearResetData();
    });
}

// Function to verify the reset code
function verifyResetCode() {
    const resetCodeInput = document.getElementById("resetCode");
    const inputCode = document.getElementById("resetCode").value;
    const codeInvalid = document.getElementById("codeInvalid");
    const storedResetCodeData = JSON.parse(localStorage.getItem('resetCode'));

    if (storedResetCodeData && inputCode === storedResetCodeData.code) {
        codeInvalid.style.display = 'none';
        rebuildNewPasswordForm();
    } else {
        codeInvalid.style.display = 'block';
        resetCodeInput.style.border = "1px solid red"
    }
}

// Function to rebuild the New Password Form
function rebuildNewPasswordForm() {
    const accountFormContainer = document.getElementById("accountForm");
    accountFormContainer.innerHTML = '';

    const newPasswordFormContent = `
        <div class="deleteContainer">
            <span class="delete" id="deleteAccountForm"><i class="fa-light fa-x"></i></span>
        </div>
        <div id="newPasswordForm">
            <div class="form-group">
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" minlength="4" maxlength="15">
                <span class="invalid" id="passwordSame">Can't be the same as the old password</span>
            </div>
            <div class="form-group">
                <label for="newConfirmPassword">Confirm Password</label>
                <input type="password" id="newConfirmPassword" minlength="4" maxlength="15">
                <span class="invalid" id="passwordMismatch">Passwords do not match</span>
            </div>
            <div class="form-group">
                <button id="resetPasswordBtn">Reset Password</button>
            </div>
            <div id="backToLoginFromNewPassword" class="link">Back to Log In</div>
        </div>
    `;

    accountFormContainer.innerHTML = newPasswordFormContent;

    const resetPasswordBtn = document.getElementById("resetPasswordBtn");
    const backToLoginFromNewPassword = document.getElementById("backToLoginFromNewPassword");
    const newPasswordInput = document.getElementById("newPassword");
    const newConfirmPasswordInput = document.getElementById("newConfirmPassword");
    const passwordMismatch = document.getElementById("passwordMismatch");
    const passwordSame = document.getElementById("passwordSame");

    resetPasswordBtn.addEventListener("click", handleResetPassword);
    backToLoginFromNewPassword.addEventListener("click", () => {
        clearResetData();
        rebuildLoginForm();
    });

    document.getElementById("deleteAccountForm").addEventListener("click", () => {
        clearResetData();
        accountFormContainer.innerHTML = '';
    });

    newPasswordInput.addEventListener("input", () => {
        passwordMismatch.style.display = 'none';
        passwordSame.style.display = 'none';
        newPasswordInput.style.border = "";
    });
    newConfirmPasswordInput.addEventListener("input", () => {
        passwordMismatch.style.display = 'none';
        newConfirmPasswordInput.style.border = "";
    });
    addEnterKeyListenerForForms();
    addCloseIconToForm();
}

// Function to handle resetting the password
function handleResetPassword() {
    const newPassword = document.getElementById("newPassword");
    const newConfirmPassword = document.getElementById("newConfirmPassword");
    const newPasswordValue = newPassword.value;
    const newConfirmPasswordValue = newConfirmPassword.value;
    const passwordMismatch = document.getElementById("passwordMismatch");
    const passwordSame = document.getElementById("passwordSame");

    const storedResetCodeData = JSON.parse(localStorage.getItem('resetCode'));
    const email = storedResetCodeData.email;
    const existingAccounts = JSON.parse(localStorage.getItem('account')) || [];

    const userIndex = existingAccounts.findIndex(user => user.email === email);

    if (userIndex !== -1) {
        const oldPassword = existingAccounts[userIndex].password;

        if (newPasswordValue.length < 4) {
            passwordSame.textContent = "It must have at least 4 characters";
            passwordSame.style.display = 'block';
            newPassword.style.border = '1px solid red';
            return;
        }

        if (newPasswordValue === oldPassword) {
            passwordSame.textContent = "Can't be the same as the old password";
            passwordSame.style.display = 'block';
            newPassword.style.border = "solid 1px red";
            return;
        } else {
            passwordSame.style.display = 'none';
            newPassword.style.border = "";
        }
    }

    if (newPasswordValue !== newConfirmPasswordValue) {
        passwordMismatch.textContent = 'Passwords do not match';
        passwordMismatch.style.display = 'block';
        newConfirmPassword.style.border = "solid 1px red";
        return;
    } else {
        passwordMismatch.style.display = 'none';
        newConfirmPassword.style.border = "";
    }

    if (userIndex !== -1) {
        existingAccounts[userIndex].password = newPasswordValue;
        localStorage.setItem('account', JSON.stringify(existingAccounts));
        showAlert("success", "Password reset successfully.");
        clearResetData();
        rebuildLoginForm();
    } else {
        showAlert("failed", "An error occurred. Please try again.");
    }
}

// clear local storage data after changing password or back to login form
function clearResetData() {
    localStorage.removeItem('resetCode');
    localStorage.removeItem('resetEmail');
}

//------------------------------------- User interface functions ---------------------------------------------------------

function rebuildAccountInterface() {
    const accountFormContainer = document.getElementById("accountForm");

    if (!accountFormContainer) {
        console.error('Account form container not found');
        return;
    }

    accountFormContainer.innerHTML = '';
    accountFormContainer.style.padding = 0;
    accountFormContainer.className = "present";


    const accountUIContent = `
        <div id="accountUI">
            <div class="deleteContainer">
                <span class="delete" id="deleteAccountForm"><i class="fa-light fa-x"></i></span>
            </div>
            <div class="iconsContainer">
                <ul class="switch">
                    <li id="userUIicon" class="this"><i class="fa-solid fa-user"></i></li>
                    <li id="userSettingsIcon"><i class="fa-solid fa-gear"></i></li>
                    <li id="userLogoutIcon"><i class="fa-solid fa-right-from-bracket"></i></li>
                </ul>
            </div>
            <div class="userForms">
                <!-- User UI content will be injected here -->
            </div>
        </div>
    `;

    accountFormContainer.innerHTML = accountUIContent;

    const deleteContainer = document.getElementsByClassName("deleteContainer")[0];
    deleteContainer.style.position = "absolute";
    deleteContainer.classList.add("on");
    
    
    const switcher = document.querySelectorAll('.switch li');
    switcher.forEach((list) => {
        list.addEventListener("click", removeActive);
    });
    
    function removeActive() {
        switcher.forEach((list) => {
            list.classList.remove('this');
        });
        this.classList.add('this');
    }
    
    // Rebuild User UI after account UI is set
    rebuildUserInterface();
}


function rebuildUserInterface() {
    const userForms = document.querySelector(".userForms");

    if (!userForms) {
        console.error('User Forms container not found');
        return;
    }

    const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    let username = 'User'; // Default value

    if (loggedInUserData.username) {
        username = loggedInUserData.username;
    } else {
        console.warn('No valid logged-in user data found.');
    }

    userForms.innerHTML = `
        <div class="userHead">
            <h1>Welcome, ${username}</h1>
        </div>
        <div class="userBody">
            <h3>Payment History</h3>
            <div class="paymentHistory">
                <div class="historyHeaders">
                    <ul>
                        <li>Date</li>
                        <li>Type</li>
                        <li>Image</li>
                        <li>Quantity</li>
                        <li>Price</li>
                    </ul>
                </div>
                <div class="historyBody" id="history-products">
                    <!-- History items will be injected here -->
                </div>
            </div>
        </div>
    `;

    // Load and display the payment history
    const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
    
    const user = storedAccounts.find(user => user.username === loggedInUserData.username);
    if (user && user.history) {
        const historyContainer = document.getElementById("history-products");
        if (historyContainer) {
            user.history.forEach(item => {
                const historyItem = document.createElement("div");
                historyItem.classList.add("history-item");
                historyItem.innerHTML = `
                    <div class="paymentDate">${item.date} <br> ${item.time}</div>
                    <div class="history-card-name"><h4>${item.name}</h4></div>
                    <div class="history-card-img"><img src="${item.img}" alt="" style="width: 50px; height: 50px;"></div>
                    <div class="history-card-Quantity"><h4>${item.quantity}</h4></div>
                    <div class="history-card-price"><span>${item.price}</span></div>
                `;
                historyContainer.appendChild(historyItem);
            });
        }
    }

    // Add event listeners for icons
    const userUIIcon = document.getElementById("userUIicon");
    const settingsIcon = document.getElementById("userSettingsIcon");
    const logOutIcon = document.getElementById("userLogoutIcon");

    if (userUIIcon) {
        userUIIcon.addEventListener("click", rebuildAccountInterface);
    } else {
        console.error('User UI Icon not found');
    }

    if (settingsIcon) {
        settingsIcon.addEventListener("click", rebuildSettingsForm);
    } else {
        console.error('Settings Icon not found');
    }

    if (logOutIcon) {
        logOutIcon.addEventListener("click", handleLogoutView);
    } else {
        console.error('Logout Icon not found');
    }

    addCloseIconToForm();
}

//----------- handle buy button inside the cart ----------------
function moveToHistory() {
    // Retrieve logged-in user data from local storage
    const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];

    // Check if logged-in user data is available
    if (!loggedInUserData.username) {
        showAlert("failed", 'Create an account to complete the payment.');
        return; // Stop the function if no user is logged in
    }

    // Retrieve the cart container
    const cartContainer = document.querySelector('.cart-body'); // Adjust the selector if needed

    // Check if cart container exists
    if (!cartContainer) {
        console.error('Cart container not found');
        return;
    }

    // Extract all product cards from the cart container
    const productCards = cartContainer.querySelectorAll('.product-card'); // Adjust the selector if needed

    if (productCards.length === 0) {
        console.error('No product cards found in the cart container');
        return;
    }

    // Process each product card
    productCards.forEach(productCard => {
        const productId = productCard.dataset.id;
        const productName = productCard.querySelector('.card-name').textContent;
        const productImg = productCard.querySelector('.card-img img').src;
        const productQuantity = productCard.querySelector('.quantity-input').value;
        const productPrice = productCard.querySelector('.card-price').textContent;

        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);  // Date part
        const formattedTime = currentDate.toLocaleTimeString('en-US', timeOptions);  // Time part

        // Create history item
        const historyItem = {
            id: productId,
            name: productName,
            img: productImg,
            quantity: productQuantity,
            price: productPrice,
            date: formattedDate,
            time: formattedTime
        };

        // Update local storage with history
        const userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);
        if (userIndex !== -1) {
            const user = storedAccounts[userIndex];
            user.history = user.history || [];
            user.history.push(historyItem);
            storedAccounts[userIndex] = user;
        }
    });

    // Save the updated accounts data to local storage
    localStorage.setItem('account', JSON.stringify(storedAccounts));

    // Clear the cart after processing
    showAlert("success", 'Payment successful.');
    clearCart();
    BgCover.classList.remove("active");
    cart.classList.remove("animation");
}
//--------------------------------------------------------------

// Function to clear the cart
function clearCart() {
    const cartContainer = document.querySelector('.cart-body'); // Adjust the selector if needed

    if (cartContainer) {
        cartContainer.innerHTML = ''; // Clear the cart contents

        // Clear cart from local storage for the logged-in user
        const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUser')) || {};
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
        
        if (loggedInUserData.username) {
            const userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);
            if (userIndex !== -1) {
                storedAccounts[userIndex].cart = []; // Clear the user's cart in local storage
                localStorage.setItem('account', JSON.stringify(storedAccounts)); // Save updated account data
            }
        }

        // Also clear general cartProducts if you are using a global cart storage
        localStorage.removeItem('cartProducts'); // Clear global cartProducts

        // Update UI and any calculations
        cartChecker(); 
        updateCartCalc(); 
    } else {
        console.error('Cart container not found');
    }
}


// Ensure this is the correct button for the payment process
document.querySelector('.pay-btn').addEventListener('click', function() {
    moveToHistory(); // Remove productCard parameter if moving all cards
});



//------------------------------------- User settings` "Forms" functions --------------------------------------------------

function rebuildSettingsForm() {
    const userBody = document.querySelector(".userBody");
    const userSettingsHeader = document.querySelector(".userHead h1");

    if (!userBody) {
        console.error('User Body not found');
        return;
    }

    if (!userSettingsHeader) {
        console.error('User Settings Header not found');
        return;
    }

    clearAndBuildSettingsForm(userBody, userSettingsHeader);
}


function clearAndBuildSettingsForm(userBody, userSettingsHeader) {
    // Clear the content of userBody and update the header text
    userBody.innerHTML = "";
    userSettingsHeader.textContent = "Settings";

    // Create settings form holder
    const SettingsForm = document.createElement("div");
    SettingsForm.className = "userSettings";

    // Create the "Change Email" link
    const changeEmailLink = document.createElement("div");
    changeEmailLink.id = "changeEmail";
    changeEmailLink.className = "link";
    changeEmailLink.textContent = "Change Email";

    // Create the "Change Password" link
    const changePasswordLink = document.createElement("div");
    changePasswordLink.id = "changeUserPassword";
    changePasswordLink.className = "link";
    changePasswordLink.textContent = "Change Password";

    // Create the "Delete Account" link
    const deleteAccountLink = document.createElement("div");
    deleteAccountLink.id = "deleteAccountLink";
    deleteAccountLink.className = "link";
    deleteAccountLink.textContent = "Delete Account";

    // Append links to the settings form
    SettingsForm.appendChild(changeEmailLink);
    SettingsForm.appendChild(changePasswordLink);
    SettingsForm.appendChild(deleteAccountLink);
    userBody.appendChild(SettingsForm);

    // Add event listeners for links to trigger corresponding functions
    changeEmailLink.addEventListener("click", handleEmailChangeClick);
    changePasswordLink.addEventListener("click", handlePasswordChangeClick);
    handleAccountDeletion()
}

// Function to handle "Change Email" click
function handleEmailChangeClick() {
    const userSettingsContainer = document.querySelector(".userBody");
    const userSettingsHeader = document.querySelector(".userHead h1");

    // Clear the existing content
    userSettingsContainer.innerHTML = "";

    // Update the header text
    userSettingsHeader.textContent = "Change Email";

    // Create the form container
    const userSettingsForm = document.createElement("div");
    userSettingsForm.className = "userSettings";

    // Build the Change Email Form using template literals
    userSettingsForm.innerHTML = `
        <div id="changeEmailForm">
            <div class="form-group">
                <label for="oldEmail">Old Email</label>
                <input type="email" id="oldEmail" minlength= "6" maxlength= "18">
                <span class="invalid" id="emailInvalidOld">Email is not correct</span>
            </div>
            <div class="form-group">
                <label for="newEmail">New Email</label>
                <input type="email" id="newEmail" minlength= "6" maxlength= "18">
                <span class="invalid" id="emailInvalidNew">Email is already registered</span>
            </div>
            <div class="form-group">
                <button id="Confirm">Confirm</button>
            </div>
            <div id="backToSettingsForm" class="link">Back to Settings</div>
        </div>`;

    // Append the new form to the container
    userSettingsContainer.appendChild(userSettingsForm);

    // Add event listener for the "Back to Settings" button
    const backToSettings = document.getElementById("backToSettingsForm");
    backToSettings.addEventListener("click", () => {
        clearAndBuildSettingsForm(userSettingsContainer, userSettingsHeader); // Rebuild the settings form
    });

    // Add event listeners for the form inputs and button to handle Enter key press
    const oldEmailInput = document.getElementById("oldEmail");
    const newEmailInput = document.getElementById("newEmail");
    const confirmButton = document.getElementById("Confirm");

    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            handleEmailChange(); // Call the function to handle email change
        }
    }

    oldEmailInput.addEventListener("keydown", handleEnterKey);
    newEmailInput.addEventListener("keydown", handleEnterKey);
    confirmButton.addEventListener("click", handleEmailChange);

    // Hide invalid messages when typing in the inputs
    oldEmailInput.addEventListener("input", () => {
        document.getElementById("emailInvalidOld").style.display = 'none';
        document.getElementById("oldEmail").style.border = ''; // Reset border
    });

    newEmailInput.addEventListener("input", () => {
        document.getElementById("emailInvalidNew").style.display = 'none';
        document.getElementById("newEmail").style.border = ''; // Reset border
    });
}

// Function to handle "Change Password" click

function handlePasswordChangeClick() {
    const userSettingsContainer = document.querySelector(".userBody");
    const userSettingsHeader = document.querySelector(".userHead h1");

    // Clear the existing content
    userSettingsContainer.innerHTML = "";

    // Update the header text
    userSettingsHeader.textContent = "Change Password";

    // Create the form container
    const userSettingsForm = document.createElement("div");
    userSettingsForm.className = "userSettings";

    // Build the Change Password Form using template literals
    userSettingsForm.innerHTML = `
        <div id="changeUserPasswordForm">
            <div class="form-group">
                <label for="ChangePassword">Password</label>
                <input type="password" id="ChangePassword" minlength= "4" maxlength= "15">
                <span class="invalid" id="passwordInvalidOld">Cannot use the old password</span>
            </div>
            <div class="form-group">
                <label for="confirmChangePassword">Confirm Password</label>
                <input type="password" id="confirmChangePassword" minlength= "4" maxlength= "15">
                <span class="invalid" id="passwordMismatch">Passwords do not match</span>
            </div>
            <div class="form-group">
                <button id="Confirm">Confirm</button>
            </div>
            <div id="backToSettingsForm" class="link">Back to Settings</div>
        </div>`;

    // Append the new form to the container
    userSettingsContainer.appendChild(userSettingsForm);

    // Add event listener for the "Back to Settings" button
    const backToSettings = document.getElementById("backToSettingsForm");
    backToSettings.addEventListener("click", () => {
        clearAndBuildSettingsForm(userSettingsContainer, userSettingsHeader); // Rebuild the settings form
    });

    // Add event listeners for the form inputs and button to handle Enter key press
    const changePasswordInput = document.getElementById("ChangePassword");
    const confirmChangePasswordInput = document.getElementById("confirmChangePassword");
    const confirmButton = document.getElementById("Confirm");

    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            handlePasswordChange(); // Call the function to handle password change
        }
    }

    changePasswordInput.addEventListener("keydown", handleEnterKey);
    confirmChangePasswordInput.addEventListener("keydown", handleEnterKey);
    confirmButton.addEventListener("click", handlePasswordChange);

    // Hide invalid messages when typing in the inputs
    changePasswordInput.addEventListener("input", () => {
        document.getElementById("passwordInvalidOld").style.display = 'none';
        document.getElementById("passwordMismatch").style.display = 'none';
        changePasswordInput.style.border = "";
        confirmChangePasswordInput.style.border = "";
        
    });
    confirmChangePasswordInput.addEventListener("input", () => {
        confirmChangePasswordInput.style.border = "";
        document.getElementById("passwordMismatch").style.display = 'none';
    });
}

// Attach the click event to the "Change Password" element
document.getElementById("changeUserPassword").addEventListener("click", handlePasswordChangeClick);

// Attach the click event to the "Change Email" element
document.getElementById("changeUserEmail").addEventListener("click", handleEmailChangeClick);


//------------------------------------ User settings "Mechanics" functions ---------------------------------------------------

// Function to handle the password change logic
function handlePasswordChange() {
    const newPassword = document.getElementById("ChangePassword");
    const confirmPassword = document.getElementById("confirmChangePassword");
    const newPasswordValue = newPassword.value;
    const confirmPasswordValue = confirmPassword.value;
    const passwordInvalidOld = document.getElementById("passwordInvalidOld");
    const passwordMismatch = document.getElementById("passwordMismatch");

    // Clear previous error messages
    passwordInvalidOld.style.display = 'none';
    passwordMismatch.style.display = 'none';

    newPassword.style.border = '';
    confirmPassword.style.border = '';

    // Validate the new password length
    if (newPasswordValue.length < 4 || newPasswordValue.length > 15) {
        passwordInvalidOld.textContent = "Password must have at least 4 characters";
        passwordInvalidOld.style.display = 'block';
        newPassword.style.border = "1px solid red";
        return;
    }

    // Check if the new password and confirm password match
    if (newPasswordValue !== confirmPasswordValue) {
        confirmPassword.style.border = "1px solid red";
        passwordMismatch.style.display = 'block';
        return;
    }

    // Retrieve the currently logged-in user's data
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    const username = loggedInUser.username;

    if (!username) {
        showAlert("failed", "No user is currently logged in.");
        return;
    }

    // Retrieve the array of user accounts from local storage
    const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];

    // Find the user by username
    const user = storedAccounts.find(user => user.username === username);

    if (!user) {
        showAlert("failed", "No user is currently logged in.");
        return;
    }

    // Check if the new password is the same as the old one
    if (user.password === newPasswordValue) {
        passwordInvalidOld.textContent = "Can't use the same password";
        passwordInvalidOld.style.display = 'block';
        newPassword.style.border = "1px solid red";
        return;
    }

    // Update the user's password
    user.password = newPasswordValue;
    localStorage.setItem('account', JSON.stringify(storedAccounts));

    // Update the logged-in user's data in local storage
    loggedInUser.password = newPasswordValue;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

    showAlert("success", "Password updated successfully.");

    clearAndBuildSettingsForm(document.querySelector(".userBody"), document.querySelector(".userHead h1"));
}


// Function to handle the email change logic
function handleEmailChange() {
    const oldEmail = document.getElementById("oldEmail");
    const newEmail = document.getElementById("newEmail");
    const oldEmailValue = oldEmail.value;
    const newEmailValue = newEmail.value;
    const emailInvalidOld = document.getElementById("emailInvalidOld");
    const emailInvalidNew = document.getElementById("emailInvalidNew");

    // Clear previous error messages
    emailInvalidOld.style.display = 'none';
    emailInvalidNew.style.display = 'none';
    oldEmail.style.border = '';
    newEmail.style.border = '';

    // Validate the old and new email lengths
    if (oldEmailValue.length < 6 || oldEmailValue.length > 18) {
        emailInvalidOld.textContent = "It must have at least 6 characters";
        emailInvalidOld.style.display = 'block';
        oldEmail.style.border = '1px solid red';
        return;
    }

    if (newEmailValue.length < 6 || newEmailValue.length > 18) {
        emailInvalidNew.textContent = "It must have at least 6 characters";
        emailInvalidNew.style.display = 'block';
        newEmail.style.border = '1px solid red';
        return;
    }

    // Check if the new email is the same as the old email
    if (oldEmailValue === newEmailValue) {
        emailInvalidNew.textContent = 'The new email must be different from the old email.';
        emailInvalidNew.style.display = 'block';
        newEmail.style.border = '1px solid red';
        return;
    }

    // Retrieve the currently logged-in user's data
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    const username = loggedInUser.username;

    if (!username) {
        showAlert("failed", "No user is currently logged in.");

        return;
    }

    // Retrieve the array of user accounts from local storage
    const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];

    // Check if the old email matches the current email
    const user = storedAccounts.find(user => user.username === username);
    if (!user) {
        showAlert("failed", "An error occurred. Please try again.");
        return;
    }

    if (user.email !== oldEmailValue) {
        emailInvalidOld.textContent = 'Email is not correct';
        emailInvalidOld.style.display = 'block';
        oldEmail.style.border = '1px solid red';
        return;
    }

    // Check if the new email is already in use
    const emailExists = storedAccounts.some(user => user.email === newEmailValue && user.username !== username);
    if (emailExists) {
        emailInvalidNew.textContent = 'Email is already in use';
        emailInvalidNew.style.display = 'block';
        newEmail.style.border = '1px solid red';
        return;
    }

    // Update the user's email
    user.email = newEmailValue;
    localStorage.setItem('account', JSON.stringify(storedAccounts));

    // Update the current logged-in user data in local storage
    loggedInUser.email = newEmailValue;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

    showAlert("success", "Email updated successfully.");

    clearAndBuildSettingsForm(document.querySelector(".userBody"), document.querySelector(".userHead h1"));
}

// Function to handle the account deleting logic
function handleAccountDeletion() {
    const deleteLink = document.getElementById("deleteAccountLink");

    if (!deleteLink) {
        console.error('Delete Account link not found');
        return;
    }

    deleteLink.addEventListener("click", function() {
        // Confirm deletion
        const confirmation = confirm("Are you sure you want to remove the account?");
        
        if (confirmation) {
            // Retrieve the currently logged-in user's data
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

            if (!loggedInUser) {
                showAlert("failed", "No user is currently logged in.");
                return;
            }

            // Retrieve the array of user accounts from local storage
            let storedAccounts = JSON.parse(localStorage.getItem('account')) || [];

            // Remove the logged-in user's account from the array
            storedAccounts = storedAccounts.filter(user => user.username !== loggedInUser.username);

            // Update local storage with the new array of accounts
            localStorage.setItem('account', JSON.stringify(storedAccounts));

            // Remove logged-in user from local storage
            localStorage.removeItem('loggedInUser');
            localStorage.removeItem('currentUser');

            // Log out the user and refresh the page
            showAlert("success", "Account removed successfully.");

            window.location.reload(); // Refresh the page to reflect the changes
        }
    });
}

//------------------------------------- User logout functions -----------------------------------------------------------------

function handleLogoutView() {
    const userHead = document.querySelector(".userHead h1");
    const userBody = document.querySelector(".userBody");

    // Update the header text to "Log Out"
    userHead.textContent = "Log Out";

    // Clear existing content in userBody
    userBody.innerHTML = "";
    userBody.style.height = "auto";

    // Create the logout button
    const logoutButton = document.createElement("div");
    logoutButton.textContent = "Log Out";
    logoutButton.id = "confirmLogout";
    logoutButton.className = "link";
    logoutButton.style.marginBottom = "10px"; // Add some margin for spacing
    logoutButton.style.width = "50%"; // Add some margin for spacing

    // Create the text under the button
    const infoText = document.createElement("p");
    infoText.textContent = "Any edits or changes will be saved in the account.";

    // Append the button and text to userBody
    userBody.appendChild(logoutButton);
    userBody.appendChild(infoText);

    // Add event listener to the logout button
    logoutButton.addEventListener("click", function() {
        performLogout(); // Call the logout function
    });
}

function performLogout() {
    // Clear the current user from local storage
    localStorage.removeItem('loggedInUser');

    // Redirect the user to the login page or reload the page
    
    location.reload(); // Reload the page to reset the state
}

//---------------------------------------------------------------------

// Remove account related elements and then set up the button click listener

document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    let accountFormContainer = document.getElementById("accountForm");
    const accountBtn = document.querySelector(".account-btn");

    // Create accountFormContainer if it doesn't exist
    if (!accountFormContainer) {
        accountFormContainer = document.createElement("div");
        accountFormContainer.id = "accountForm";
        document.body.appendChild(accountFormContainer);
    }

    // Check if the user is already logged in
    if (loggedInUser) {
        console.log('User is logged in:', loggedInUser);

        // Display the user UI
        rebuildAccountInterface();

        // Change the text of the account button to "Welcome, [username]"
        if (accountBtn) {
            accountBtn.textContent = `Welcome, ${loggedInUser.username}`;
        }
    } else {
        console.log('No user logged in.');

        // Hide the login form by default
        accountFormContainer.style.display = "none";

        // Keep the "Register / Log in" text
        if (accountBtn) {
            accountBtn.textContent = "Register / Log in";
        }
    }

    // Remove unnecessary elements only after determining which ones to keep
    removeElements();
});

// Event listener for the user info button click
document.querySelector(".user-info").addEventListener("click", function () {
    BgCover.style.display = "block";
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    let accountFormContainer = document.getElementById("accountForm");
    
    // Create accountFormContainer if it doesn't exist
    if (!accountFormContainer) {
        accountFormContainer = document.createElement("div");
        accountFormContainer.id = "accountForm";
        document.body.appendChild(accountFormContainer);
    }
    
    if (loggedInUser) {
        // If a user is logged in, rebuild the user UI
        rebuildAccountInterface();
    } else {
        // If no user is logged in, show the login form
        accountFormContainer.style.display = "block";
        rebuildLoginForm();
    }
});





////------------------------------------- End account functions --------------------------------------------------------------



//-----------------------------------------------------------------
// time
setInterval(() => {
    let time = new Date();
    let timer = document.querySelector(`.timer`);
    // can't use padStart without toString because padStart only works with strings and 2 means if the text is less than 2 characters add 0 before
    let hours = time.getHours().toString().padStart(2, '0'); 
    let minutes = time.getMinutes().toString().padStart(2, '0');;
    let seconds = time.getSeconds().toString().padStart(2, '0');;

    const amPm = hours >= 12 ? 'PM' : 'AM';

    // to make hours in 12 format
    hours = hours % 12;
    hours = hours ? hours : 12;


    timer.innerHTML = `${hours}:${minutes}:${seconds} ${amPm}`;
})
//-----------------------------------------------------------------



// -----------------------------------------------------------------------------------------------------------------------------------------------------
// add/remove products, filtering products, pagination, and adding/removing products to/from the cart section

// this whole section was made with the help of AI and with a LOT of adjustments

let products = [];
let currentPage = 1;
let filteredProducts = [];



document.addEventListener('DOMContentLoaded', () => {
    loadDefaultProducts()
    processProducts();
    currency();
    renderProducts();
    renderFilterOptions();
    renderPagination();
    updateFilteredProducts();
    updatePriceRange();
    initializeCartFunctions();
});

// ------------------------------------- Start Cart Section --------------------------------------

    const cart = document.querySelector('.cart');
    const cartHead = document.querySelector('.cart-head');
    const cartBody = document.querySelector('.cart-body');
    const cartFooter = document.querySelector('.cart-footer');
    const emptyCart = document.querySelector('.empty');
    const cartIcon = document.querySelector('.cart-icon');
    const cartDelete = document.querySelector('.cart .delete');
    const payment = document.querySelector('.pay-btn');

    // open/close the cart
    document.addEventListener("click", e => {
        if (e.target === BgCover || cartDelete.contains(e.target)) {
            BgCover.classList.remove("active");
            cart.classList.remove("animation");
        } else if (cartIcon.contains(e.target)) {
            BgCover.classList.add("active");
            cart.classList.add("animation");
        }
    });
    
    document.addEventListener('click', (event) => {
        const removeBtn = event.target.closest('.remove');
        if (removeBtn) {
            handleRemoveButtonClick(removeBtn);
        }

        const addToCartBtn = event.target.closest('.addToCartBtn');
        if (addToCartBtn) {
            handleAddToCartClick(addToCartBtn);
        }
    });

    function updateCartCalc() {
        const cartBody = document.querySelector('.cart-body'); // Assuming the cart items are inside .cart-body
        const cartCalc = document.getElementsByClassName('cartCalc')[0]; // Get the cartCalc element
        const cartItems = cartBody ? cartBody.children : []; // Get the cart items
        
        let totalQuantity = 0;
    
        // Count the total quantity of products
        Array.from(cartItems).forEach(item => {
            const quantityInput = item.querySelector('.quantity-input');
            if (quantityInput) {
                totalQuantity += parseInt(quantityInput.value) || 0;
            }
        });
    
        // Update the cartCalc element based on the total quantity
        if (cartCalc) {
            if (totalQuantity > 0) {
                cartCalc.style.display = 'block'; // Show the cartCalc element
                cartCalc.innerText = totalQuantity > 9 ? '9+' : totalQuantity;
            } else {
                cartCalc.style.display = 'none'; // Hide the cartCalc element if no products
            }
        }
    }
    
    function handleAddToCartClick(addToCartBtn) {
        if (cart.contains(emptyCart)) {
            cart.removeChild(emptyCart);
        }
    
        const product = addToCartBtn.closest('.product');
        const productId = product.id;
        const productNumber = product.getAttribute('data-number');
        const productImg = product.querySelector('.product-img img').src;
        const productName = product.querySelector('.product-head').innerText;
        const productDes = product.querySelector('.product-des').innerText;
        
        // Get the displayed price from the product element
        const productPriceElement = product.querySelector('.product-price');
        const productPriceText = productPriceElement.innerText; // e.g., "$4000.00 USD"
        const productPrice = parseFloat(productPriceText.replace(/[^0-9.-]+/g, "")); // Extract numeric value
        const currencyName = productPriceText.replace(/[\d.,$]+/g, "").trim();
        
        let existingProduct = Array.from(cartBody.children).find(item =>
            item.dataset.id === productId && item.dataset.number === productNumber
        );
    
        if (existingProduct) {
            const quantityInput = existingProduct.querySelector('.quantity-input');
            let currentQuantity = parseInt(quantityInput.value);
            let newQuantity = currentQuantity + 1;

            // If the quantity exceeds the max value (10), stop the function and display an alert
            if (currentQuantity >= 10) {
                showAlert("failed", "You have reached the maximum quantity of this product");
                return; // Stop the function
            }

            // Cap the quantity at the maximum value of 10
            if (newQuantity > 10) {
                newQuantity = 10;
            }
            
            quantityInput.value = newQuantity;
    
            // Multiply price by quantity
            const newTotalPrice = parseFloat((productPrice * newQuantity).toFixed(2));
            existingProduct.querySelector('.card-price').innerText = `$${newTotalPrice.toFixed(2)} ${currencyName}`;
            console.log(currencyName)
            
        } else {
            const cartProduct = createCartProduct(productImg, productName, productDes, productPriceText, productId, productNumber);
            cartBody.appendChild(cartProduct);
        }
    
        saveCartToLocalStorage(); // Save cart to local storage
        appendCartContent();
        cart.style.backgroundColor = 'white';
        updateTotalPrice();
        cartChecker();
        updateCartCalc();
        showAlert("success", "Product has been added");
    }
    
    function createCartProduct(imgSrc, name, description, price, id, productNumber) {
    const cartProduct = document.createElement('div');
    cartProduct.classList.add('product-card');
    cartProduct.dataset.id = id;
    cartProduct.dataset.number = productNumber;

    let quantity = 1;

    // Set the base price for future reference (remove any formatting from the price)
    const basePrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    cartProduct.setAttribute('data-base-price', basePrice); // Store base price as a data attribute

    cartProduct.innerHTML = `
        <div class="card-img">
            <img src="${imgSrc}" alt="">
        </div>
        <div class="card-info">
            <h4 class="card-name">${name}</h4>
            <p class="card-des">${description}</p>
            <div class="card-pay">
                <div class="product-quantity">
                    <input type="number" value="${quantity}" min="1" max="10" class="quantity-input">
                </div>
                <span class="card-price">${price}</span> 
                <span class="remove"><i class="fa-solid fa-trash"></i></span>
            </div>
        </div>`;

    const quantityInput = cartProduct.querySelector('.quantity-input');
    const priceElement = cartProduct.querySelector('.card-price');
    
    const  updateQuantity = () => {
        quantity = parseInt(quantityInput.value) || 1;
        
        // Enforce min and max limits (min=1, max=9)
        if (quantity < 1) quantity = 1;
        if (quantity > 10) quantity = 10;
        
        // Update the input field to reflect the corrected quantity
        quantityInput.value = quantity;

        // Retrieve the base price from the data attribute and multiply it by the quantity
        const basePrice = parseFloat(cartProduct.getAttribute('data-base-price'));
        
        // Extract the current currency from the displayed price
        const currencyName = priceElement.innerText.split(' ')[1] || "$";

        // Calculate the new total price based on the quantity
        const totalPrice = basePrice * quantity;

        // Update the price display
        priceElement.innerText = `$${totalPrice.toFixed(2)} ${currencyName}`;

        // Update the total price of the cart
        updateTotalPrice();
        updateCartCalc();
        saveCartToLocalStorage(); // Save updated quantity to local storage
    };

    // Listen for input changes on the quantity field
    quantityInput.addEventListener('change', updateQuantity);
    


    cartProduct.querySelector('.remove').addEventListener('click', () => {
        handleRemoveButtonClick(cartProduct);
    });

    return cartProduct;
}

    
    function rebuildCartFromLocalStorage() {
        console.log('Rebuilding cart from local storage...');
    
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
    
        let cartProducts = [];
    
        // Retrieve cart products based on logged-in status
        if (loggedInUser.username) {
            const userIndex = storedAccounts.findIndex(user => user.username === loggedInUser.username);
            if (userIndex !== -1) {
                const user = storedAccounts[userIndex];
                cartProducts = user.cart || [];
            }
        } else {
            cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        }
    
        // Clear the cart body
        cartBody.innerHTML = '';
    
        // Loop through each product and create the cart product
        cartProducts.forEach(product => {
            const { imgSrc = '', name = '', description = '', price = 0, currency = '', id = '', number = '', quantity = 1 } = product;
    
            // Ensure price is a formatted string
            const priceString = `${parseFloat(price).toFixed(2)} ${currency}`;
    
            // Create cart product using the updated function
            const cartProduct = createCartProduct(imgSrc, name, description, priceString, id, number);
            
            // Set the quantity value in the quantity input
            const quantityInput = cartProduct.querySelector('.quantity-input');
            if (quantityInput) {
                quantityInput.value = quantity;
            }
    
            // Append the cart product to the cart body
            cartBody.appendChild(cartProduct);
        });
    
        // Update calculations and perform any necessary checks
        updateCartCalc();
        cartChecker();
    
        console.log('Cart rebuild complete.');
    }
    
    function removeProductFromLocalStorage(productId, productNumber) {
        let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        cartProducts = cartProducts.filter(product => !(product.id === productId && product.number === productNumber));
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }
    
    function handleRemoveButtonClick(cartProduct) {
        const productId = cartProduct.dataset.id;
        const productNumber = cartProduct.dataset.number;
    
        // Remove from local storage
        removeProductFromLocalStorage(productId, productNumber);
    
        // Remove from cart
        cartProduct.remove();
    
        // Update cart UI and local storage
        updateTotalPrice();
        cartChecker();
        saveCartToLocalStorage(); // Save updated cart to local storage
        updateCartCalc()

    }
    
    // Save cart products to the logged-in user's account in local storage
    function saveCartToLocalStorage() {
        const cartProducts = Array.from(cartBody.children).map(product => ({
            imgSrc: product.querySelector('.card-img img').src,
            name: product.querySelector('.card-name').innerText,
            description: product.querySelector('.card-des').innerText,
            price: parseFloat(product.querySelector('.card-price').innerText.split(' ')[0].replace('$', '')),
            currency: product.querySelector('.card-price').innerText.split(' ')[1],
            id: product.dataset.id,
            number: product.dataset.number,
            quantity: parseInt(product.querySelector('.quantity-input').value)
        }));
    
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
    
        if (loggedInUser.username) {
            const userIndex = storedAccounts.findIndex(user => user.username === loggedInUser.username);
            if (userIndex !== -1) {
                storedAccounts[userIndex].cart = cartProducts;
                localStorage.setItem('account', JSON.stringify(storedAccounts));
            }
        } else {
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
        }
    }
    

    function loadCartFromLocalStorage() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
    
        let cartProducts = [];
    
        // Retrieve cart products based on logged-in status
        if (loggedInUser.username) {
            const userIndex = storedAccounts.findIndex(user => user.username === loggedInUser.username);
            if (userIndex !== -1) {
                cartProducts = storedAccounts[userIndex].cart || [];
            }
        } else {
            cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
        }
    
        // Clear the cart body before loading new products
        cartBody.innerHTML = '';
    
        // Loop through each product and create the cart product
        cartProducts.forEach(product => {
            const { imgSrc = '', name = '', description = '', price = 0, currency = '', id = '', number = '', quantity = 1 } = product;
    
            // Ensure price is a formatted string
            const priceString = `${parseFloat(price).toFixed(2)} ${currency}`;
    
            // Create cart product using the updated function
            const cartProduct = createCartProduct(imgSrc, name, description, priceString, id, number);
            
            // Set the quantity value in the quantity input
            const quantityInput = cartProduct.querySelector('.quantity-input');
            if (quantityInput) {
                quantityInput.value = quantity; // Set the quantity
            }
    
            // Append the cart product to the cart body
            cartBody.appendChild(cartProduct);
        });
    
        // Perform any necessary checks
        cartChecker();
    }
    
    function updateTotalPrice() {
        const cartItems = document.querySelectorAll('.product-card');
    
        // Handle the case when the cart is empty
        if (cartItems.length === 0) {
            const totalPriceElement = document.getElementById('total-price');
            if (totalPriceElement) {
                totalPriceElement.innerText = "0.00";
            }
            return;
        }
    
        let totalPrice = 0; // Total price accumulator
        let currencyName = ''; // To store the common currency name
    
        cartItems.forEach(item => {
            const priceElement = item.querySelector('.card-price');
            const quantityInput = item.querySelector('.quantity-input');
    
            if (priceElement && quantityInput) {
                // Check if base price is stored in a data attribute, ensure it's updated when currency changes
                let basePrice = parseFloat(item.getAttribute('data-base-price'));
                
                if (isNaN(basePrice)) {
                    // If base price is not found, initialize it from the visible price
                    const priceText = priceElement.innerText.split(' ')[0].replace("$", "").replace(",", ""); 
                    basePrice = parseFloat(priceText); // Convert to float for calculation
    
                    // Store the base price in a data attribute for future reference
                    item.setAttribute('data-base-price', basePrice);
                }
    
                const itemCurrency = priceElement.innerText.split(' ')[1]; // Get the currency part
    
                // Multiply base price by quantity
                const quantity = parseInt(quantityInput.value) || 1;
                const itemTotalPrice = basePrice * quantity; // Calculate the total price for the item
    
                totalPrice += itemTotalPrice; // Add the total price of this item to the total price accumulator
    
                // Ensure all products have the same currency
                if (!currencyName) {
                    currencyName = itemCurrency; // Set the currency name once
                }
            }
        });
    
        // Update the total price element
        const totalPriceElement = document.getElementById('total-price');
        if (totalPriceElement) {
            totalPriceElement.innerText = `$${totalPrice.toFixed(2)} ${currencyName}`; // Display total price with currency
        }
    }
    
// Function to sync cart prices with the selected currency
    function syncCartPricesWithCurrency() {
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length === 0) {
        return; // Exit if there are no products
    }

    productCards.forEach(productCard => {
        const productNumber = productCard.dataset.number; // Get the unique product number
        const productElement = document.querySelector(`.product[data-number="${productNumber}"]`); // Find the corresponding product

        if (productElement) {
            // Update the displayed price based on the selected currency
            const newPriceText = productElement.querySelector('.product-price').innerText;

            // Extract the price and currency from the new price text
            const priceText = newPriceText.split(' ')[0].replace("$", "").replace(",", "");
            const itemCurrency = newPriceText.split(' ')[1];

            // Update the base price in the data attribute to reflect the new price
            const basePrice = parseFloat(priceText);
            productCard.setAttribute('data-base-price', basePrice);

            // Get the quantity input and calculate total price based on quantity
            const quantityInput = productCard.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value) || 1;

            // Calculate the total price (base price * quantity)
            const totalPrice = basePrice * quantity;

            // Update the price in the cart item's price element
            const productPriceElement = productCard.querySelector('.card-price');
            productPriceElement.innerText = `$${totalPrice.toFixed(2)} ${itemCurrency}`;
        }
    });

    updateTotalPrice(); // Recalculate the total price after updating
    }

    
    function appendCartContent() {
        if (!cart.contains(cartHead)) cart.appendChild(cartHead);
        if (!cart.contains(cartBody)) cart.appendChild(cartBody);
        if (!cart.contains(cartFooter)) cart.appendChild(cartFooter);
    }

    function cartChecker() {
        if (cartBody.children.length === 0) {
            if (cart.contains(cartHead)) cart.removeChild(cartHead);
            if (cart.contains(cartBody)) cart.removeChild(cartBody);
            if (cart.contains(cartFooter)) cart.removeChild(cartFooter);
            if (!cart.contains(emptyCart)) cart.appendChild(emptyCart);
            cart.style.backgroundColor = '';
        } else {
            appendCartContent();
            if (cart.contains(emptyCart)) cart.removeChild(emptyCart);
        }
    }

    function initializeCartFunctions() {
        loadCartFromLocalStorage();
        rebuildCartFromLocalStorage(); 
        appendCartContent();
        cart.style.backgroundColor = 'white';
        cartChecker();
        updateCartCalc();

        // had to make this function wait until all of the above get loaded
        setTimeout(() => {
            syncCartPricesWithCurrency()
        }, 100);
    }
// ------------------------------------- End Cart Section --------------------------------------



// ------------------------------------- Product Section ---------------------------------------

// Function to extract existing products from the DOM and store them in the products array
function processProducts() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let userProducts = [], defaultProducts = [], addedProducts = [], deletedProducts = [];

    if (loggedInUser) {
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
        const loggedInUserData = JSON.parse(loggedInUser);
        var userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);
        
        if (userIndex !== -1) {
            const user = storedAccounts[userIndex];
            defaultProducts = user.defaultProducts || [];
            addedProducts = user.addedProducts || [];
            deletedProducts = user.deletedProducts || [];
            
            // Merge default and added products, excluding deleted ones without sorting
            userProducts = mergeProductStorages(defaultProducts, addedProducts, deletedProducts);
            
            // Save userProducts inside the logged-in user's account
            user.products = userProducts; // Store merged products in user object

            storedAccounts[userIndex] = user; // Update the user account in stored accounts
            
            // Save the updated accounts back to local storage
            localStorage.setItem('account', JSON.stringify(storedAccounts)); 
        }
    } else {
        // Load global default products only (no added or deleted storage for non-logged users)
        defaultProducts = JSON.parse(localStorage.getItem('defaultProducts')) || [];
        userProducts = defaultProducts;
    }
    
    // Set the products array to user products
    products = userProducts.length > 0 ? userProducts : loadDefaultProducts();

    toggleResetButton();
    
    // Fix issue where the user's added products don't get displayed after deletion
    setTimeout(() => {
        updateFilteredProducts();
    }, 50);
}


// Merge default and added product arrays, excluding deleted products (only for logged in users)
function mergeProductStorages(defaultProducts, addedProducts, deletedProducts) {
    // Reverse the addedProducts to show the newest one first
    const reversedAddedProducts = [...addedProducts].reverse();

    // Combine reversed addedProducts first, then defaultProducts
    const combinedProducts = [...reversedAddedProducts, ...defaultProducts];

    // Filter out products that are in the deleted list
    const mergedProducts = combinedProducts.filter(product => 
        !deletedProducts.some(deleted => deleted.productNumber === product.productNumber)
    );

    console.log("Reversed added products:", reversedAddedProducts);
    console.log("Merged products (after deletion filtering):", mergedProducts);

    return mergedProducts;
}

// Load default products from the DOM and save them to local storage if not already there
function loadDefaultProducts() {
    const { extractedProducts, maxProductNumber } = extractProductData();
    let currentProductNumber = maxProductNumber;

    extractedProducts.forEach(product => {
        currentProductNumber++;

        const processedProduct = {
            ...product,
            productNumber: currentProductNumber // Assign unique product number
        };

        products.push(processedProduct); // Add to products array
    });

    // Save default products globally if no user is logged in
    localStorage.setItem('defaultProducts', JSON.stringify(extractedProducts));

    // Save user default products if a user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        saveProductsToLocalStorage('defaultProducts', extractedProducts);
    }
}

// Save products to local storage based on type (default, added, deleted)
function saveProductsToLocalStorage(type, productList) {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
        const loggedInUserData = JSON.parse(loggedInUser);
        const userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);

        if (userIndex !== -1) {
            const user = storedAccounts[userIndex];
            user[type] = productList; // Update user's specific product type
            storedAccounts[userIndex] = user; // Update the user account in stored accounts
            localStorage.setItem('account', JSON.stringify(storedAccounts)); // Save updated accounts back to local storage
        }
    } else if (type === 'defaultProducts') {
        // If no user is logged in, save only default products
        localStorage.setItem(type, JSON.stringify(productList));
    }
}

// Function to update the default products in local storage
function updateDefaultProducts(newDefaultProducts) {
    // Update the global default products storage
    localStorage.setItem('defaultProducts', JSON.stringify(newDefaultProducts));

    // Update the default products for all logged-in users
    const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
    storedAccounts.forEach(user => {
        user.defaultProducts = newDefaultProducts; // Update each user's default products
    });
    localStorage.setItem('account', JSON.stringify(storedAccounts)); // Save updated accounts
}

// Function to handle product deletion (only for logged in users)
function deleteProduct(productNumber) {
    const productIndex = products.findIndex(product => product.productNumber == productNumber);

    if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1)[0];

        // Add product to the deleted list in local storage if user is logged in
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
            const loggedInUserData = JSON.parse(loggedInUser);
            const userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);

            if (userIndex !== -1) {
                let deletedProducts = storedAccounts[userIndex].deletedProducts || [];
                deletedProducts.push(deletedProduct);
                saveProductsToLocalStorage('deletedProducts', deletedProducts);
            }

            // Save remaining products as "added" for the logged-in user
            saveProductsToLocalStorage('addedProducts', products);
        }

        renderProducts();
        renderPagination();
        updateFilteredProducts();
    }
}

// Reset products to default state based on user or global storage
function resetProducts() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
        const loggedInUserData = JSON.parse(loggedInUser);
        const userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);

        if (userIndex !== -1) {
            const user = storedAccounts[userIndex];
            const defaultProducts = user.defaultProducts || [];
            
            // Reset added and deleted products
            user.addedProducts = [];  
            user.deletedProducts = []; 
            user.cart = []; 
            
            // Reset products to default products
            products = [...defaultProducts]; // Ensure products is reset to a copy of default products
            
            // Save the updated user account back to local storage
            storedAccounts[userIndex] = user; // Update the user account
            localStorage.setItem('account', JSON.stringify(storedAccounts)); // Save updated accounts back to local storage
        }
    } else {
        // Non-logged-in user
        const defaultProducts = JSON.parse(localStorage.getItem('defaultProducts')) || [];
        products = [...defaultProducts]; // Reset to default products
    }

    document.querySelector('.reset-btn').style.display = 'none';
    location.reload(); // Reload to apply reset
}

// Extract products from all pages (from the DOM)
function extractProductData() {
    const allProductElements = document.querySelectorAll('.product'); // Grab all products
    let maxProductNumber = products.length > 0 
        ? Math.max(...products.map(product => product.productNumber || 0)) 
        : 0;

    const extractedProducts = [];

    allProductElements.forEach(productElement => {
        const productId = productElement.id;
        const productName = productElement.querySelector('.product-head').textContent;
        const productDescription = productElement.querySelector('.product-des').textContent;
        const productPrice = parseFloat(productElement.querySelector('.product-price').textContent);
        const productImage = productElement.querySelector('.product-img img').src;

        extractedProducts.push({
            id: productId,
            name: productName,
            description: productDescription,
            price: productPrice,
            image: productImage,
            productNumber: ++maxProductNumber // Assign unique productNumber
        });
    });

    return { extractedProducts, maxProductNumber };
}

// Toggle visibility of reset button based on product comparison
function toggleResetButton() {
    const resetBtn = document.querySelector('.reset-btn');

    // Retrieve default products from local storage
    const defaultProducts = JSON.parse(localStorage.getItem('defaultProducts')) || [];

    // Compare current products with default products based on logged in status
    const loggedInUser = localStorage.getItem('loggedInUser');
    let currentProducts = [];

    if (loggedInUser) {
        // For logged-in users, compare current products array directly
        currentProducts = products;
    } else {
        // For non-logged users, retrieve products from local storage
        currentProducts = products;
        console.log(currentProducts);
    }

    // Check if there is a difference between current and default products
    const isDifferent = areProductsDifferent(defaultProducts, currentProducts);

    // Debugging logs to check the data
    console.log('Default products from local storage:', defaultProducts);
    console.log('Current products:', currentProducts);
    console.log('Are products different?', isDifferent);

    // Show or hide the reset button based on the comparison
    resetBtn.style.display = isDifferent ? 'block' : 'none';
}

// Helper function to compare current and default products
function areProductsDifferent(defaultProducts, currentProducts) {
    if (defaultProducts.length !== currentProducts.length) {
        console.log('Product lengths are different');
        return true; // Different if the number of products is different
    }

    // Create a helper function to compare product objects
    const productStringify = (product) => JSON.stringify({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        productNumber: product.productNumber
    });

    // Compare product objects without sorting
    for (let i = 0; i < defaultProducts.length; i++) {
        if (productStringify(defaultProducts[i]) !== productStringify(currentProducts[i])) {
            console.log(`Products differ at index ${i}:`, defaultProducts[i], currentProducts[i]);
            return true; // Products differ if any field is different
        }
    }

    return false; // Return false if no differences are found
}


// Attach reset button event listener
document.querySelector('.reset-btn').addEventListener('click', resetProducts);



//--------------------------------------------------------------------------------------------------------------------------------


function renderProducts() {
    const productSection = document.getElementById('productSection');
    productSection.innerHTML = '';
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    
    for (let i = startIndex; i < endIndex && i < filteredProducts.length; i++) {
        const product = filteredProducts[i];
        const productElement = createProductElement(product);
        productSection.appendChild(productElement);
    }
}

// remove the product from object and product section
document.getElementById('productSection').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-product')) {
        const productElement = event.target.closest('.product');
        const productNumber = productElement.getAttribute('data-number');

        // Find and remove the product from the products array
        const productIndex = products.findIndex(product => product.productNumber == productNumber);
        if (productIndex !== -1) {
            const deletedProduct = products[productIndex]; // Store the deleted product for later use
            products.splice(productIndex, 1); // Remove the product from the array
            productElement.remove(); // Remove the product from the DOM
            
            // Find and remove the product from the cart if it exists
            const cartProduct = document.querySelector(`.cart-body .product-card[data-number="${productNumber}"]`);
            if (cartProduct) {
                handleRemoveButtonClick(cartProduct); // This will handle cart removal and local storage update
            }

            // Save the deleted product to local storage
            manageUserProductStorage(deletedProduct);

            // Check if the user is logged in and clear their addedProducts
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                manageUserProductStorage(deletedProduct.productNumber); // Call the function to clear added products
                
                //this code is made to fix the bug where user's products were empty 
                let userProducts = [], defaultProducts = [], addedProducts = [], deletedProducts = [];

                const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
                const loggedInUserData = JSON.parse(loggedInUser);
                const userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);
                const user = storedAccounts[userIndex];
                console.log(user.products)

                defaultProducts = user.defaultProducts || [];
                addedProducts = user.addedProducts || [];
                deletedProducts = user.deletedProducts || [];
                
                // Merge default and added products, excluding deleted ones without sorting
                userProducts = mergeProductStorages(defaultProducts, addedProducts, deletedProducts);
                console.log("test")
                console.log(userProducts.length)
                if (userProducts.length == 0) {
                    console.log("working")
                    user.deletedProducts = []
                }

                user.products = userProducts;
                localStorage.setItem('account', JSON.stringify(storedAccounts)); 
            }

            // Re-initialize the other functions
            initializePriceInputs();
            renderProducts();
            renderPagination();
            updateFilteredProducts();
            toggleResetButton();
        }
    }
});

// Function to manage added and deleted products in local storage
// Function to manage added and deleted products in local storage
function manageUserProductStorage(deletedProduct) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
        const loggedInUserData = JSON.parse(loggedInUser);
        const userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);

        if (userIndex !== -1) {
            const user = storedAccounts[userIndex];
            const userProducts = user.addedProducts || []; // Get user's added products
            const deletedProducts = user.deletedProducts || []; // Get user's deleted products

            // Check if the deleted product is in addedProducts
            const isInAddedProducts = userProducts.some(product => product.productNumber === deletedProduct.productNumber);

            if (isInAddedProducts) {
                // If it is in addedProducts, just remove it from there
                user.addedProducts = userProducts.filter(product => product.productNumber !== deletedProduct.productNumber);
                console.log(`Removed product ${deletedProduct.productNumber} from addedProducts.`);
            } 
            
            // Always add the deleted product to deletedProducts
            deletedProducts.push(deletedProduct); // Add the deleted product to the deleted array
            user.deletedProducts = deletedProducts; // Update the deletedProducts in the user object
            console.log(`Added product ${deletedProduct.productNumber} to deletedProducts.`);

            // Update the user's data in the storedAccounts
            storedAccounts[userIndex] = user;

            // Save updated accounts back to local storage
            localStorage.setItem('account', JSON.stringify(storedAccounts));
            console.log("User's addedProducts and deletedProducts updated.");
        }
    }
}


// Function to remove a product from local storage
function removeProductFromLocalStorage(productNumber) {
    let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    cartProducts = cartProducts.filter(product => product.number !== productNumber);
    localStorage.setItem('cart', JSON.stringify(cartProducts));
}

// ------------------------------------- End Product Section ---------------------------------------


// -------------------------------------------------------- Creating New Products --------------------------

// creating products form 
let addProBtn = document.querySelector(".Add-btn")
let addProducts = document.querySelector(".add-product");
let addProductSection = document.querySelector(".add-productSection");
let addProDelete = document.querySelector(".add-productSection .delete")

//creating products inputs
let addProId = document.getElementById('productId');
let addCustomId = document.getElementById('customProductId');
let addProName = document.getElementById('productName');
let addProPrice = document.getElementById('productPrice');
let addProDes = document.getElementById('productDescription');
let addButton = document.querySelector(".add-productSection button");

// Function to handle Enter key press and trigger button click
function triggerButtonOnEnter(event) {
    if (event.key === 'Enter') {
        addButton.click();
    }
}

// Add event listeners for 'Enter' key press
addCustomId.addEventListener('keypress', triggerButtonOnEnter);
addProName.addEventListener('keypress', triggerButtonOnEnter);
addProPrice.addEventListener('keypress', triggerButtonOnEnter);
addProDes.addEventListener('keypress', triggerButtonOnEnter);

// hiding and displaying the products form
document.addEventListener('click', (e) => {
    if (!addProductSection.contains(e.target) && addProductSection.classList.contains('section') || addProDelete.contains(e.target) || BgCover.contains(e.target)) {
        addProductSection.classList.remove("section")
        BgCover.classList.remove("active");
        addProId.style.borderColor = '';
        addProName.style.borderColor = '';
        addProPrice.style.borderColor = '';
        addProDes.style.borderColor = '';
        resetForm()
    } else if (addProBtn.contains(e.target)) {
        addProductSection.classList.toggle('section');
        BgCover.classList.add("active");

        // make price input accept only numbers since inputs with number types don't work with maxlength
        const productPriceInput = document.getElementById('productPrice');
        productPriceInput.addEventListener('input', () => {
        productPriceInput.value = productPriceInput.value.replace(/[^0-9]/g, '');
});
    }
});

// removing any requirement borders when the form is closed
function removeProductBorders() {
    addProId.oninput = () => {
        addProId.style.borderColor = '';
    }
    addProName.oninput = () => {
        addProName.style.borderColor = '';
    }
    addProPrice.oninput = () => {
        addProPrice.style.borderColor = '';
    }
    addProDes.oninput = () => {
        addProDes.style.borderColor = '';
    }
}
removeProductBorders()


const defaultProductImages = {
    "CPU": "../Images/CPU_I7.jpg",
    "GPU": "../Images/GPU.jpg",
    "Rams": "../Images/RAMs.jpg",
    "MotherBoard": "../Images/MotherBoard.jpg",
    "PowerSupply": "../Images/PowerSupply.jpg"
};


function loadUserProductImages() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
        const loggedInUserData = JSON.parse(loggedInUser);
        const userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);

        if (userIndex !== -1) {
            const user = storedAccounts[userIndex];
            return user.productImages || {}; // Return user's product images or an empty object
        }
    }
    return {}; // Return an empty object if no user is logged in
}

// Initialize productImages with default images and user-specific images
let productImages = { ...defaultProductImages, ...loadUserProductImages() };

// Function to save product images to the logged-in user's account
function saveProductImagesToUserAccount() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
        const loggedInUserData = JSON.parse(loggedInUser);
        const userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);

        if (userIndex !== -1) {
            const user = storedAccounts[userIndex];
            user.productImages = productImages; // Update user's product images
            storedAccounts[userIndex] = user;
            localStorage.setItem('account', JSON.stringify(storedAccounts));
        }
    }
}

// Function to update the product images object based on selected option or custom image
function updateImage(selectedOption) {
    // Use the image from the productImages object if it exists
    img = productImages[selectedOption] || "../Images/noImage.jpg"; // Default image if no match is found
}

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.id = product.id;

    // Set the data-number attribute for the unique product number
    productElement.setAttribute('data-number', product.productNumber);

    productElement.innerHTML = `
        <div class="product-img">
            <img src="${product.image}">
        </div>
        <div class="product-info">
            <h3 class="product-head">${product.name}</h3>
            <p class="product-des">${product.description}</p>
            <span class="product-price" data-usd-price="${product.price.toFixed(2)}">$${product.convertedPrice}</span>
            <button class="btn addToCartBtn">Add to the cart</button>
        </div>
        <span class="btn delete-product">DELETE</span>`;
    return productElement;
}

function outLine(requiredFields) {
    // Remove red outline from all inputs
    requiredFields.forEach(field => {
        field.style.borderColor = '';
    });

    const addProId = document.getElementById('productId'); // The select input for existing IDs


    // Get the custom ID container
    const customIdContainer = document.getElementById('customIdContainer');
    const customProductIdInput = document.getElementById('customProductId');

    // Check if the custom ID container is visible
    const isCustomIdVisible = customIdContainer && customIdContainer.style.display !== "none";

    // Add red outline to required empty fields
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
        }
    });

        // Check if the existing ID select input has no value selected
        if (addProId.value === "none") {
            addProId.style.borderColor = "red"; // Apply red border if no ID is selected
        }

    if (isCustomIdVisible) {
        if (!customProductIdInput.value.trim()) {
            customProductIdInput.style.borderColor = 'red'; // Apply red border if custom ID is visible and empty
        }
    }

    if (customProductIdInput) {
        customProductIdInput.addEventListener('input', () => {
        const customIdContainer = document.getElementById('customIdContainer');
        const isCustomIdVisible = customIdContainer && customIdContainer.style.display !== "none";
        
        if (isCustomIdVisible) {
            if (customProductIdInput.value.trim()) {
                customProductIdInput.style.borderColor = ''; // Remove red border if input is not empty
            }
        }
    });
}

}

function resetForm() {
    document.getElementById('productId').value = "none";
    document.getElementById('productName').value = "";
    document.getElementById('productDescription').value = "";
    document.getElementById('productPrice').value = "";

    document.getElementById('customProductId').value = "";
    document.getElementById('customProductId').style.borderColor ="";
    document.getElementById('customImageUpload').value = "";
    document.getElementById('customIdContainer').style.display = 'none';

    document.getElementById('newIdText').style.display = 'inline-block';
    document.getElementById('newIdButton').style.display = 'inline-block';
    document.getElementById('productId').style.display = 'inline-block';
}

document.getElementById('newIdButton').addEventListener('click', function () {
    // Show custom ID input and image upload field
    const customIdContainer = document.getElementById('customIdContainer');
    customIdContainer.style.display = 'block';

    // Hide the "New ID" button and the ID selection dropdown
    document.getElementById('newIdButton').style.display = 'none';
    document.getElementById('newIdText').style.display = 'none';
    document.getElementById('productId').style.display = 'none';
});

// Event listener for the "Back" button
document.getElementById('backToFormButton').addEventListener('click', function () {
    // Hide custom ID input and image upload field
    const customIdContainer = document.getElementById('customIdContainer');
    customIdContainer.style.display = 'none';
    
    // Show the "New ID" button and the ID selection dropdown
    document.getElementById('newIdText').style.display = 'inline-block';
    document.getElementById('newIdButton').style.display = 'inline-block';
    document.getElementById('productId').style.display = 'inline-block';
    
    // Reset custom input fields
    document.getElementById('customProductId').value = '';
    document.getElementById('customImageUpload').value = '';
});


function addProduct() {
    const productIdInput = document.getElementById('productId');
    const customProductIdInput = document.getElementById('customProductId');
    const customImageUpload = document.getElementById('customImageUpload');
    let productId = productIdInput.value;
    let customImg = ""; 

    // Check if a custom ID is entered
    if (customProductIdInput.value.trim()) {
        productId = customProductIdInput.value.trim();

        // Check if the image file is selected
        if (customImageUpload.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                customImg = e.target.result; 
                productImages[productId] = customImg; // Store the custom image

                // Save the updated product images to the user's account
                saveProductImagesToUserAccount();

                // Add the product with the custom image
                addNewProduct(productId, customImg);
            };
            reader.readAsDataURL(customImageUpload.files[0]); 
        } else {
            // If no image is uploaded, use a default image
            customImg = "../Images/noImage.jpg"; // Default image path
            productImages[productId] = customImg; // Store the default image for the custom ID
            
            // Save the updated product images to the user's account
            saveProductImagesToUserAccount();

            // Add the product with the default image
            addNewProduct(productId, customImg);
        }
    } else {
        // Use pre-defined ID
        updateImage(productId);
        customImg = img; 
        addNewProduct(productId, customImg); 
    }
}

// Call this function to initialize images on page load
function initializeProductImages() {
    productImages = { ...defaultProductImages, ...loadUserProductImages() };
}

initializeProductImages(); // Load product images on page load

function addNewProduct(productId, img) {
    const productNameInput = document.getElementById('productName');
    const productDescriptionInput = document.getElementById('productDescription');
    const productPriceInput = document.getElementById('productPrice');

    const productName = productNameInput.value;
    const productDescription = productDescriptionInput.value;
    const productPrice = parseFloat(productPriceInput.value); // Ensure price is a number

    const requiredFields = [productNameInput, productPriceInput, productDescriptionInput];
    const isValidPrice = !isNaN(productPrice) && productPrice > 0;

    // Check for empty fields and valid price
    if (!productId || productId === "none" || !productName || !productDescription || isNaN(productPrice) || productPrice === "") {
        outLine(requiredFields); 
        showAlert("failed", "Please fill all required inputs.");
        return; 
    }

    if (!isValidPrice) {
        showAlert("failed", "Please enter a valid price.");
        return; 
    }

    const currencySelect = document.getElementById('currency');
    const selectedOption = currencySelect.options[currencySelect.selectedIndex];
    const selectedRate = parseFloat(selectedOption.dataset.rate); // Current currency rate

    const usdPrice = productPrice / selectedRate; // Store price in USD
    const convertedPrice = productPrice; // Price in the current currency

    // Get the next unique product number based on existing products
    const maxProductNumber = products.length > 0 
        ? Math.max(...products.map(product => product.productNumber || 0)) 
        : 0;
    const newProductNumber = maxProductNumber + 1;

    const newProduct = {
        id: productId,
        name: productName,
        description: productDescription,
        price: parseFloat(usdPrice.toFixed(2)), // Ensure this is a valid number
        convertedPrice: `${convertedPrice} ${currencySelect.value}`, 
        image: img,
        currency: selectedOption.textContent,
        productNumber: newProductNumber
    };
    
    products.unshift(newProduct); // Add the new product to the start of the array
    renderProducts();
    
    updateMaxPrice(convertedPrice); 
    toggleResetButton();
    
    // Save the new product to the user's account and local storage
    saveProductToUserAccount(newProduct);
    saveProductsToLocalStorage('defaultProducts', products); // Update the entire products list in local storage

    // Update filtered products, initialize price inputs, render filter options, and pagination
    updateFilteredProducts();
    initializePriceInputs();
    renderFilterOptions();
    resetForm();
    renderPagination();
    addProductSection.classList.remove("section");
    BgCover.classList.remove("active");
    
    showAlert("success", "Product has been added");

// Check if there is no logged in user
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        setTimeout(() => {
            showAlert("", "Note: Create an account to keep your changes on products", 3000);
    }, 2000);
}

}

// Function to save the newly added product to local storage under the user's account
function saveProductToUserAccount(newProduct) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
        const loggedInUserData = JSON.parse(loggedInUser);
        const userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);

        if (userIndex !== -1) {
            const user = storedAccounts[userIndex];
            const userProducts = user.addedProducts || []; // Use addedProducts to store new products
            userProducts.push(newProduct); // Add the new product
            user.addedProducts = userProducts; // Update the user's added products
            storedAccounts[userIndex] = user; // Update the user data in the array
            localStorage.setItem('account', JSON.stringify(storedAccounts)); // Save updated accounts to local storage
        }
    } else {
        let addedProducts = JSON.parse(localStorage.getItem('addedProducts')) || []; // Initialize array if empty
        addedProducts.push(newProduct); // Add the new product to the array
        localStorage.setItem('addedProducts', JSON.stringify(addedProducts)); // Save updated array to local storage
    }
}

// ----------------------------------------------------------------



// -------------------------------------------  Filter Section -----------------------------------

function renderFilterOptions() {
    const filterProductSelect = document.getElementById('filterProduct');
    const addSelector = document.querySelector("#productId");
    const currencySelect = document.getElementById('currency');
    const maxPriceInput = document.getElementById('maxPrice');
    const maxPriceLabel = document.getElementById('maxPriceLabel');

    // Clear existing options
    filterProductSelect.innerHTML = '<option value="none">Show All</option>';
    addSelector.innerHTML = '<option value="none"></option>';

    if (products.length > 0) {
        const productIds = new Set(products.map(product => product.id));

        productIds.forEach(productId => {
            const option = document.createElement('option');
            option.value = productId;
            option.textContent = productId;
            filterProductSelect.appendChild(option);
        });

        // Clone options for the addSelector
        for (let i = 1; i < filterProductSelect.options.length; i++) {
            let option = filterProductSelect.options[i].cloneNode(true);
            addSelector.appendChild(option);
        }

        // Ensure currency element exists before accessing
        if (currencySelect) {
            const selectedOption = currencySelect.selectedOptions[0];
            const currentCurrencyRate = selectedOption ? parseFloat(selectedOption.dataset.rate) : 1;

            // Convert prices to the current currency rate
            const maxPriceUSD = Math.max(...products.map(product => product.price));
            const maxPriceConverted = (maxPriceUSD * currentCurrencyRate).toFixed(0);
        
            if (maxPriceInput && maxPriceLabel) {
                maxPriceInput.max = maxPriceConverted;
                maxPriceInput.value = maxPriceConverted;
                maxPriceLabel.textContent = maxPriceConverted;
            }
        }
    } else {
        // Handle the case where there are no products
        filterProductSelect.disabled = true; 
        addSelector.disabled = true; 
    }

    // Trigger change event on addSelector after appending options
    const event = new Event('change');
    addSelector.dispatchEvent(event);
}

// Initialize price inputs and labels
function initializePriceInputs() {
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const maxPriceLabel = document.getElementById('maxPriceLabel');

    // Calculate the maximum price among existing products based on converted prices
    const maxExistingPrice = Math.max(...products.map(product => parseFloat(product.convertedPrice)));

    let newMax = "";
        if (maxExistingPrice < 100) {
            newMax = 100
        } else {
            newMax = Math.ceil(parseFloat(maxExistingPrice)) + 5 // to fix currency change issues
        }

    // Set initial values for max price input and label
    maxPriceInput.max = newMax;
    maxPriceInput.value = newMax;
    maxPriceLabel.textContent = newMax;
    maxPriceLabel.value = newMax;

    // Set the minimum price input's min and max attributes
    minPriceInput.min = 0;
    minPriceInput.max = newMax;


    // Update the price labels initially
    updatePriceLabels();
    // Add event listeners for price input changes
    minPriceInput.addEventListener('input', () => updatePriceLabel('min'));
    maxPriceInput.addEventListener('input', () => updatePriceLabel('max'));
    maxPriceInput.addEventListener('change', () => updatePriceRange(parseFloat(maxPriceInput.value)));
}

// Update price labels based on input values
function updatePriceLabels() {
    const minPriceLabel = document.getElementById('minPriceLabel');
    const maxPriceLabel = document.getElementById('maxPriceLabel');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    // Update label texts with input values
    minPriceLabel.textContent = minPriceInput.value;
    minPriceLabel.value = minPriceInput.value;
    maxPriceLabel.textContent = maxPriceInput.value;
}

// Update a specific price label (min or max) based on input value
function updatePriceLabel(type) {
    const priceLabel = document.getElementById(`${type}PriceLabel`);
    const priceInput = document.getElementById(`${type}Price`);

    // Update label text with input value
    priceLabel.textContent = priceInput.value;
    priceLabel.value = priceInput.value;

    // Update filtered products based on label change
    updateFilteredProducts();
}

// Update the maximum price scale and label based on a new product price
function updateMaxPrice(newProductPrice) {
    const maxPriceInput = document.getElementById('maxPrice');
    const maxPriceLabel = document.getElementById('maxPriceLabel');
    const minPriceInput = document.getElementById('minPrice');

    const currentMaxPrice = parseFloat(maxPriceInput.max);

    // ----------------------------------------------------------------------------
    let newMax = parseFloat(newProductPrice) + 5 // to fix currency change issues
    // ----------------------------------------------------------------------------
    
    // Update max price if the new product's price is higher
    if (isNaN(currentMaxPrice) || newMax > currentMaxPrice) {
        maxPriceInput.max = newMax;
        maxPriceInput.value = newMax;
        maxPriceLabel.textContent = newMax;
        maxPriceLabel.value = newMax;

        // Update min price max limit to match new max price
        minPriceInput.max = newMax;

        // Trigger an input event to update filtered products
        maxPriceInput.dispatchEvent(new Event('input'));
    }
}

// update price ranges based on input's value
function updatePriceRange() {
    var maxPriceLabel = document.getElementById("maxPriceLabel")
    maxPriceLabel.addEventListener("input", () => {
        document.getElementById(`maxPrice`).value = maxPriceLabel.value; 
        maxPriceLabel.textContent = maxPriceLabel.value
        updateFilteredProducts();
    })

    var minPriceLabel = document.getElementById("minPriceLabel")
    minPriceLabel.addEventListener("input", () => {
        document.getElementById(`minPrice`).value = minPriceLabel.value; 
        minPriceLabel.textContent = minPriceLabel.value
        updateFilteredProducts();
    })
}

// Update the filtered products based on selected ID and price range filters
function updateFilteredProducts() {
    const filterProductSelect = document.getElementById('filterProduct');
    const selectedProductId = filterProductSelect.value;
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    // Get numeric values from price inputs
    const minPrice = parseFloat(minPriceInput.value);
    const maxPrice = parseFloat(maxPriceInput.value);
    // Clear the existing filtered products

    filteredProducts = [];

    // Get the selected currency rate
    const currencySelect = document.getElementById('currency');
    const selectedCurrency = currencySelect.value;
    const selectedOption = document.querySelector(`#currency option[value="${selectedCurrency}"]`);
    const selectedRate = selectedOption ? parseFloat(selectedOption.dataset.rate) : 1;

    
    // Filter products based on ID and price range
    filteredProducts = products.filter(product => {
        const matchId = selectedProductId === 'none' || product.id === selectedProductId;
        const matchMinPrice = isNaN(minPrice) || (product.price * selectedRate.toFixed(2)) >= minPrice;
        const matchMaxPrice = isNaN(maxPrice) || (product.price * selectedRate.toFixed(2)) <= maxPrice;
        return matchId && matchMinPrice && matchMaxPrice;
    });


    // Render updated products based on filters
    currentPage = 1;
    renderProducts();
    renderPagination();
}

// display / hide filter section on small-medium screens
function FilterFunctions() {
    const filter = document.querySelector('.filter');
    const filterOpen = document.querySelector('.filter-open');
    const filterDelete = document.querySelector('#filter-delete');


    // Show/hide the filter with animation when the open button is clicked
    filterOpen.onclick = (e) => {
        e.stopPropagation(); // Prevent the event from propagating
        filter.classList.toggle('animation');
    };

    // Hide the filter and remove the animation class when the delete button is clicked
    filterDelete.onclick = (e) => {
        e.stopPropagation(); // Prevent the event from propagating
        filter.classList.remove('animation');
    };

    // Hide the filter and remove the animation class when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!filter.contains(e.target) && filter.classList.contains('animation')) {
            filter.classList.remove('animation');
        }
    });

    // Prevent the filter from closing when clicking inside it
    filter.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}
FilterFunctions()

// ------------------------------------------ pagination -------------------------------

let next = document.querySelector('.next');
let prev = document.querySelector('.previous');

function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    if (totalPages > 1) {
        // Always display the first page
        addPaginationItem(1);

        // Add dots if we're past the third page
        if (currentPage > 3) {
            addEllipsis();
        }

        // Display the middle pages (three max around the current page)
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            addPaginationItem(i);
        }

        // Add dots if we're not close to the last page
        if (currentPage < totalPages - 2) {
            addEllipsis();
        }

        // Always display the last page
        addPaginationItem(totalPages);
    }

    // Update prev/next button states
    prev.classList.toggle('disabled', currentPage === 1);
    next.classList.toggle('disabled', currentPage === totalPages);
}

// Helper function to add individual pagination items
function addPaginationItem(pageNumber) {
    const paginationElement = document.getElementById('pagination');
    const liElement = document.createElement('li');
    liElement.textContent = pageNumber;
    liElement.classList.add('page-item');
    if (pageNumber === currentPage) {
        liElement.classList.add('bullet'); // Highlight current page
    }
    
    liElement.addEventListener('click', () => {
        currentPage = pageNumber;
        renderProducts();
        renderPagination();
    });
    paginationElement.appendChild(liElement);
}

// Helper function to add ellipsis (...)
function addEllipsis() {
    const paginationElement = document.getElementById('pagination');
    const liElement = document.createElement('li');
    liElement.textContent = '...';
    liElement.classList.add('dots');
    paginationElement.appendChild(liElement);
}

// Next button functionality
next.onclick = () => {
    if (!next.classList.contains("disabled")) {
        currentPage++;
        renderProducts();
        renderPagination();
    }
};

// Previous button functionality
prev.onclick = () => {
    if (!prev.classList.contains("disabled")) {
        currentPage--;
        renderProducts();
        renderPagination();
    }
};

// -------------------------------------------- currency --------------------------------

// Function to fetch the currency data from a JSON file
function fetchCurrencyData() {
    const currencyFile = '../JavaScript/currencies.json'; 
    return fetch(currencyFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => data.rates)
        .catch(error => {
            console.error('Error fetching the currency data:', error);
            return {}; // Return an empty object if there's an error
        });
}

// Function to populate currency options in the dropdown
function populateCurrencyOptions(exchangeRates) {
    const currencySelect = document.getElementById('currency');
    currencySelect.innerHTML = '<option value="USD" data-rate="1">USD</option>'; // Default USD

    for (const [currencyCode, currencyData] of Object.entries(exchangeRates)) {
        const option = document.createElement('option');
        option.value = currencyCode;
        option.textContent = currencyCode;
        option.dataset.rate = currencyData.value;
        currencySelect.appendChild(option);
    }

    updateButtonExchangeRates(exchangeRates)
    // Set initial values based on the stored currency
    const storedCurrency = localStorage.getItem('selectedCurrency') || 'USD';
    currencySelect.value = storedCurrency;

    // Update the exchange rate span for the dropdown
    const selectedOption = currencySelect.options[currencySelect.selectedIndex];
    updateDropdownExchangeRate(selectedOption);
}

// Function to update the displayed exchange rate for the dropdown
function updateDropdownExchangeRate(selectedOption) {
    const dropdownExchangeRateSpan = document.getElementById('dropdownExchangeRate');
    const selectedRate = parseFloat(selectedOption.dataset.rate);
    dropdownExchangeRateSpan.textContent = `1 USD = ${selectedRate.toFixed(2)} ${selectedOption.textContent}`;
}

function updateButtonExchangeRates(exchangeRates) {
    const usdRate = exchangeRates["USD"] ? exchangeRates["USD"].value : 1; // Default to 1 if not found
    const sarRate = exchangeRates["SAR"] ? exchangeRates["SAR"].value : 3.75; // Default to 3.75 if not found

    document.querySelector('.USD .exchangeRate').textContent = `1 USD = ${usdRate.toFixed(2)} USD`;
    document.querySelector('.SAR .exchangeRate').textContent = `1 USD = ${sarRate.toFixed(2)} SAR`;
}

// Function to convert prices of products in the products array and update DOM
function convertPrices(selectedOption) {
    const selectedRate = parseFloat(selectedOption.dataset.rate);
    const selectedCurrency = selectedOption.value;

    // Check for logged-in user
    const loggedInUser = localStorage.getItem('loggedInUser');
    let addedProducts = [];

    if (loggedInUser) {
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
        const loggedInUserData = JSON.parse(loggedInUser);
        const userIndex = storedAccounts.findIndex(user => user.username === loggedInUserData.username);

        if (userIndex !== -1) {
            addedProducts = storedAccounts[userIndex].addedProducts || [];
        }
    } else {
        addedProducts = JSON.parse(localStorage.getItem('addedProducts')) || [];
    }

    // Convert prices in the products array based on productNumber
    products.forEach(product => {
        const usdPrice = parseFloat(product.price); // Base USD price

        if (!isNaN(usdPrice)) {
            let convertedPrice;

            // Check if the product exists in addedProducts based on productNumber
            const storedProduct = addedProducts.find(p => p.productNumber === product.productNumber);

            if (storedProduct) {
                // Check if the stored product's currency matches the selected currency
                if (storedProduct.currency === selectedOption.textContent) {
                    // If the currencies match, use the stored converted price
                    product.convertedPrice = `${storedProduct.convertedPrice}`;
                } else {
                    // Continue with the conversion process if currencies don't match
                    if (selectedCurrency === 'USD') {
                        // If the selected currency is USD, keep the original price
                        product.convertedPrice = `${usdPrice.toFixed(2)} USD`;
                    } else {
                        // Convert the price to the selected currency
                        convertedPrice = usdPrice * selectedRate;
                        product.convertedPrice = `${convertedPrice.toFixed(2)} ${selectedOption.textContent}`;
                    }
                }
            } else {
                // If the product is not found in storage, continue with the conversion
                if (selectedCurrency === 'USD') {
                    product.convertedPrice = `${usdPrice.toFixed(2)} USD`;
                } else {
                    convertedPrice = usdPrice * selectedRate;
                    product.convertedPrice = `${convertedPrice.toFixed(2)} ${selectedOption.textContent}`;
                }
            }

            // Now update the DOM element for each product based on productNumber
            const productElement = document.querySelector(`[data-product-number="${product.productNumber}"]`);
            if (productElement) {
                const priceElement = productElement.querySelector('.product-price');
                if (priceElement) {
                    priceElement.textContent = product.convertedPrice;
                }
            }
        } else {
            console.warn('USD Price not set for product:', product);
        }
    });

    // Update the storage with the latest converted prices
    if (loggedInUser) {
        // Save the updated prices back to the user's account in local storage
        const storedAccounts = JSON.parse(localStorage.getItem('account')) || [];
        const userIndex = storedAccounts.findIndex(user => user.username === JSON.parse(loggedInUser).username);

        if (userIndex !== -1) {
            storedAccounts[userIndex].addedProducts = addedProducts; // Update products
            localStorage.setItem('account', JSON.stringify(storedAccounts)); // Save updated account data
        }
    } else {
        // Update local storage for non-logged-in users
        localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
    }
}

window.addEventListener('load', () => {
    clearAddedProductsAndCheckCart();
});

function clearAddedProductsAndCheckCart() {
    // Retrieve addedProducts and cartProducts from local storage
    const addedProducts = JSON.parse(localStorage.getItem('addedProducts')) || [];
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

    console.log("Initial addedProducts:", addedProducts);
    console.log("Initial cartProducts:", cartProducts);

    // If there are no added products, we clear the addedProducts storage
    if (addedProducts.length === 0) {
        console.log("No products found in addedProducts to clear.");
        localStorage.removeItem('addedProducts'); // Ensure it's cleared
        return;
    }

    // Filter out products from cartProducts that match productNumber in addedProducts
    const updatedCartProducts = cartProducts.filter(cartProduct => {
        const foundInAddedProducts = addedProducts.some(addedProduct => {
            // Log the values being compared
            console.log(`Checking cart product number '${cartProduct.number}' against addedProduct productNumber '${addedProduct.productNumber}'`);

            // Ensure both values are compared as numbers
            const cartNumber = Number(cartProduct.number);
            const addedProductNumber = Number(addedProduct.productNumber);

            // Check if they are equal
            return cartNumber === addedProductNumber;
        });
        
        // Log the result of the check
        console.log(`Product ${cartProduct.number} found in addedProducts: ${foundInAddedProducts}`);
        return !foundInAddedProducts; // Remove products found in addedProducts
    });

    console.log("Updated cartProducts after filtering:", updatedCartProducts);

    // Update cartProducts in local storage
    localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));

    // Clear addedProducts from local storage since the process is complete
    localStorage.removeItem('addedProducts');
    console.log("addedProducts storage has been cleared.");

    // Check final results
    console.log("Final cartProducts in storage:", JSON.parse(localStorage.getItem('cartProducts')));
    loadCartFromLocalStorage()
    updateCartCalc()
}

// Currency handling function
function currency() {
    fetchCurrencyData().then(exchangeRates => {
        populateCurrencyOptions(exchangeRates);
        const currencySelect = document.getElementById('currency');
        const selectedOption = currencySelect.options[currencySelect.selectedIndex];
        updateDropdownExchangeRate(selectedOption);
        convertPrices(selectedOption);
        renderProducts();
        initializePriceInputs();
    
        currencySelect.addEventListener('change', () => {
            const selectedOption = currencySelect.options[currencySelect.selectedIndex];
            localStorage.setItem('selectedCurrency', selectedOption.value); // Store the selected currency
            updateDropdownExchangeRate(selectedOption);
            convertPrices(selectedOption);
            renderProducts();
            initializePriceInputs(); 
            syncCartPricesWithCurrency();
            saveCartToLocalStorage();
        });

        // Add event listeners to currency buttons (USD, SAR)
        document.querySelectorAll('.specificCurrencies button').forEach(button => {
            button.addEventListener('click', function () {
                const selectedCurrency = this.getAttribute('data-currency');
                const selectedRate = this.getAttribute('data-rate');
                const currencySpan = this.parentElement.querySelector('.exchangeRate'); // Find the associated exchange rate span

                // Update the exchange rate for the specific button
                currencySpan.textContent = `1 USD = ${parseFloat(selectedRate).toFixed(2)} ${selectedCurrency}`;

                // Simulate dropdown selection
                const selectedOption = currencySelect.querySelector(`option[value="${selectedCurrency}"]`);
                if (selectedOption) {
                    currencySelect.value = selectedCurrency;
                    localStorage.setItem('selectedCurrency', selectedCurrency); // Store the selected currency

                    // Trigger the change event to update the UI and prices accordingly
                    currencySelect.dispatchEvent(new Event('change'));
                }
            });
        });
    });
}
