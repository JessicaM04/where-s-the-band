var eventInputEl = document.querySelector("#eventName");
var eventContainerEl = document.querySelector("#event-container");
var searchEventEl = document.querySelector("#event-search");
var eventFormEl = document.querySelector("event-form");
var searchBtnEl = document.querySelector("#searchBtn");
var eventResultsEl = document.querySelector("#eventResults");
var directionsListEl = document.querySelector("#directionsList");
var originEl = document.querySelector("#startLocation");
var origin = "";

var eventHistory = [];

var getEventNear = function (events) {
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
    var timeDateHolder = document.createElement("p");
    var timeDateHolder = moment(currentEvent.datetime_local).format("LLLL");

    titleHolder.textContent = currentEvent.title + " - " + currentEvent.type;
    titleHolder.classList.add("font-bold", "text-base");
    addressHolder1.textContent = currentEvent.venue.address;
    addressHolder2.textContent = currentEvent.venue.extended_address;
    timeDateHolder.textContent = currentEvent.datetime_local;
    eventHolder.setAttribute("data-lat", currentEvent.venue.location.lat);
    eventHolder.setAttribute("data-lon", currentEvent.venue.location.lon);
    eventHolder.classList.add(
      "border-2",
      "border-black",
      "rounded-md",
      "px-2",
      "py-2",
      "ml-10",
      "mb-2"
    );
    eventResultsEl.classList.remove(
      "mb-20",
      "border-2",
      "border-black",
      "rounded-md",
      "px-10",
      "py-10"
    );
    eventImg.setAttribute("src", currentEvent.performers[0].image);
    eventHolder.append(
      titleHolder,
      eventImg,
      addressHolder1,
      addressHolder2,
      timeDateHolder
    );
    eventResultsEl.append(eventHolder);
  }
  saveEvent(eventInputEl.value);
};

var eventSubmitHandler = function (event) {
  event.preventDefault();

  var events = eventInputEl.value.trim();
  getEventNear(events);
};

//display directions in directions container
var displayDirections = function (lat, lon) {
  var apiStart =
    "https://maps.googleapis.com/maps/api/directions/json?origin=";
  var key = "&key=AIzaSyD977niwAg_ga4uwIxlClUPRMYJ9IcsNCA";
  var apiMiddle = "&destination=";
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

var saveEvent = function (events) {
  if (!eventHistory.includes(events) && events != "") {
    eventHistory.push(events);
    console.log(events);
  }
  // save the eventHistory array to local storage
  localStorage.setItem("searcheventHistory", JSON.stringify(eventHistory));

  //display event history array
  loadEventHistory();
};

var loadEventHistory = function () {
  eventHistory = JSON.parse(localStorage.getItem("searcheventHistory"));

  // if nothing in localStorage, create an empty eventHistory array and an empty recentEventSearched string
  if (!eventHistory) {
    eventHistory = [];
    return false;
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
  }

};
// load search history from local storage
loadEventHistory();

searchBtnEl.addEventListener("click", eventSubmitHandler);

eventResultsEl.addEventListener("click", function (event) {
  directionsListEl.innerHTML = "";

  var lat = event.target.parentNode.dataset.lat;
  var lon = event.target.parentNode.dataset.lon;

  if (origin === "") {
    var modal = document.getElementById("locModal");
    var span = document.getElementsByClassName("close")[0];
    var locBtnEl = document.querySelector("#locBtn");
    modal.style.display = "block";

    //close modal
    span.onclick = function () {
      modal.style.display = "none";
    };

    // When the user submits their start location, close it
    locBtnEl.onclick = function () {
      origin = originEl.value.trim();
      modal.style.display = "none";
      displayDirections(lat, lon);
    };
  } else {
    displayDirections(lat, lon);
  }
});

$("#searchHistory").on("click", function (event) {
  // get the links id value
  let prevEvent = $(event.target).closest("a").attr("id");
  // pass it's id value to the getEventNear function
  getEventNear(prevEvent);
  console.log(prevEvent);
});
