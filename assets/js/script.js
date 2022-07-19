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


//       });
//     }
//   });
// };

// var displayEvent = function (searchEvent) {
//   eventContainerEl.textContent = "";
//   searchEventEl.textContent = searchEvent;

//   //   recentEventSearched = eventData.name;
//   // to be added at a later ppint
//   //   saveEvent(eventData.name);
// };

// var eventSubmitHandler = function (event) {
//   event.preventDefault();

//   var events = $("#eventname").val().trim();
//   if (events) {
//     getEventNear(events);
//   }
// };

//fetch(`https://api.seatgeek.com/2/events?geoip=98.213.245.205&range=12mi&client_id=Mjc4NjY0OTJ8MTY1Nzg0MTg4Ni44MzQwMTky`)
//.then(res => res.json())
//.then((data) => {
//  console.log(data);
//})
//.catch(err => console.log(err));

//add these to the end of your fetch function
//lat = data.venue.location.lat;
//lon = data.venue.location.lon;

//at the end of your code before you close it out with the }, add the following line
//displayDirections(lat,long);



var displayDirections = function(lat,long) {
    var apiStart="https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin="
    var key="&key=AIzaSyD977niwAg_ga4uwIxlClUPRMYJ9IcsNCA"
    var apiMiddle="&destination="
    var origin = document.getElementById("#locBtn")
    var destination = "Kernersville"//lat+","+lon;
    
    
    var apiUrl=apiStart+origin+apiMiddle+destination+key;

    fetch(apiUrl).then(function(response){
        var directionsListEl= document.querySelector("#directionsList");
        if(response.ok) {
          response.json().then(function(data){
            console.log(data);
            
            console.log(data.routes[0].legs[0].steps.length);
            for (let i=0; i<data.routes[0].legs[0].steps.length; i++) {            
                  var directionsLi=document.createElement("li");
                  var directionsArr=data.routes[0].legs[0].steps[i].html_instructions;
                  console.log(directionsArr);
                  directionsLi.innerHTML=i+". "+directionsArr+"</br>";
                  directionsListEl.appendChild(directionsLi);
                }
            })
        } else {
            console.log("Not Working");
        }
    })
};

displayDirections();


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

// $("event-form").submit(eventSubmitHandler);
// $("#search-history").on("click", function (event) {
//   // get the links id value
//   let prevEvent = $(event.target).closest("a").attr("id");
//   // pass it's id value to the getEventNear function
//   getEventNear(prevEvent);
// });

