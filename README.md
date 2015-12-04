## Wigle API written in Node, that uses the TOR network.

* This interacts with wigle search database. Currently can search by SSID.
* It uses Tor to mask your IP as Wigle restricts number of requests based on login AND IP address.

* You need Tor installed and running to use this

## /

`/?ssid=[ssid]`

Get parameter to search for an ssid. Your cookie must already be set in the html file.


* Google map that will search for ssids
## /test

* There is a test endpoint that will return test.json so you don't use up your requests against Wigle

`/test`

POST:

```
{"ssid":"[ssid]"}
```

## /ssids

* Hit this endpoint to search for an ssid in the database

POST:

```
{"auth":"[auth key]", "ssid":"[ssid]"}
```

{"ssid":[ssid], "latrange1":[latrange1], "latrange2":[latrange2], "longrange1":[longrange1], "longrange2":[longrange2], "first":[first], "auth":'[auth key]'}

Notice the auth key is your cookie from when you are logged in to Wigle. Log in to Wigle, then graph you auth key from cookies in the inspector. Too many requests will fail