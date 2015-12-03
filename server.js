var express    = require('express');
var querystring = require('querystring');
// var https = require('https');
var fs = require("fs");
var https = require('socks5-https-client');
var bodyParser = require('body-parser');
var app        = express();

app.use(bodyParser.json());

app.post('/test', function(req, res) {
  var loginCookie = req.query.cookies;
      var ssid = req.body.ssid;
      console.log(req.body.ssid)
      var content = fs.readFileSync("test.json");
      res.setHeader('Content-Type', 'application/json');
      res.send(content)
})
app.post('/ssids', function(req, res) {
  var loginCookie = req.body.auth;
    var ssid = req.body.ssid;
    console.log("ssid: ", req.body.ssid, "cookie: ", loginCookie)
    
    res.setHeader('Content-Type', 'application/json');
    //post request options
    var post_options = {
        hostname: 'wigle.net',
        port: 443,
        path: '/api/v1/jsonSearch',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'auth='+loginCookie
        },
        socksPort: 9150 // Tor port.
    };
      var post_data = querystring.stringify({
          'Query' : 'Query',
      });
      post_data += "&ssid=" + ssid 
      console.log("data: " + post_data)
      post_options.headers["Content-Length"] = Buffer.byteLength(post_data)
      console.log(post_options.headers)
      // Set up the request
      var post_req = https.request(post_options, function(response) {
          response.setEncoding('utf8');
          response.on('data', function (chunk) {
              console.log('Response: ' + chunk);
              res.send(chunk);
          });
      });

      // post the data
      post_req.write(post_data);
      post_req.end();
});

  app.use(express.static('public'));

  var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening on http://%s:%s', host, port);
});