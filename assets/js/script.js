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

var eventHistory = [];

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
  eventResults.innerHTML = "";
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
    eventResults.append(eventHolder);
  }
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

//   recentEventSearched = eventData.name;
// to be added at a later ppint
//   saveEvent(eventData.name);

var displayDirections = function (lat, lon) {
  var apiStart =
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=";
  var key = "&key=AIzaSyD977niwAg_ga4uwIxlClUPRMYJ9IcsNCA";
  var apiMiddle = "&destination=";
  var origin = "Greensboro"; //document.getElementById("#locBtn")
  var destination = lat + "," + lon;
  var apiUrl = apiStart + origin + apiMiddle + destination + key;
  fetch(apiUrl).then(function (response) {
    var directionsListEl = document.querySelector("#directionsList");
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

//   // save button in modal was clicked
//   $("#form-modal .btn-save").click(function() {
//     // get form values
//     origin = $("#modalCity").val();

//     if (origin) {
//       displayDirections(origin,destination);

//       // close modal
//       $("#form-modal").modal("hide");
//     }
//   });

var displayDirections = function (origin, destination) {
  var apiStart =
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=";
  var key = "&key=AIzaSyD977niwAg_ga4uwIxlClUPRMYJ9IcsNCA";
  var apiMiddle = "&destination=";
  // var origin = cityOrigin;
  // var destination = "Kernersville";
  var apiUrl = apiStart + origin + apiMiddle + destination + key;

  fetch(apiUrl).then(function (response) {
    var directionsListEl = document.querySelector("#directionsList");
    var directionsLi = document.createElement("li");
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        console.log(data.routes[0].legs[0].steps.length);
        for (var i = 0; i < data.routes[0].legs[0].steps.length; i++) {
          console.log(data.routes[0].legs[0].steps[i].html_instructions);
          directionsLi.innerHTML =
            data.routes[0].legs[0].steps[i].html_instructions;
          directionsListEl.appendChild(directionsLi);
        }
        return directionsListEl;
      });
    } else {
      console.log("Not Working");
    }
  });
};

// Get the modal
var modal = document.getElementById("form-modal");

// Get the button that opens the modal
var locBtn = document.getElementById("locBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//get city by element
var modalCity = document.getElementById("modalCity");

//get the submit modal element
var submitModal = document.getElementsByClassName("submitModal")[0];

// When the user clicks on the button, open the modal
locBtn.addEventListener("click", function () {
  modal.style.display = "block";
  modalCity.value = ""; //clears value of origin
});

// When the user clicks on <span>, close the modal
span.addEventListener("click", function () {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

submitModal.addEventListener("click", function () {
  origin = modalCity.value;
  destination = "kernersville";
  if (modalCity) {
    displayDirections(origin, destination);
    modal.style.display = "none";
  }
});

//   // save button in modal was clicked
//   $("#form-modal .btn-save").click(function() {
//     // get form values
//     origin = $("#modalCity").val();

//     if (origin) {
//       displayDirections(origin,destination);

//       // close modal
//       $("#form-modal").modal("hide");
//     }
//   });

// function to save the event search history to local storage

// var saveEvent = function (events) {
//   if (!eventHistory.includes(events)) {
//     eventHistory.push(events);
//     $("#search-history").append(
//       "<a href='#' class='list-group-item list-group-item-action' id='" +
//         events +
//         "'>" +
//         events +
//         "</a>"
//     );
//   }
//   // save the eventHistory array to local storage

//   localStorage.setItem("searcheventHistory", JSON.stringify(eventHistory));
//   // save the lastCitySearched to local storage

//   localStorage.setItem(
//     "recentEventSearched",
//     JSON.stringify(recentEventSearched)
//   );

//   //display event history array
//   loadEventHistory();
// };

// var loadEventHistory = function () {
//   eventHistory = JSON.parse(localStorage.getItem("searcheventHistory"));
//   recentEventSearched = JSON.parse(localStorage.getItem("recentEventSearched"));

//   // if nothing in localStorage, create an empty eventHistory array and an empty recentEventSearched string
//   if (!eventHistory) {
//     eventHistory = [];
//   }

//   if (!recentEventSearched) {
//     recentEventSearched = "";
//   }

//   // clear any previous values from th search-history ul
//   $("#search-history").empty();

//   // for loop that will run through all the events found in the array
//   for (i = 0; i < eventHistory.length; i++) {
//     // add the event as a link, set it's id, and append it to the search-history ul
//     $("#search-history").append(
//       "<a href='#' class='list-group-item list-group-item-action' id='" +
//         eventHistory[i] +
//         "'>" +
//         eventHistory[i] +
//         "</a>"
//     );
//   }
// };
// // load search history from local storage
// loadEventHistory();

// // start page with the last event searched if there is one
// if (recentEventSearched != "") {
//   getEventNear(recentEventSearched);
// }

searchBtnEl.addEventListener("click", eventSubmitHandler);
eventResultsEl.addEventListener("click", function (event) {
  var lat = event.target.parentNode.dataset.lat;
  var lon = event.target.parentNode.dataset.lon;
  displayDirections(lat, lon);
});
$("#search-history").on("click", function (event) {
  // get the links id value
  let prevEvent = $(event.target).closest("a").attr("id");
  // pass it's id value to the getEventNear function
  getEventNear(prevEvent);
});
