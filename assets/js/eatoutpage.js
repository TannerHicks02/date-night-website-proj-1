/* VARIABLES */
const search = document.querySelector('.search');

/* FUNCTIONS */
function initMap () {
    // Create the a map for the location
    const city = { lat: -33.866, lng: 151.196 };
    const map = new google.maps.Map(document.querySelector(".map"), {
        center: city,
        zoom: 17,
        mapId: "8d193001f940fde3",
    });

    // Create the places service.
    //const service = new google.maps.places.PlacesService(map);
  
    // Perform a nearby search.
    // service.nearbySearch(
    //     {location: city, radius: 500, type: "store"},
    //     (results, status, pagination) => {
    //         if (status !== "OK" || !results) return;
  
    //         addPlaces(results, map);
    //         moreButton.disabled = !pagination || !pagination.hasNextPage;
    //         if (pagination && pagination.hasNextPage) {
    //             getNextPage = () => {
    //                 // Note: nextPage will call the same handler function as the initial call
    //                 pagination.nextPage();
    //             };
    //         }
    //     },
    // );
}

// function handleSearch () {
//     console.log("Beginning API call...")

//     const city = new google.maps.LatLng(-33.867, 151.195);

//     map = new google.maps.Map(document.getElementById('map'), {
//         center: city,
//         zoom: 15
//     })

//     var request = {
//         location: city,
//         radius: '500',
//         type: ['restaurant']
//     }

//     service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, callback);
// }

// function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         for (var i = 0; i < results.length; i++) {
//         createMarker(results[i]);
//         }
//     }
// }

/* EVENT LISTENERS */
//search.addEventListener('click', handleSearch)

window.initMap = initMap;