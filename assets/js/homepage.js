// DEPENDENCIES
const nightOutButton = document.querySelector("#nightOut-button");
const eatOutButton = document.querySelector("#eatOut-button");
const zipInput = document.querySelector('#zip-input');
const submitButton = document.querySelector('#submit-button');

console.log("scripts loaded");

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
        displayMessage('error', 'Enter ZIP Code.');
    }
    else {
        localStorage.setItem('zipCode', zipCode);
    }

    console.log(localStorage);
    window.location.href = "eatout.html";
});