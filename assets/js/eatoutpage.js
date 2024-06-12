/* VARIABLES */
const search = document.querySelector('.search');
const postal = document.querySelector('#location');

/* FUNCTIONS */
function initMap () {
    // Create the a map for the location
    const city = { lat: -33.866, lng: 151.196 };
    const postalCode = postal.value;
    console.log("In initMap...", postalCode);
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=AIzaSyDJLuOe9XH4mw4Kal20XkEmhwlGDNhRsYE`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
        if (data.status === "OK") {
            const city = data.results[0].geometry.location;
            const map = new google.maps.Map(document.querySelector(".map"), {
            center: city,
            zoom: 17,
            mapId: "8d193001f940fde3",
            });
        } else {
            console.error("Geocode was not successful for the following reason: " + data.status);
        }
        })
        .catch(error => console.error("Error fetching geocode data: ", error));
}

function handleSearch () {
    const postal = document.querySelector('#location');
    console.log("Handling search request...", postal)
    initMap()
    postal.value = "";
}

/* EVENT LISTENERS */
search.addEventListener('click', handleSearch)

window.initMap = initMap;
