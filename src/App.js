import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Menu from './Menu';

class App extends Component {

  state = {
    venues: [],
    markers: [],
    map: {},
    infowindow: {}
  }

  componentDidMount() {
    this.getVenues();
    const hamburgerIcon = document.querySelector('.icon');
    hamburgerIcon.addEventListener('keypress', event => {
      if (event.keyCode === 32 || event.keyCode === 13) {
        this.openCloseSideBar();
      }
    })
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
      .catch(error => alert('Error: unable to retrieve data from third party API'));
  }

  initMap = () => {
    let markers = [];
    const myCity = { lat: 30.06263, lng: 31.24967 };
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: myCity,
      zoom: 14
    })
    const infowindow = new window.google.maps.InfoWindow();
    this.state.venues.map(ele => {
      const content = `${ele.venue.location.address}`
      const marker = new window.google.maps.Marker({
        position: { lat: ele.venue.location.lat, lng: ele.venue.location.lng },
        map: map,
        title: ele.venue.name
      })
      marker.setAnimation(window.google.maps.Animation.DROP);
      markers.push(marker)
      marker.addListener('click', function () {
        infowindow.setContent(content);
        infowindow.open(map, marker);
      })
    })
    this.setState({
      markers: markers,
      map: map,
      infowindow: infowindow
    })
  }
  openCloseSideBar = () => {
    let sideBar = document.getElementsByClassName('side-bar');
    const filterLocation = document.querySelector('.filter-location');
    sideBar[0].classList.toggle('open');
    if(sideBar[0].classList.contains('open')){
      filterLocation.focus();
    }
  }

  render() {
    console.log(document.activeElement);

    return (
      <div className='main'>
        <Menu
          venues={this.state.venues}
          markers={this.state.markers}
          map={this.state.map}
          infowindow={this.state.infowindow}>
        </Menu>
        <header className='header'>
          <div
            className='icon'
            aria-label='open side menu'
            role='button'
            tabIndex='0'
            onClick={this.openCloseSideBar}>
            <i className="fas fa-bars fa-2x"></i>
          </div>
          <div className='title'>
            <h1>Cairo</h1>
          </div>
        </header>
        <div id='map' aria-label='map'></div>
        <footer>
          <span>Powered by Foursquare</span>
          <span>Designed by Mahmoud Gamie</span>
        </footer>
      </div>
    );
  }
}

//loading the google map api script in the React Dom
function googleError() {
  alert('Error: can not load map')
}

function loadScript(url) {
  const firstScriptTag = document.getElementsByTagName('script')[0];
  const mapScript = document.createElement('script');
  mapScript.src = url;
  mapScript.async = true;
  mapScript.defer = true;
  mapScript.onerror = googleError
  firstScriptTag.parentNode.insertBefore(mapScript, firstScriptTag);
  console.log(mapScript);

}

export default App;