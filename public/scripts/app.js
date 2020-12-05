// first page loading

$(() => {

// let markers = [];
// let map;
// let latitude = <%=lat%>;
// let longitude = <%=lng%>;
// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: latitude, lng: longitude },
//     zoom: 8,
//   });
//    // This event listener will call addMarker() when the map is clicked.
//    map.addListener("click", (event) => {

// //    console.log(event.latLng.lat())
// //    console.log(event.latLng.lng())
//     addMarker(event.latLng);

//   });
// }
//       // Adds a marker to the map and push to the array.
//   function addMarker(location) {
//   const marker = new google.maps.Marker({
//     position: location,
//     map: map
//   });
//   markers.push(marker);
//   let myData = {};
// }
//   $.ajax({
//     method: "POST",
//     url: "/api/widgets/:map_id/create/:markerId",
//     data : myData
//   }).done((users) => {
//     // for(user of users) {    // original
//     //   $("<div>").text(user.name).appendTo($("body")); }  // original


//   });;
});





// let map, infoWindow;

// function initMap() {
//   position = { lat: -34.397, lng: 150.644 };
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: position,
//     zoom: 10,
//   });
//   const marker = new google.maps.Marker({
//     // The below line is equivalent to writing:
//     // position: new google.maps.LatLng(-34.397, 150.644)
//     position: position,
//     map: map,
//   });
//   infoWindow = new google.maps.InfoWindow();
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           marker.setPosition(pos);
//           infoWindow.setPosition(pos);
//           infoWindow.setContent("Location found.");
//           infoWindow.open(map);
//           map.setCenter(pos);
//         },
//         () => {
//           handleLocationError(true, infoWindow, map.getCenter());
//         }
//       );
//     } else {
//       // Browser doesn't support Geolocation
//       handleLocationError(false, infoWindow, map.getCenter());
//     }
// //  });
//}






