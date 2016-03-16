// var locateUser = require('./../js/locateUser-interface.js').locateUser;
var initMap = require('./../js/initMap-interface.js').initMap;

function geolocationError(positionError) {
  alert(positionError);
}

$(document).ready(function() {
$("#showMap").append(locateUser);
});

function locateUser(){
  if (navigator.geolocation){
    var positionOptions = {
      enablehighAccuracy: true,
      timeout: 10 * 1000
    };
    navigator.geolocation.getCurrentPosition(initMap, geolocationError, positionOptions);
  }
  else {
    alert("Your browser doesn't support the Geolocation API");
  }
}

var initMap = function(position) {
 var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 var myOptions = {
    center: userLatLng,
    zoom: 8,
    mapTypeId : google.maps.MapTypeId.SATELLITE
    };

var mapObject = new google.maps.Map(document.getElementById('showMap'), myOptions);

  new google.maps.Marker({
    map: mapObject,
    position: userLatLng
  });
  console.log(mapObject);

  // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        mapObject.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        mapObject.addListener('bounds_changed', function() {
          searchBox.setBounds(mapObject.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: mapObject,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          mapObject.fitBounds(bounds);
        });

  // return $("#showMap").html(initMap);
};
