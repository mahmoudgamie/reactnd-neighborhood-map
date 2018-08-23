import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    venues: ''
  }

  componentDidMount() {
    this.getVenues();
  }

  //loading the map and passing the callback function to the global
  loadMap = () => {
    const url = 'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDo4mqXNW4jwA4PdjxZx2w7qPumf865ATc&callback=initMap';
    loadScript(url);
    window.initMap = this.initMap;
  }

  //getting the locations from foursquare api using axios library
  getVenues = () => {
    const url = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {
      client_id: '5ZEYADCII2MVM00YFX3ZPRR3SEXKAPVO5IAV2DO1ZAYJ04L3',
      client_secret: 'LUSQFIHZMYTTVXNWDYV0351HAXOG0W5WFJGYZ22PYNILGZZN',
      query: 'shops',
      near: 'Cairo',
      v: '20182507'
    };
    axios.get(url + new URLSearchParams(parameters))
      .then(response => this.setState({ venues: response.data.response.groups[0].items }, this.loadMap()))
      .catch(error => console.log('Error: ' + error));
  }

  initMap = () => {
    const myCity = { lat: 30.06263, lng: 31.24967 };
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: myCity,
      zoom: 12
    });



    const infowindow = new window.google.maps.InfoWindow();

    this.state.venues.map(ele => {
      const content = `${ele.venue.location.address}`
      const marker = new window.google.maps.Marker({
        position: { lat: ele.venue.location.lat, lng: ele.venue.location.lng },
        map: map,
        title: ele.venue.name
      });
      marker.addListener('click', function () {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      })
    })
  }
  render() {
    return (
      <div>
        <header>
          <i className="icon fas fa-bars fa-2x"></i>
          <div className='title'>
            <h1>Cairo</h1>
          </div>
        </header>
        <main>
          <div id='map'></div>
        </main>
      </div>
    );
  }
}

//loading the google map api script in the React Dom
function loadScript(url) {
  const firstScriptTag = document.getElementsByTagName('script')[0];
  const mapScript = document.createElement('script');
  mapScript.src = url;
  mapScript.async = true;
  mapScript.defer = true;
  firstScriptTag.parentNode.insertBefore(mapScript, firstScriptTag);
}

export default App;
