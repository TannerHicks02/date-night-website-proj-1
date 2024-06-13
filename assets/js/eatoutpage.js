/* VARIABLES */
const search = document.querySelector('.search');
const postal = Number(localStorage.getItem('zipCode')) || 10036;
const mapDiv = document.querySelector(".map");
const restaurants = document.querySelector("#restaurant-cards")
const APIKey = "AIzaSyDJLuOe9XH4mw4Kal20XkEmhwlGDNhRsYE";
let latlong = { lat: -33.866, lng: 151.196 };
let map;

// map.setCenter(lat long)

/* FUNCTIONS */
/* Find restaurants near location according to user input */
function getInputMap() {
    // const cuisine = document.querySelector('#cuisine').value;

    const request = {
        location: latlong,
        radius: document.querySelector('#radius').value,
        type: ['restaurant'],
        //keyword: 'thai'
    }

    console.log(request)
    
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
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const open = document.createElement("p");
    const rating = document.createElement("p");
    const location = document.createElement("p");
    const image = document.createElement('img');

    // Build
    // card.classList.add('rest-cards');
    card.classList.add("card")
    card.setAttribute('style','width: 18rem');

    cardBody.classList.add('card-body');

    cardTitle.classList.add('card-title');
    cardTitle.textContent = place.name;

    open.classList.add('card-text');
    open.textContent = isOpen(place.opening_hours.open_now);

    rating.classList.add('card-text');
    rating.textContent =  "⭐" + place.rating;

    location.classList.add('card-text');
    location.textContent = place.vicinity;

    image.classList.add('card-img-top');
    image.src = place.photos[0].getUrl();



    // Place
    card.appendChild(image);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(open);
    cardBody.appendChild(rating);
    cardBody.appendChild(location);
    card.appendChild(cardBody);
    restaurants.appendChild(card);
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
/* Initiialize default map and all nearby restaurants*/
window.initMap = initMap;
function initMap () {
    const defaultUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${postal}&key=${APIKey}`;
    fetch(defaultUrl)
        .then(response => response.json())
        .then(data => {
        if (data.status === "OK") {
            latlong = data.results[0].geometry.location;  // Set latitude/longitude coordinates

            map = new google.maps.Map(mapDiv, {  // Create map using lat/long coordinates
                center: latlong,
                zoom: 10,
                mapId: "8d193001f940fde3",
            });
    
            findAllRestaurants();  // Get restaurants on map
        } else {
            console.error("Geocode was not successful: " + data.status);
        }
    })
    .catch(error => console.error("Error fetching geocode data: ", error));
}

function findAllRestaurants() {

    const request = {
        location: latlong,
        radius: '8046',
        type: ['restaurant']
    }

    console.log(request)
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length && i < 5; i++) {
                createMarker(results[i]);
                createCard(results[i]);
            }
        } else {
            console.error("Places service was not successful: " + status);
        }
    });
}
