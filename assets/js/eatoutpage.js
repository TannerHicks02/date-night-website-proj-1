/* VARIABLES */
const search = document.querySelector('.search');
const postal = Number(localStorage.getItem('zipcode')) || 58504
const mapDiv = document.querySelector(".map");
const restaurants = document.querySelector("#restaurant-cards")
const APIKey = "AIzaSyDJLuOe9XH4mw4Kal20XkEmhwlGDNhRsYE";
let map;

/* FUNCTIONS */
/* Get map of input zipcode */
function getInputMap() {
    const cuisine = document.querySelector('#cuisine');
    console.log(cuisine)
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${postal}&key=${APIKey}`;

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
        type: ['restaurant']
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length && i < 10; i++) {
            createMarker(results[i]);
            createCard(results[i]);
        }
        } else {
            console.error("Places service was not successful for the following reason: " + status);
        }
    });
}

/* Create a card for each restaurant */
function createCard(place) {
    console.log(place);

    // Create
    const card = document.createElement("div");
    const cardTitle = document.createElement('h3');
    const open = document.createElement("p");
    const rating = document.createElement("p");
    const location = document.createElement("p");

    // Build
    card.classList.add('rest-cards');
    cardTitle.textContent = place.name;
    // open.textContent = isOpen(place.opening_hours.open_now);
    rating.textContent =  "⭐" + place.rating;
    location.textContent = place.vicinity;

    // Place
    restaurants.appendChild(card);
    card.appendChild(cardTitle);
    // card.appendChild(open);
    card.appendChild(rating);
    card.appendChild(location);
}

/* Add markers on map for restaurants */
function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
  
    const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
    });
  
    google.maps.event.addListener(marker, 'click', () => {
        const infowindow = new google.maps.InfoWindow();
        infowindow.setContent(place.name || '');
        infowindow.open(map, marker);
    });
}

/* Check if restaurant is open */
function isOpen (open) {
    if (open) {
        return "Open now"
    }
    return "Closed";
}

/* EVENT LISTENERS */
search.addEventListener('click', getInputMap)

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
