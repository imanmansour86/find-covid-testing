// Upon page load, get the users location
// if location services is enabled, it will show a map of their area
// if location services are not enabled, it will show a generic map with a box that will allow them to 1 of 12 states
// Next, the user will input their zip code
// CHECK: does google take zip code as a parameter or do we need to convert zip to lat/lon
// We'll store the users location as lat/lon in a global variable
// We'll take the users lat/lon and input it into the COVID api/url
// The COVID api will return testing locations around that lat/lon

// important for being able to use foundation js functions
$(document).foundation();

//test COVID api
let covidApiKey = "K39YR7g51qETSXocQ0uyEDBxgxXWFZSILwgtqcrNaP8";
let covidAppId = "ikc0ro0Fv33Mt3V90p6Y";

let covidApiUrl =
  "https://discover.search.hereapi.com/v1/discover?apikey=" +
  covidApiKey +
  "&q=Covid&at=30.22,-92.02&limit=10";

function getCovidData() {
  $.ajax({
    url: covidApiUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}

getCovidData();

//Initialize and add the map

let map, infoWindow, geocoder;

//function to handle display lat and lon from address
function codeAddress(address) {
  geocoder.geocode({ address: address }, function (results, status) {
    console.log("results", results);
    if (status == google.maps.GeocoderStatus.OK) {
      //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
  $(".reveal").foundation("close");
}

$("#state-location").on("click", function () {
  var address = $("#state").val();
  codeAddress(address);
});

$("#zip-location").on("click", function () {
  var address = $("#zip").val();
  codeAddress(address);
});

function mapMaker() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    styles: mapStyleColors,
  });
  geocoder = new google.maps.Geocoder();
  infoWindow = new google.maps.InfoWindow();

  // Add Get Tested button and position it at the bottom
  const locationBottomBtn = document.createElement("button");
  locationBottomBtn.textContent = "Get Tested";
  locationBottomBtn.classList.add("button");
  locationBottomBtn.dataset.open = "my-modal";
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(
    locationBottomBtn
  );

  const showCurrentLocation = document.getElementById("my-location");
  showCurrentLocation.addEventListener("click", () => {
    if (navigator.geolocation) {
      console.log("test");

      $(".reveal").foundation("close");
      console.log("test", $(".reveal"));

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("current position", pos);

          map.setCenter(pos);
          //mark current location on map
          var marker = new google.maps.Marker({
            map: map,
            position: pos,
          });
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation

      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

let mapStyleColors = [
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
      {
        color: "#f49f53",
      },
    ],
  },
  {
    featureType: "landscape",
    stylers: [
      {
        color: "#f9ddc5",
      },
      {
        lightness: -7,
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        color: "#813033",
      },
      {
        lightness: 43,
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        color: "#645c20",
      },
      {
        lightness: 38,
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        color: "#1994bf",
      },
      {
        saturation: -69,
      },
      {
        gamma: 0.99,
      },
      {
        lightness: 43,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#f19f53",
      },
      {
        weight: 1.3,
      },
      {
        visibility: "on",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "poi.business",
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        color: "#645c20",
      },
      {
        lightness: 39,
      },
    ],
  },
  {
    featureType: "poi.school",
    stylers: [
      {
        color: "#a95521",
      },
      {
        lightness: 35,
      },
    ],
  },
  {},
  {
    featureType: "poi.medical",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#813033",
      },
      {
        lightness: 38,
      },
      {
        visibility: "off",
      },
    ],
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {
    elementType: "labels",
  },
  {
    featureType: "poi.sports_complex",
    stylers: [
      {
        color: "#9e5916",
      },
      {
        lightness: 32,
      },
    ],
  },
  {},
  {
    featureType: "poi.government",
    stylers: [
      {
        color: "#9e5916",
      },
      {
        lightness: 46,
      },
    ],
  },
  {
    featureType: "transit.station",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    stylers: [
      {
        color: "#813033",
      },
      {
        lightness: 22,
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        lightness: 38,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#f19f53",
      },
      {
        lightness: -10,
      },
    ],
  },
  {},
  {},
  {},
];
