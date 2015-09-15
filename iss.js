
//a program that displays the location of the space station!

//prompt to user ask for their location. it then calls the map function.
//function CALL ONE
function getLocation() {
var prompt = require('prompt');
  prompt.start();
  console.log("Enter the name if the city where you live: ");
  prompt.get('currentLocation', function (error, result) {
    if (error) {
      console.log("there was an error!! Error = " + error);
  }
  else {
    var userCity = result.currentLocation; 
    console.log('Your current location is: ' + result.currentLocation);
    callMaps(userCity); //passes the user's city to the map Function
  }
  });
 } 

/*a function that gets the lat and long of the user's inputed city.
calls a function to calculate the distance between the users city
and the iss using the parameters from the request*/
//function CALL TWO
function callMaps(city) {
    var mapsHttps = "https://maps.googleapis.com/maps/api/geocode/json?address="+city;
    var request = require('request');
    request(mapsHttps, function (error, response, body) {
        if (error) {
      console.log("there was an error!! Error = " + error);
    }
    if (!error && response.statusCode == 200) {
        var bodyObject = JSON.parse(body);
        var cityLat = bodyObject.results[0].geometry.location.lat;
        var cityLong = bodyObject.results[0].geometry.location.lng;
        console.log(city + " has the following location coordinates:");
        console.log("Latitude: " + cityLat.toFixed(2));
        console.log("Longitude: " + cityLong.toFixed(2));
        calcDistance(cityLat, cityLong, city); 
    }
});
}

//calc distance between the two locations using Haversine formula
//function CALL THREE
function calcDistance(userLat, userLong, cityName){
    
        //a function to add the property toRadians()
    Number.prototype.toRadians = function() {
        return this * Math.PI / 180;
    };
    
    //a self-invoking function to get the coordinates of the ISS 
    //and calls haversince calculations
    //function CALL FOUR
    (function getISSCords () {
    var request = require('request');
    request('http://api.open-notify.org/iss-now.json', function (error, response, body) {
    if (error) {
        console.log("there was an error!! Error = " + error);
    }
    if (!error && response.statusCode == 200) {
    var bodyObject = JSON.parse(body);
        var issLat = bodyObject.iss_position.latitude;
        var issLong = bodyObject.iss_position.longitude;
        console.log("The ISS is in the following position:");
        console.log("Latitude: " + issLat.toFixed(2));
        console.log("Longitude: " + issLong.toFixed(2));
        haversineCalc(issLat, issLong);
    }
    });
    })()
    
    //haverSine Calculation
    //function CALL FIVE
    function haversineCalc(issLat, issLong) {
        var R = 6371000; // metres
        var φ1 = issLat.toRadians();
        var φ2 = userLat.toRadians();
        var Δφ = (userLat-issLat).toRadians();
        var Δλ = (userLong-issLong).toRadians();

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        var distance = R * c; 
        console.log("The distance between " + cityName + " and the ISS is:");
        console.log(distance.toFixed(0) + " KM");
    }

}

//to run the program call getLocation!
getLocation();



