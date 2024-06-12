/* VARIABLES */
const search = document.querySelector('.search');
const postal = document.querySelector('#location');
const mapDiv = document.querySelector(".map");
const APIKey = "AIzaSyDJLuOe9XH4mw4Kal20XkEmhwlGDNhRsYE";
let map;

/* FUNCTIONS */
/* Get map of input zipcode */
function getInputMap() {
    const postalCode = postal.value;  // Get user postal code
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${APIKey}`;

    // Call to Geocoder API
    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
        if (data.status === "OK") {
            const location = data.results[0].geometry.location;  // latitude/longitude coordinates

            map = new google.maps.Map(mapDiv, {  // create map using lat/long coordinates
                center: location,
                zoom: 17,
                mapId: "8d193001f940fde3",
            });

            findRestaurants(location);  // Get restaurants on map
        } else {
            console.error("Geocode was not successful for the following reason: " + data.status);
        }
        })
        .catch(error => console.error("Error fetching geocode data: ", error));
}

/* Find restaurants near location */
function findRestaurants (location) {
    const request = {  // Parameters for restaurants
        location: location,
        radius: '16000',
        type: ['restaurant'],
        //keyword: 'thai'
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length && i < 5; i++) {
            console.log(results[i])
            createCard(results[i]);
            createMarker(results[i]);
        }
        } else {
            console.error("Places service was not successful for the following reason: " + status);
        }
    });
}

/* Add card for each result */
function createCard (restaurant) {

}

/* Add markers on map for restaurants */
function createMarker(restaurant) {
    if (!restaurant.geometry || !restaurant.geometry.location) return;
  
    const marker = new google.maps.Marker({
        map,
        position: restaurant.geometry.location,
    });
  
    google.maps.event.addListener(marker, 'click', () => {
        const infowindow = new google.maps.InfoWindow();
        infowindow.setContent(restaurant.name || '');
        infowindow.open(map, marker);
    });
}

/* Create map according to search request */
function handleSearch () {
    const postal = document.querySelector('#location');
    console.log("Handling search request...", postal)
    getInputMap()
    postal.value = "";
}

/* EVENT LISTENERS */
search.addEventListener('click', handleSearch)

/* INITIALIZERS */
/* Initiialize default map */
window.initMap = initMap;
function initMap () {
    const temp = { lat: -33.866, lng: 151.196 };  // Defaults to Metcalfe Park, Sydney, Australia 
    map = new google.maps.Map(mapDiv, {
        zoom: 18,
        center: temp,
        mapId: "DEFAULT_MAP",
    });
}
