document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('personal-information');
    const submitButton = document.getElementById('submit-button');

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

    function validateContact(contact) {
        return /^\d{11}$/.test(contact);
    }

    function validateRequiredFields(firstName, lastName, emails, age) {
        return firstName.trim() !== '' && lastName.trim() !== '' && emails.trim() !== '' && age.trim() !== '';
    }

    function validateEmails(emails) {
        const emailList = emails.split(',').map(email => email.trim());
        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/;
        return emailList.every(email => emailPattern.test(email));
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
            validateAge(age) &&
            validateContact(contact) &&
            validateRequiredFields(firstName, lastName, emails, age) &&
            validateEmails(emails);

        submitButton.disabled = !isFormValid;
    }

    form.addEventListener('input', validateForm);

    form.addEventListener('submit', function (event) {
        if (!submitButton.disabled) {
            alert("Form validated successfully!");
        }
    });
});
