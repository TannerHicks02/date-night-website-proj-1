// DEPENDENCIES
const eatInButton = document.querySelector("#nightOut-button");
const eatOutButton = document.querySelector("#eatOut-button");

console.log("scripts loaded");

// EVENT LISTENERS
eatOutButton.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "eatout.html";
});

eatInButton.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = "nighOut.html";
});