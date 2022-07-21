// var eventInputEl = document.querySelector("#eventname");
// var eventContainerEl = document.querySelector("#event-container");
// var searchEventEl = document.querySelector("#event-search");
// var eventFormEl = document.querySelector("event-form");

// var eventHistory = [];
// var recentEventSearched = "";

// var getEventNear = function () {
//   var apiUrl =
//     "https://api.seatgeek.com/2/events?geoip=98.213.245.205&range=12mi&client_id=Mjc4NjY0OTJ8MTY1Nzg0MTg4Ni44MzQwMTky";

//   fetch(apiUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         console.log(data);
//         displayEvent(data);

var eventInputEl = document.querySelector("#eventName");
var eventContainerEl = document.querySelector("#event-container");
var searchEventEl = document.querySelector("#event-search");
var eventFormEl = document.querySelector("event-form");
var searchBtnEl = document.querySelector("#searchBtn");
var eventResultsEl = document.querySelector("#eventResults");
var directionsListEl = document.querySelector("#directionsList");

var eventHistory = [];
var recentEventSearched = "";

//       });
//     }
//   });
// };

var getEventNear = function (events) {
  //let city = "";
  //if(events.target.textContent === "Search") {
  //city = eventFormEl.children("input").val();
  //eventFormEl.children("input").val("");
  //} else {
  //city = events.target.textContent;
  // }
  // city = city.toUpperCase();
  // if(!city) {
  //   invalidInput();
  //   return;
  // }

  let apiUrl =
    "https://api.seatgeek.com/2/events?venue.city=" +
    events +
    "&client_id=Mjc4NjY0OTJ8MTY1Nzg0MTg4Ni44MzQwMTky";
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayEvent(data.events);
    })
    .catch((err) => console.log(err));
};

var displayEvent = function (events) {
  eventResultsEl.innerHTML = "";
  var limitOfEvents = 5;
  for (let i = 0; i < limitOfEvents; i++) {
    var currentEvent = events[i];
    var eventImg = document.createElement("img");
    var eventHolder = document.createElement("div");
    var titleHolder = document.createElement("h3");
    var addressHolder1 = document.createElement("p");
    var addressHolder2 = document.createElement("p");
    titleHolder.textContent = currentEvent.title + " - " + currentEvent.type;
    addressHolder1.textContent = currentEvent.venue.address;
    addressHolder2.textContent = currentEvent.venue.extended_address;
    eventHolder.setAttribute("data-lat", currentEvent.venue.location.lat);
    eventHolder.setAttribute("data-lon", currentEvent.venue.location.lon);
    eventImg.setAttribute("src", currentEvent.performers[0].image);
    eventHolder.append(titleHolder, eventImg, addressHolder1, addressHolder2);
    eventResultsEl.append(eventHolder);
  }
  recentEventSearched = currentEvent;
  saveEvent(eventInputEl.value);
  console.log(eventInputEl.value);
};

var eventSubmitHandler = function (event) {
  event.preventDefault();

  var events = eventInputEl.value.trim();
  getEventNear(events);
  // if (events) {
  //   eventHistory.push("eventname")
  //   localStorage.setItem("eventSearch", JSON.stringify(eventHistory));
  //   eventHistory.className = "btn";
  //   eventHistory.setAttribute("data-event", eventName)
  //   eventHistory.innerHTML = eventName;
  //   searchBtn.appendChild(eventHistory);
  //   eventInputEl.value = "";

  // } else {
  //   alert("Valid entry required")
  // }
};

//container with event name and location, append it
//dynamically set up divs, fill with textcontent, header \

var displayDirections = function (lat, lon) {
  var apiStart =
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=";
  var key = "&key=AIzaSyD977niwAg_ga4uwIxlClUPRMYJ9IcsNCA";
  var apiMiddle = "&destination=";
  var origin = "Greensboro"; //document.getElementById("#startLocation").value
  var destination = lat + "," + lon;
  var apiUrl = apiStart + origin + apiMiddle + destination + key;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        console.log(data.routes[0].legs[0].steps.length);
        for (let i = 0; i < data.routes[0].legs[0].steps.length; i++) {
          var directionsLi = document.createElement("li");
          var directionsArr = data.routes[0].legs[0].steps[i].html_instructions;
          console.log(directionsArr);
          directionsLi.innerHTML = i + 1 + ". " + directionsArr + "</br>";
          directionsListEl.appendChild(directionsLi);
        }
      });
    } else {
      console.log("Not Working");
    }
  });
};

// function to save the event search history to local storage

var saveEvent = function (events) {
  if (!eventHistory.includes(events) && events != "") {
    eventHistory.push(events);
    console.log(events);
    // $("#searchHistory").append(
    //   "<a href='#' class='border-2 border-black rounded-md px-10 py-10 ml-10' id='" +
    //     "'>" +
    //     events +
    //     "</a>"
    // );
  }
  // save the eventHistory array to local storage

  localStorage.setItem("searcheventHistory", JSON.stringify(eventHistory));
  // save the lastCitySearched to local storage

  localStorage.setItem(
    "recentEventSearched",
    JSON.stringify(recentEventSearched)
  );

  //display event history array
  loadEventHistory();
  console.log(eventHistory);
};

var loadEventHistory = function () {
  eventHistory = JSON.parse(localStorage.getItem("searcheventHistory"));
  recentEventSearched = JSON.parse(localStorage.getItem("recentEventSearched"));

  // if nothing in localStorage, create an empty eventHistory array and an empty recentEventSearched string
  if (!eventHistory) {
    eventHistory = [];
  }

  if (!recentEventSearched) {
    recentEventSearched = "";
  }

  // clear any previous values from th search-history ul
  $("#searchHistory").empty();

  // for loop that will run through all the events found in the array
  for (i = 0; i < eventHistory.length; i++) {
    // add the event as a link, set it's id, and append it to the search-history ul
    $("#searchHistory").append(
      "<a href='#' class='border-2 border-black rounded-md px-2 py-2 ml-10 mb-2' id='" +
        eventHistory[i] +
        "'>" +
        eventHistory[i] +
        "</a>"
    );
    console.log(eventHistory.length);
  }
};
// load search history from local storage
loadEventHistory();

// start page with the last event searched if there is one
// if (recentEventSearched != "") {
//   getEventNear(recentEventSearched);
// }

searchBtnEl.addEventListener("click", eventSubmitHandler);
eventResultsEl.addEventListener("click", function (event) {
  directionsListEl.innerHTML = "";

  var lat = event.target.parentNode.dataset.lat;
  var lon = event.target.parentNode.dataset.lon;
  displayDirections(lat, lon);
});
$("#searchHistory").on("click", function (event) {
  // get the links id value
  let prevEvent = $(event.target).closest("a").attr("id");
  // pass it's id value to the getEventNear function
  getEventNear(prevEvent);
  console.log(prevEvent);
});
