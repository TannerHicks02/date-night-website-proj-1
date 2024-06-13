// DEPENDENCIES
const nightOutButton = document.querySelector("#nightOut-button");
const eatOutButton = document.querySelector("#eatOut-button");
const zipInput = document.querySelector('#zip-input');
const submitButton = document.querySelector('#zipcode-submit-button');
const warning = document.querySelector('#warning');

// EVENT LISTENERS
eatOutButton.addEventListener('click', function (event) {
    event.preventDefault();
    // window.location.href = "eatout.html";
});

nightOutButton.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "nightout.html";
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