// first page loading

// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(`#location-button`).click(()=>{
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position);
  }}
  else { console.log('geolocation is not supported')}
}






// API for pan to current location

// let map, infoWindow;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6,
//   });
//   infoWindow = new google.maps.InfoWindow();
// }


