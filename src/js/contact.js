"use strict";
const contactForm = document.getElementById("contactForm"),
    firstName = document.getElementById("firstName"),
    lastName = document.getElementById("lastName"),
    contactEmail = document.getElementById("contactEmail"),
    subject = document.getElementById("subject"),
    message = document.getElementById("message");

// Email Check
const emailContact = (input) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const testEmail = input.value.trim();

    if (re.test(testEmail)) {
        const contactEmail = testEmail.toLowerCase();
        localStorage.setItem('contactEmail', contactEmail);

        return true;

    } else {
        invalidEmail();
        console.log('Contact Not Pass');
    }
}
// Length Check
const lengthContact = (input, min) => {
    const testLength = input.value.trim();
    
    if (testLength.length === 0) {
        invalidEmail();

    } else if (testLength.length < min) {
        invalidEmail();

    } else {
        return true;
    }
}
// Error
const invalidEmail = () => {
    contactEmail.style.borderColor = "red";
    $('#contactEmail').addClass('error-shaking');

    contactEmail.addEventListener('animationend', () => {
        $('#contactEmail').removeClass('error-shaking');
    });
}
// store data to localStorage
const storeData = () => {
    let fName = firstName.value,
        lname = lastName.value,
        heading = subject.value,
        messages = message.value;
    const objEmail = localStorage.getItem('contactEmail');

    const objUserData = {
        fname: fName,
        lname: lname,
        email: objEmail,
        heading: heading,
        message: messages
    }

    const jsonUserData = JSON.stringify(objUserData);
    localStorage.setItem('userData', jsonUserData);
    localStorage.removeItem('contactEmail');

    console.log(objUserData);
}

// Submit
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailContact(contactEmail),
        maillength = lengthContact(contactEmail, 6);

    switch (email && maillength) {
        case true:
            storeData();
            console.log('Contact Pass');
            break;
        default:
            break;
    }
});

// Local Storage Clear
 window.addEventListener('unload', () => {
    localStorage.clear();
});