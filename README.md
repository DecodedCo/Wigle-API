## Wigle API written in Node.


This interacts with wigle search database. Currently can search by SSID.

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

Notice the auth key is your cookie from when you are logged in to Wigle. Log in to Wigle, then graph you auth key from cookies in the inspector. Too many requests will fail