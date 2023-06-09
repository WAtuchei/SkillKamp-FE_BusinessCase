"use strict";
const subForm = document.getElementById("subForm"),
    subEmail = document.getElementById("subEmail");

// Email Check
const emailChecked = (input) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const testEmail = input.value.trim();

    if (re.test(testEmail)) {
        const subEmail = testEmail.toLowerCase();
        localStorage.setItem('subEmail', subEmail);

        console.log(`Subed email is ${subEmail}`);
        return true;

    } else {
        invalidForm();
        console.log('Subed email Not Pass');
    }
}
// Length Check
const lengthChecked = (input, min) => {
    const testLength = input.value.trim();
    
    if (testLength.length === 0) {
        invalidForm();

    } else if (testLength.length < min) {
        invalidForm();

    } else {
        return true;
    }
}
// Error
const invalidForm = () => {
    subEmail.style.borderColor = "red";
    $('#subEmail').addClass('error-shaking');

    subEmail.addEventListener('animationend', () => {
        $('#subEmail').removeClass('error-shaking');
    });
}
// Submit
subForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailChecked(subEmail),
        maillength = lengthChecked(subEmail, 6);

    switch (email && maillength) {
        case true:
            $('#subEmail').remove();
            $('.subBTN').text('Thank you');

            var disableButton = (e) => {
                $('.subBTN').prop('disabled', true);
            };
            $(document).on('click', '.subBTN', disableButton);
            
            break;
        default:
            break;
    }
});

// Local Storage Clear
window.addEventListener('unload', () => {
    localStorage.clear();
})

subEmail.addEventListener('keydown', () => {
    subEmail.style.borderColor = "#282828"
})