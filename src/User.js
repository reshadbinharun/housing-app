import React, { Component } from 'react';


class User extends Component {
  //state here
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="App">
        <p> Welcome user {this.props.user} </p>
      </div>
    );
  }
}

export default User;
