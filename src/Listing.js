import React, { Component } from 'react';
import Logout from './Logout'
import ListObj from './ListObj'

class Listing extends Component {

  render() {
    return (
      <div>
      	<Logout/>
        <p> Listings page </p>
      </div>
    );
  }
}

export default Listing;