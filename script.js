/**
       * @license
       * Copyright 2019 Google LLC. All Rights Reserved.
       * SPDX-License-Identifier: Apache-2.0
       */
let map;
let marker;
let geocoder;
let responseDiv;
let response;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
    mapTypeControl: false,
    streetViewControl: false, // Disable Street View control
  });
  geocoder = new google.maps.Geocoder();
  
  // const inputText = document.createElement("input");

  // inputText.type = "text";
  // inputText.placeholder = "Enter a location";

  const submitButton = document.createElement("input");

  submitButton.type = "button";
  submitButton.value = "Geocode";
  submitButton.classList.add("button", "button-primary");

  const clearButton = document.createElement("input");

  clearButton.type = "button";
  clearButton.value = "Clear";
  clearButton.classList.add("button", "button-secondary");
  // response = document.createElement("pre");
  // response.id = "response";
  // response.innerText = "";
  // responseDiv = document.createElement("div");
  // responseDiv.id = "response-container";
  // responseDiv.appendChild(response);

  // const instructionsElement = document.createElement("p");

  // instructionsElement.id = "instructions";
  // instructionsElement.innerHTML =
  //   "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
  // map.controls[google.maps.ControlPosition.LEFT_TOP].push(
  //   instructionsElement
  // );
  map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
  marker = new google.maps.Marker({
    map,
  });
  map.addListener("click", (e) => {
    geocode({ location: e.latLng });
  });
  submitButton.addEventListener("click", () =>
    geocode({ address: inputText.value })
  );
  clearButton.addEventListener("click", () => {
    clear();
  });
  clear();
}

function clear() {
  marker.setMap(null);
}

function geocode(request) {
clear();
geocoder
.geocode(request)
.then((result) => {
const { results } = result;
const location = results[0].geometry.location;
const addressComponents = results[0].address_components;

// Extract city and country
let city = "";
let country = "";

addressComponents.forEach(component => {
  if (component.types.includes("locality")) {
    city = component.long_name;
  }
  if (component.types.includes("country")) {
    country = component.long_name;
  }
});

// Log results
console.log(`Latitude: ${location.lat()}, Longitude: ${location.lng()}`);
console.log(`City: ${city}, Country: ${country}`);

// Update map and response
map.setCenter(location);
marker.setPosition(location);
marker.setMap(map);
// response.innerText = JSON.stringify(result, null, 2);
})
.catch((e) => {
alert("Geocode was not successful for the following reason: " + e);
});
}



window.initMap = initMap;