function validate() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const age = document.getElementById('age').value;
    const contact = document.getElementById('contact').value;
    const firstName = document.getElementById('fname').value;
    const lastName = document.getElementById('lname').value;
    const emails = document.getElementById('email').value;

    console.log('Validation function called');

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

    function validateRequiredFields() {
        return firstName.trim() !== '' && lastName.trim() !== '' && emails.trim() !== '' && age.trim() !== '';
    }

    // function validateEmail(email){
    //     const regExp = /+@+/i;
    //     return regExp.exec(email);

    // }

    const isFormValid = isPasswordEqual(password, confirmPassword) &&
        validatePassword(password) &&
        validateAge(age) &&
        validateContact(contact) &&
        validateRequiredFields();
        
        //&& validateEmail(email);

    document.getElementById('button').disabled = !isFormValid;
    if(isFormValid){
        alert("validated");
    }
}
