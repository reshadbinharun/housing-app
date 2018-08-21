import React, { Component } from 'react';
import Logout from './Logout'
import ReqObj from './ReqObj'

class Requests extends Component {

  render() {
    return (
      <div>
      	<Logout />
        <p> Here are your requests </p>
      </div>
    );
  }
}

export default Requests;