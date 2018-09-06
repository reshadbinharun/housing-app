import React, { Component } from 'react';

class User extends Component {
  //state here
  constructor(props){
    super(props);
    this.selectUser = this.selectUser.bind(this);
    //this.changeInfo = this.changeInfo.bind(this);
    //this.handleChange = this.handleChange.bind(this);
  }
  selectUser(users){
    return users.map(function(user){
      return(
        <option value = {user} key ={user}> {user}</option>)
    })
  }
  // handleChange(e){
  //   this.props.changeInfo(e.target.value);
  // }
  render() {
    return (
      <div className="user">
        <p> Welcome {this.props.user} </p>
      </div>
    );
  }
}

export default User;
