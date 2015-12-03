var express    = require('express');
var querystring = require('querystring');
var https = require('https');
var bodyParser = require('body-parser');
var app        = express();

app.use(bodyParser.json());
var post_data = querystring.stringify({
      'Query' : 'Query',
  });

//use this to set cookies
app.get('/', function(req, res) {
    res.json({ message: 'To use this, post json to /ssids' });   
});

app.post('/ssids', function(req, res) {
  var loginCookie = req.query.cookies;
    var ssid = req.body.ssid;

    res.setHeader('Content-Type', 'application/json');
    //post request options
    var post_options = {
        hostname: 'wigle.net',
        port: 443,
        path: '/api/v1/jsonSearch',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': loginCookie
        }
    };

      post_data += "&ssid=" + ssid 
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


  var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening on http://%s:%s', host, port);
});