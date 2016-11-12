var http = require('http');
const championgg_token = "13a49d2950a0a74457b1d3379c490850";
const apiToken = "?api_key=" + championgg_token;
const host = "api.champion.gg";
const port = 80;

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
  });
}

var req = http.request({
  hostname: host,
  port: port,
  path: "/champion" + apiToken,
  method: 'GET',
  header: { 'Content-Type': 'application/json'}}, callback).end();
