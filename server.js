
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
      var content = fs.readFileSync("samplelatlong.json");
      res.setHeader('Content-Type', 'application/json');
      res.send(content)
})
app.post('/ssids', function(req, res) {
  var loginCookie = req.body.auth;
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
      post_data += "&ssid=" + req.body.ssid;
      post_data += "&latrange1=" + req.body.latrange1;
      post_data += "&latrange2=" + req.body.latrange2;
      post_data += "&longrange1=" + req.body.longrange1;
      post_data += "&longrange2=" + req.body.longrange2;
      post_data += "&first=" + req.body.first;
      post_data += "&last=" + req.body.last;
      console.log(req.body.first)
      console.log("data: " + post_data)
      post_options.headers["Content-Length"] = Buffer.byteLength(post_data)
      console.log(post_options.headers)
      var dataSent = ""
      var post_req = https.request(post_options, function(response) {
          response.setEncoding('utf8');
          response.on('data', function (chunk) {
              console.log('Response: ' + chunk);
              dataSent += chunk
          });
          response.on('end', function () {
              res.end(dataSent);
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