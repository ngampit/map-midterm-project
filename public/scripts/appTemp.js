let latitude = 49;
let longitude = 123;
let contentString = "hello world"
const markers = [];

let map_id = 2;

function getMarker(map) {
  $.ajax({
    type: "GET",
    url: window.location.pathname + "/markers",
  })
    .then(markers => {
      //result here
      markers.map((marker) => {
        const gMarker = new google.maps.Marker({
          position: {lat: marker.lat, lng: marker.long},
          map: map
        });

        const infoWindow = new google.maps.InfoWindow({
          content: marker.description,
        });

        gMarker.addListener("click", () => {
          infoWindow.open(map, gMarker);
        });
        return gMarker;
      });
    });
}
  // Adds a marker to the map and push to the array.
function addMarker(map, location) {
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  const infoWindow = new google.maps.InfoWindow({
    content: 'contentString',
  });
  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
  $.ajax({
    type: "POST",
    url: window.location.pathname + '/create',
    data: {lat: location.lat(), lng: location.lng()},
  });
  markers.push(marker);
  // console.log(markers)
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: latitude,
      lng: longitude,
      zoom: 13
    },
    zoom: 8,
  });

  getMarker(map);

  // console.log("marker", markers)
  // This event listener will call addMarker() when the map is clicked.
  // for (let marker of markers) {

  map.addListener("click", (event) => {
    addMarker(map, event.latLng);
  });

  return map;
}

$(() => {
  // let markers = <%=markers%>



  map = initMap();
})


