// DEPENDENCIES
const nightOutButton = document.querySelector("#nightOut-button");
const eatOutButton = document.querySelector("#eatOut-button");
const zipInput = document.querySelector('#zip-input');
const zipInput2 = document.querySelector('#zip-input2');
const submitButton = document.querySelector('#zipcode-submit-button');
const submitButton2 = document.querySelector('#zipcode-submit-button2');
const warning = document.querySelector('#warning');
const warning2 = document.querySelector('#warning2');

// EVENT LISTENERS
eatOutButton.addEventListener('click', function (event) {
    event.preventDefault();
    // window.location.href = "eatout.html";
});

nightOutButton.addEventListener('click', function (event) {
    event.preventDefault();
    // window.location.href = "nightout.html";
});

submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    let zipCode = zipInput.value;

    if (zipCode === '') {
        //displayMessage('error', 'Please enter a ZIP Code.');
        warning.textContent = "Please enter a Zipcode"
    }
    else {
        localStorage.setItem('zipCode', zipCode);
        window.location.href = "eatout.html";
    }
});

submitButton2.addEventListener('click', function (event) {
    event.preventDefault();

    let zipCode2 = zipInput2.value;

    if (zipCode2 === '') {
        //displayMessage('error', 'Please enter a ZIP Code.');
        warning2.textContent = "Please enter a Zipcode"
    }
    else {
        localStorage.setItem('zipCode', zipCode2);
        window.location.href = "nightout.html";
    }
});