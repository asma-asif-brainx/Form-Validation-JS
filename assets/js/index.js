document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('personal-information');
    const submitButton = document.getElementById('submit-button');

    const errorMessages = {
        requiredField: "This field is required",
        emails: "Please enter valid email addresses.",
        emailDuplicate: "Duplicate emails not allowed.",
        password: "Password must be at least 8 characters long, with both upper and lower case letters, and a number.",
        confirmPassword: "Passwords do not match.",
        contact: "Contact number must be 11 digits or 12 digits with a leading plus sign (+).",
        age: "Age must be between 18 and 151.",
        ageNegative: "Invalid age number; age cannot be negative.",
        name: "Name must only contain letters (a-z, A-Z)."
    };

    const validateName = value => /^[a-zA-Z]+$/.test(value);

    const validatePassword = value => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /\d/.test(value);
        return value.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
    };

    const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword;

    const validateAge = value => {
        const ageValue = parseInt(value, 10);
        return ageValue >= 18 && ageValue <= 151 && ageValue >= 0;
    };

    const validateContact = value => {
        const contactPattern = /^\+?\d{11,12}$/;
        return contactPattern.test(value) && (value.startsWith('+') ? value.length === 12 : value.length === 11);
    };

    const validateEmails = value => {
        const emailList = value.split(',').map(email => email.trim());
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const uniqueEmails = new Set(emailList);
        const hasDuplicates = emailList.length !== uniqueEmails.size;
        const allEmailsValid = emailList.every(email => emailPattern.test(email));
        return { hasDuplicates, allEmailsValid };
    };

    const validators = {
        fname: value => validateName(value) ? '' : errorMessages.name,
        lname: value => validateName(value) ? '' : errorMessages.name,
        email: value => {
            const { hasDuplicates, allEmailsValid } = validateEmails(value);
            if (hasDuplicates) return errorMessages.emailDuplicate;
            if (!allEmailsValid) return errorMessages.emails;
            return '';
        },
        password: value => validatePassword(value) ? '' : errorMessages.password,
        confirmPassword: value => {
            const passwordValue = document.getElementById('password').value;
            return validateConfirmPassword(passwordValue, value) ? '' : errorMessages.confirmPassword;
        },
        contact: value => validateContact(value) ? '' : errorMessages.contact,
        age: value => {
            const ageValue = parseInt(value, 10);
            return ageValue < 0 ? errorMessages.ageNegative : (validateAge(value) ? '' : errorMessages.age);
        }
    };

    const showErrorMessage = (input, message) => {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.tagName === 'SPAN') {
            errorSpan.innerText = message;
        }
    };

    const clearErrorMessage = input => {
        const errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.tagName === 'SPAN') {
            errorSpan.innerText = '';
        }
    };

    const validateField = event => {
        const input = event.target;
        const value = input.value.trim();
        const id = input.id;

        if (requiredFields.includes(id) && value === '') {
            showErrorMessage(input, errorMessages.requiredField);
            return;
        }

        const errorMessage = validators[id] ? validators[id](value) : '';
        if (errorMessage) {
            showErrorMessage(input, errorMessage);
        } else {
            clearErrorMessage(input);
        }

        validateForm();
    };

    const validateForm = () => {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const age = document.getElementById('age').value;
        const contact = document.getElementById('contact').value;
        const firstName = document.getElementById('fname').value;
        const lastName = document.getElementById('lname').value;
        const emails = document.getElementById('email').value;

        const { hasDuplicates, allEmailsValid } = validateEmails(emails);

        const isFormValid = validateConfirmPassword(password, confirmPassword) &&
            validatePassword(password) &&
            validateAge(age) &&
            validateContact(contact) &&
            validateName(firstName) &&
            validateName(lastName) &&
            !hasDuplicates &&
            allEmailsValid;

        submitButton.disabled = !isFormValid;
    };

    const requiredFields = ['fname', 'lname', 'age', 'email'];
    const inputFields = form.querySelectorAll('input');
    inputFields.forEach(input => {
        input.addEventListener('focus', () => clearErrorMessage(input));
        input.addEventListener('blur', validateField);
    });

    form.addEventListener('submit', event => {
        if (submitButton.disabled) {
            event.preventDefault();
            alert("Please correct the errors in the form.");
        } else {
            alert("Form validated successfully!");
        }
    });
});
