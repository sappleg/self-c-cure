Self C-Cure
===========
Penn Apps Fall 2013

[Visit our web application!](http://self-c-cure.thotpod.com:8142/)

## Introduction
Self C-Cure is an easy to use, configurable home security system. It features a device that can be installed
on any door or window, detecting opens and closes. A web application provides an interface through which to
connect to and to configure your devices. A user makes an account, adds devices using a 24 character product string,
and edits device settings. These settings include arming and disarming, and setting email alerts for certain
events so that you can stay informed about when your doors are opening.

## Technical Details
The arduino board is connected to the internet via wifi, and it communicates with our server via HTTP. When an open
or close is detected, the server is notified and decides whether the event deserves an email notification based
on stored user information.

## Technologies Used
- Arduino Uno with an XBee WiFi shield
- MongoDB
- NodeJS with Express
- AngularJS

[MIT License](http://opensource.org/licenses/MIT) (c) Thotpod 2013
