// inputs
let emailInput = document.getElementById('email'),
    userNameInput = document.getElementById('name'),
    passwordInput = document.getElementById('password'),
    container = document.getElementsByClassName('container'),
    userNameLogin = document.getElementById('userNameLoginInput'),
    passwordLogin = document.getElementById('passwordLoginInput');

// alerts
let emailAlertSignUp = document.getElementById('email-alert'),
    nameAlertSignUp = document.getElementById('name-alert'),
    passwordAlertSignUp = document.getElementById('password-alert'),
    usernameLoginAlert = document.getElementById('username-login-alert'),
    passwordLoginAlert = document.getElementById('password-login-alert');

// buttons
let signupBtn = document.getElementById('signupBtn'),
    loginBtn = document.getElementById('loginBtn'),
    logout = document.getElementById('logout');

let userContainer = [];


// set local storage
if (localStorage.getItem('user')) {
    userContainer = JSON.parse(localStorage.getItem('user'))

} else {
    userContainer = []
}

for (let i = 0; i < container.length; i++) {
    if (container[i].classList.contains('signUp')) {

        //Validate Email Input
        function emailValid() {
            let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{3,}$/
            if (regex.test(emailInput.value)) {
                emailInput.classList.add('is-valid');
                emailInput.classList.remove('is-invalid');

                emailAlertSignUp.innerHTML = '';
                signupBtn.disabled = false

                return true

            } else {
                emailInput.classList.add('is-invalid');
                emailInput.classList.remove('is-valid')

                emailAlertSignUp.innerHTML = 'Invalid Email Address!'
                signupBtn.disabled = true

                return false
            }
        }
        emailInput.addEventListener('keyup', emailValid)

        // Validate UserName Input
        function nameValid() {
            let regex = /^[A-Z][a-z A-z 0-9]{3,}$/
            if (regex.test(userNameInput.value)) {
                userNameInput.classList.add('is-valid');
                userNameInput.classList.remove('is-invalid');

                nameAlertSignUp.innerHTML = ''
                signupBtn.disabled = false

                return true
            } else {
                userNameInput.classList.add('is-invalid');
                userNameInput.classList.remove('is-valid')

                nameAlertSignUp.innerHTML = 'Username must start with capital letter and contains at least 3 letters'
                signupBtn.disabled = true

                return false
            }
        }
        userNameInput.addEventListener('keyup', nameValid)
        // Validate Password Input
        function passwordValid() {
            let regex = /^[A-Za-z0-9]{8,}$/
            if (regex.test(passwordInput.value)) {
                passwordInput.classList.add('is-valid');
                passwordInput.classList.remove('is-invalid');

                passwordAlertSignUp.innerHTML = ''
                signupBtn.disabled = false

                return true
            } else {
                passwordInput.classList.add('is-invalid');
                passwordInput.classList.remove('is-valid')

                passwordAlertSignUp.innerHTML = 'Password must be 8 charachters at least Cannot contain special charachters'
                signupBtn.disabled = true

                return false
            }
        }
        passwordInput.addEventListener('keyup', passwordValid)

        // Add New User
        function addUser() {
            if (emailValid() && nameValid() && passwordValid()) {
                let user = {
                    email: emailInput.value,
                    name: userNameInput.value,
                    password: passwordInput.value
                }
                userContainer.push(user);
                localStorage.setItem('user', JSON.stringify(userContainer));
                signupBtn.setAttribute('href', 'index.html');
                signupBtn.disabled = false
                console.log(userContainer);
            }
        }
        // Cheak If Email Is Duplicate
        function cheakDuplicatedEmail() {
            if (userContainer.length) {
                userContainer?.forEach(function (user) {
                    if (user.email == emailInput.value) {
                        emailInput.classList.add('is-invalid')
                        emailInput.classList.remove('is-valid')
                        signupBtn.removeAttribute('href')
                        localStorage.clear(`${userContainer.length - 1}`)
                        emailAlertSignUp.innerHTML = 'This Email Already Exist'
                    } else {
                        addUser()
                    }
                })
            } else {
                addUser()
            }
        }

        signupBtn.addEventListener('click', cheakDuplicatedEmail)
    } else if (container[i].classList.contains('login')) {

        // Validate UserName Login
        function nameLoginValidate() {
            let regex = /^[A-Z][a-z A-z 0-9]{3,}$/
            if (regex.test(userNameLogin.value)) {
                userNameLogin.classList.add('is-valid')
                userNameLogin.classList.remove('is-invalid')

                usernameLoginAlert.innerHTML = ''
                return true
            } else {
                userNameLogin.classList.add('is-invalid')
                userNameLogin.classList.remove('is-valid')
                usernameLoginAlert.innerHTML = 'Username must start with capital letter and contains at least 3 letters'
                return false
            }
        }
        userNameLogin.addEventListener('keyup', nameLoginValidate)

        // Validate Password Login
        function passwordLoginValidate() {
            let regex = /^[A-Za-z0-9]{8,}$/
            if (regex.test(passwordLogin.value)) {
                passwordLogin.classList.add('is-valid')
                passwordLogin.classList.remove('is-invalid')

                passwordLoginAlert.innerHTML = ''
                return true
            } else {
                passwordLogin.classList.add('is-invalid')
                passwordLogin.classList.remove('is-valid')
                passwordLoginAlert.innerHTML = 'Password must be 8 charachters at least Cannot contain special charachters'
                return false
            }
        }
        passwordLogin.addEventListener('keyup', passwordLoginValidate)

        // Cheak If Username && Password Is Exist
        function isExist() {
            if (nameLoginValidate() && passwordLoginValidate()) {
                userContainer.forEach(function (user) {
                    if (user.name == userNameLogin.value && user.password == passwordLogin.value) {
                        loginBtn.setAttribute('href', 'welcome.html')
                        console.log(userWelcome);

                        return true
                    } else {
                        loginBtn.removeAttribute('href')
                        passwordLoginAlert.innerHTML = 'Invalid UserName or Password'
                        return false
                    }
                })
            }
        }

        loginBtn.addEventListener('click', isExist)
    } else if (container[i].classList.contains('welcomee')) {
        logout.addEventListener('click', () => logout.setAttribute('href', 'index.html'))
    }
}
