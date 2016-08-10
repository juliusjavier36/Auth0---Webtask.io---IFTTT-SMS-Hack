# Auth0
Webtask.io Hack - SMS notification via IFTTT upon user login

This is a webtask.io hack that sends an SMS message with name, email, and time/date stamp if a login was made. 

This was integrated with a very simple login page and auth0 authentication as well as IFTTT and webtask.io.

The reason I used webtask.io for the source of the IFTTT trigger was that the operation of this script is hidden from basic developer tools when watching network traffic through index.html. You will see a POST made with 2 values but you will not see the actual execution of the webtask.io endpoint that triggers IFTTT and then sends out the SMS.
