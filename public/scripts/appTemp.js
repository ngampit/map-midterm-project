let latitude = 49;
let longitude = 123;
//let contentString = "hello world"
const markers = [];

function getMap() {
  return $.ajax({
    type: "GET",
    url: window.location.pathname + "/json",
  })
  .then(data => {
//    console.log(data);
    const map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: Number(data.center_lat),
        lng: Number(data.center_long),
        zoom: 13
      },
      zoom: 8,
    });
    return map;
  })
}




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

//     Content structure of info Window for the Markers
     let contentString = $("<div class='marker-info'>" + marker.title + "<br></br>" + marker.description + "<br></br>" +
     "<button id = 'remove', name='remove-marker' class='remove-marker btn btn-outline-danger' title='Remove Marker'>Delete</button><br></br></div>");


        // const infoWindow = new google.maps.InfoWindow({
        //   content: contentString,
        // });

        const infoWindow = new google.maps.InfoWindow
        //  console.log("contentString", contentString[0]);
          infoWindow.setContent(contentString[0]);

      gMarker.addListener("click", () => {
      infoWindow.open(map, gMarker);

     var removeBtn  = contentString.find('button.remove-marker')[0];
      google.maps.event.addDomListener(removeBtn, "click", function(event) {
        //call remove_marker function to remove the marker from the map
      remove_marker(gMarker, marker.id);
     });


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

      //Content structure of info Window for the Markers
var contentString = $('<div class="marker-info-win">'+
      '<div class="marker-inner-win"><span class="info-content">'+
      '<label for="title" style="color: #17a2b8;">Marker Title:</label><br>'+
      '<input type="text" id="title" name="title"><br></br>'+
      '<label for="description" style="color: #17a2b8;">Description</label><br>'+
      '<textarea id="description" rows="5" col="30" name="description"></textarea><br><br>'+
      '</span><button name="save-marker" class="save-marker btn btn-outline-success" title="Save">Save Marker</button>'+
      '</span><button name="edit-marker" class="edit-marker btn btn-outline-warning" title="Edit Marker"><i class="fas fa-edit"></i></button>'+
      '</span><button name="remove-marker" class="remove-marker btn btn-outline-danger" title="Remove Marker"><i class="fas fa-times-circle"></i></button>'+
      '</div></div>');



  // const infoWindow = new google.maps.InfoWindow({
  //   content: "New Marker Description",
  // });


  const infoWindow = new google.maps.InfoWindow
//  console.log("contentString", contentString[0]);
  infoWindow.setContent(contentString[0]);

 //Find remove button in infoWindow
  var removeBtn   = contentString.find('button.remove-marker')[0];

//  //Find save button in infoWindow
  var saveBtn   = contentString.find('button.save-marker')[0];

  //add click listner to remove marker button
  google.maps.event.addDomListener(removeBtn, "click", function(event) {
      //call remove_marker function to remove the marker from the map
      remove_marker(marker, marker.id);
   });

  // if(typeof saveBtn !== 'undefined') //continue only when save button is present
  //   {
  //       //add click listner to save marker button
  //       google.maps.event.addDomListener(saveBtn, "click", function(event) {
  //           var mReplace = contentString.find('span.info-content'); //html to be replaced after success
  //           var mName = contentString.find('input.save-name')[0].value; //name input field value
  //           var mDesc  = contentString.find('textarea.save-desc')[0].value; //description input field value
  //           var mType = contentString.find('select.save-type')[0].value; //type of marker

  //           if(mName =='' || mDesc =='')
  //           {
  //               alert("Please enter Name and Description!");
  //           }else{
  //               //call save_marker function and save the marker details
  //               save_marker(marker, mName, mDesc, mType, mReplace);
  //           }
  //       });
  //   }


  google.maps.event.addDomListener(saveBtn, "click", function(event) {
    //call remove_marker function to remove the marker from the map
    const titleVal = $('#title').val();
    const desVal = $('#description').val();
    save_marker(location,titleVal,desVal);
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
  // if(InfoOpenDefault) //whether info window should be open by default
  // {
  //   infoWindow.open(map,marker);
  // };

  markers.push(marker);
  // console.log(markers)
  }

function remove_marker(Marker, markerId) {

  var myData = {del : 'true', markerId}; //post variables
 $.ajax({
    type: "POST",
    url: window.location.pathname + '/delete/marker',
    data: myData,
    success:Marker.setMap(null)
  })
}


function save_marker(location,title,description) {

  $.ajax({
    type: "POST",
    url: window.location.pathname + '/create',
    data: {title, description, lat: location.lat(), lng: location.lng()},
  });
}




function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: latitude,
      lng: longitude,
      zoom: 20
    },
    zoom: 8,
  });

  getMap()
  .then((map)=> {
    map.addListener("click", (event) => {
      addMarker(map, event.latLng);
    });
    getMarker(map)});

}

$(() => {

  map = initMap();
})



