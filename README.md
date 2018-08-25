reactnd-neighborhood-map
===============================

## Table of Contents

* [About](#about)
* [Installing](#installing)
* [Features](#features)
* [Functions](#functions)
* [Dependencies](#dependencies)
* [APIs](#api)

## About

reactnd-neighborhood-map is an application that shows a list of interesting places in a certain neighborhood and displays them on google map, the application uses third party library ike Google maps API and Foursquare API.

The application is build using React framework, and uses the create-react-app boilerplate template
 
## Installing

1- Clone the repo
2- run `npm install`
3- run `npm start`

## features

1- Interesting places shown on the map with info on each marker
2- Places-list shown on a side-menu with filtering criteria
3- Animated markers
4- Application is responsive, and works across different devices

## Functions

Function `loadScript` in `App.js` is used to append the google-map-api script in the React Dom

## Dependencies

1- axios 
Promise based HTTP client for the browser and node.js
url: `https://github.com/axios/axios`

2- escape-string-regexp
Escape RegExp special characters
url: `https://github.com/sindresorhus/escape-string-regexp`

## APIs

1- `https://cloud.google.com/maps-platform/`
2- `https://developer.foursquare.com/`