//a program that displays the location of the space station!

var request = require('request');
request('http://api.open-notify.org/iss-now.json', function (error, response, body) {
  if (error) {
      console.log("there was an error!! Error = " + error)
  }
  if (!error && response.statusCode == 200) {
        var bodyObject = JSON.parse(body);
        console.log("The ISS is in the following position:");
        console.log("Latitude: " + bodyObject.iss_position.latitude.toFixed(2))
        console.log("Longitude: " + bodyObject.iss_position.longitude.toFixed(2))
  }
})