document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('personal-information');
    const submitButton = document.getElementById('submit-button');

    const errorMessages = {
        requiredField: "This field is required",
        emails: "Please enter valid email addresses.",
        password: "Password must be at least 8 characters long, with both upper and lower case letters, and a number.",
        confirmPassword: "Passwords do not match.",
        contact: "Contact number must be 11 digits.",
        age: "Age must be between 18 and 151.",
        ageNegative:"Age is negative"
    };

    function isPasswordEqual(password, confirmPassword) {
        return password === confirmPassword;
    }

    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
    }

    function validateAge(age) {
        const ageValue = parseInt(age, 10);
        return ageValue >= 18 && ageValue <= 151;
    }

    function ageInvalid(age) {
        const ageValue = parseInt(age, 10);
        return ageValue > 0 ;
    }

    function validateContact(contact) {
        return /^\d{11}$/.test(contact);
    }

    function validateEmails(emails) {
        const emailList = emails.split(',').map(email => email.trim());
        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
        return emailList.every(email => emailPattern.test(email));
    }

    function showErrorMessage(input, message) {
        const errorSpan = input.nextElementSibling;
        errorSpan.innerText = message;
    }

    function clearErrorMessage(input) {
        const errorSpan = input.nextElementSibling;
        errorSpan.innerText = '';
    }

    function validateField(event) {
        const input = event.target;
        const value = input.value.trim();
        const id = input.id;

        switch (id) {
            case 'fname':
            case 'lname':
                if (value === '') {
                    showErrorMessage(input, errorMessages.requiredField);
                } else {
                    clearErrorMessage(input);
                }
                break;
            case 'email':
                if (!validateEmails(value)) {
                    showErrorMessage(input, errorMessages.emails);
                } else {
                    clearErrorMessage(input);
                }
                break;
            case 'password':
                if (!validatePassword(value)) {
                    showErrorMessage(input, errorMessages.password);
                } else {
                    clearErrorMessage(input);
                }
                break;
            case 'confirmPassword':
                const passwordValue = document.getElementById('password').value;
                if (!isPasswordEqual(passwordValue, value)) {
                    showErrorMessage(input, errorMessages.confirmPassword);
                } else {
                    clearErrorMessage(input);
                }
                break;
            case 'contact':
                if (!validateContact(value)) {
                    showErrorMessage(input, errorMessages.contact);
                } else {
                    clearErrorMessage(input);
                }
                break;
            case 'age':
                if (!validateAge(value)) {
                    showErrorMessage(input, errorMessages.age);
                } else {
                    clearErrorMessage(input);
                }
                break;
            case 'ageNegative':
                if (ageInvalid(value)) {
                    showErrorMessage(input, errorMessages.ageNegative);
                } else {
                    clearErrorMessage(input);
                }
                break;
        }

        validateForm();
    }

    function validateForm() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const age = document.getElementById('age').value;
        const contact = document.getElementById('contact').value;
        const firstName = document.getElementById('fname').value;
        const lastName = document.getElementById('lname').value;
        const emails = document.getElementById('email').value;

        const isFormValid = isPasswordEqual(password, confirmPassword) &&
            validatePassword(password) &&
            validateAge(age) && ageInvalid(age)
            validateContact(contact) &&
            firstName.trim() !== '' && lastName.trim() !== '' &&
            validateEmails(emails);

        submitButton.disabled = !isFormValid;
    }

    const inputFields = form.querySelectorAll('input');
    inputFields.forEach(input => {
        input.addEventListener('focus', function () {
            clearErrorMessage(input); 
        });
        input.addEventListener('blur', validateField); 
    });

    form.addEventListener('submit', function (event) {
        if (!submitButton.disabled) {
            alert("Form validated successfully!");
        }
    });
});
