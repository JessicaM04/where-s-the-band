var eventInputEl = document.querySelector("#eventname");
var eventContainerEl = document.querySelector("#event-container");
var searchEventEl = document.querySelector("#event-search");
var eventFormEl = document.querySelector("event-form");

var eventHistory = [];
var recentEventSearched = "";

var getEventNear = function () {
  var apiUrl =
    "https://api.seatgeek.com/2/events?geoip=98.213.245.205&range=12mi&client_id=Mjc4NjY0OTJ8MTY1Nzg0MTg4Ni44MzQwMTky";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayEvent(data);
      });
    }
  });
};

var displayEvent = function (searchEvent) {
  eventContainerEl.textContent = "";
  searchEventEl.textContent = searchEvent;

  //   recentEventSearched = eventData.name;
  // to be added at a later ppint
  //   saveEvent(eventData.name);
};

var eventSubmitHandler = function (event) {
  event.preventDefault();

  var events = $("#eventname").val().trim();
  if (events) {
    getEventNear(events);
  }
};

//fetch(`https://api.seatgeek.com/2/events?geoip=98.213.245.205&range=12mi&client_id=Mjc4NjY0OTJ8MTY1Nzg0MTg4Ni44MzQwMTky`)
//.then(res => res.json())
//.then((data) => {
//  console.log(data);
//})
//.catch(err => console.log(err));

var saveEvent = function (events) {
  if (!eventHistory.includes(events)) {
    eventHistory.push(events);
    $("#search-history").append(
      "<a href='#' class='list-group-item list-group-item-action' id='" +
        events +
        "'>" +
        events +
        "</a>"
    );
  }
  localStorage.setItem("searcheventHistory", JSON.stringify(eventHistory));
  localStorage.setItem(
    "recentEventSearched",
    JSON.stringify(recentEventSearched)
  );

  //display event history array
  loadEventHistory();
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
  $("#search-history").empty();

  // for loop that will run through all the events found in the array
  for (i = 0; i < eventHistory.length; i++) {
    // add the event as a link, set it's id, and append it to the search-history ul
    $("#search-history").append(
      "<a href='#' class='list-group-item list-group-item-action' id='" +
        eventHistory[i] +
        "'>" +
        eventHistory[i] +
        "</a>"
    );
  }
};
// load search history from local storage
loadEventHistory();

// start page with the last event searched if there is one
if (recentEventSearched != "") {
  getEventNear(recentEventSearched);
}

$("event-form").submit(eventSubmitHandler);
$("#search-history").on("click", function (event) {
  // get the links id value
  let prevEvent = $(event.target).closest("a").attr("id");
  // pass it's id value to the getEventNear function
  getEventNear(prevEvent);
});
