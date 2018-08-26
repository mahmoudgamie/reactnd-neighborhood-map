import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class Menu extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  openInfoWindowAndAnimate = (venue) => {
    //setting infowindow and animoation for clicked item
    this.props.markers.forEach(marker => {
      if (marker.title === venue.name) {
        this.props.infowindow.open(this.props.map, marker);
        this.props.infowindow.setContent(venue.location.address);
        marker.setAnimation(window.google.maps.Animation.Zn);
      }
    })
  }

  render() {
    let showingLocations;
    let placeName;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i');
      showingLocations = this.props.venues.filter(ele => match.test(ele.venue.name));
      placeName = showingLocations.map(place => place.venue.name)
      this.props.markers.forEach(marker => {
        if (placeName.includes(marker.title)) {
          marker.setMap(this.props.map)
        } else {
          marker.setMap(null)
        }
      })
    } else {
      showingLocations = this.props.venues;
      this.props.markers.forEach(marker => {
        marker.setMap(this.props.map)
      })
    }
    return (
      <div className='side-bar' >
        <h3>Cairo Shops</h3>
        <div className='side-bar-container'>
          <input
            className='filter-location'
            role='textbox'
            aria-label='search locations'
            type='text'
            placeholder='Search locations'
            value={this.state.query}
            onChange={(event) => { this.updateQuery(event.target.value) }} />
          <ul className='list-menu'>
            {showingLocations.map(ele => (
              <li
                key={ele.venue.id}
                className='list-item'
                role='button'
                tabIndex='0'
                onClick={() => this.openInfoWindowAndAnimate(ele.venue)}>{ele.venue.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}


export default Menu;