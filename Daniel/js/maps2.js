// Global variables
var myLoc;
var toolboxMarker;
var bookMarker;
var gameMarker
var toolbox = "Images/toolbox.png";
var books = "Images/books.png"
var games = "Images/games.png";

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 60, lng: 20},
    zoom: 5
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var myPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      myLoc = new google.maps.Marker({
        position: myPos,
        // id: 'marker',
        map: map,
      });
      var tbPos = {
        lat: myPos.lat + 0.0002,
        lng: myPos.lng + 0.0009,
      };
      toolboxMarker = new google.maps.Marker({
        position: tbPos,
        icon: toolbox,
        map: map,
      });
      var bPos = {
        lat: myPos.lat + 0.00025,
        lng: myPos.lng + 0.00012,
      };
      bookMarker = new google.maps.Marker({
        position: bPos,
        icon: books,
        map: map,
      });
      var gPos = {
        lat: myPos.lat - 0.00015,
        lng: myPos.lng + 0.0010,
      };
      gameMarker = new google.maps.Marker({
        position: gPos,
        icon: games,
        map: map,
      });
      console.log(gameMarker);
      map.setZoom(17);
      map.setCenter(myPos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  function markerDetails(marker){
    console.log("Latitude: " + marker.pos.lat);
    console.log("Latitude: " + marker.pos.lng);
  }
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
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
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
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
    map.fitBounds(bounds);
  });
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }
