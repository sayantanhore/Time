// Google Maps Geocode API Key - AIzaSyAoyMoa689mNz8IOYmtPrfhvdXwaUlTXfk

//https://maps.googleapis.com/maps/api/geocode/json?latlng=60.185197,24.812929&key=AIzaSyAoyMoa689mNz8IOYmtPrfhvdXwaUlTXfk

var https = require('https');
var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=60.185197,24.812929&key=AIzaSyAoyMoa689mNz8IOYmtPrfhvdXwaUlTXfk';
var data = '';
var req = https.get(url, (res) => {
  res.on('data', (bits) => {
    data += bits;
  });
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
}).on('error', (e) => {
  console.log(e);
}).end();
