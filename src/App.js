import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount(){
    this.loadMap();
  }

  loadMap = () => {
    const url = 'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDo4mqXNW4jwA4PdjxZx2w7qPumf865ATc&callback=initMap';
    loadScript(url);
    window.initMap = this.initMap;
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }
  render() {
    return (
      <main>
        <div id='map'></div>
      </main>
    );
  }
}

function loadScript(url){
  const firstScriptTag = window.document.getElementsByTagName('script')[0];
  const mapScript = window.document.createElement('script');
  mapScript.src = url;
  mapScript.async = true;
  mapScript.defer = true;
  firstScriptTag.parentNode.insertBefore(mapScript, firstScriptTag);
}

export default App;
