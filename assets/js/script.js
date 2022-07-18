var eventInputEl = document.querySelector('#eventname');
var eventContainerEl = document.querySelector('#event-container');
var searchEventEl = document.querySelector('#event-search')
var eventFormEl = document.querySelector("event-form")

var getEventNear = function() {
    var apiUrl = "https://api.seatgeek.com/2/events?geoip=98.213.245.205&range=12mi&client_id=Mjc4NjY0OTJ8MTY1Nzg0MTg4Ni44MzQwMTky";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(data) {
            displayEvent(data);
        });
        }
    });
}

var displayEvent = function(searchEvent) {
    eventContainerEl.textContent = "";
    searchEventEl.textContent = searchEvent;

    
} 



var eventSubmitHandler = function(event) {
    event.preventDefault();
    
    var events = eventInputEl.value;
    if(events) {
        getEventNear(events); 
        eventInputEl.value = "";
    }
}


$("event-form").submit(eventSubmitHandler);

//fetch(`https://api.seatgeek.com/2/events?geoip=98.213.245.205&range=12mi&client_id=Mjc4NjY0OTJ8MTY1Nzg0MTg4Ni44MzQwMTky`)
//.then(res => res.json())
//.then((data) => {
//  console.log(data);
//})
//.catch(err => console.log(err));
