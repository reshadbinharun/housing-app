import React, { Component } from 'react';

class User extends Component {
  //state here
  constructor(props){
    super(props);
    this.selectUser = this.selectUser.bind(this);
    //this.changeInfo = this.changeInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  selectUser(users){
    return users.map(function(user){
      return(
        <option value = {user} key ={user}> {user}</option>)
    })
  }
  handleChange(e){
    this.props.changeInfo(e.target.value);
  }
  render() {
    const users = ["reshad","samiha","tanvir","putin"];
    return (
      <div className="user">
        <p> Welcome user {this.props.user} </p>
        <select onChange = {this.handleChange} name="userList">
          {this.selectUser(users)}
        </select>
      </div>
    );
  }
}

export default User;
