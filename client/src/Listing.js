import React, { Component } from 'react';
import Logout from './Logout'
import ListObj from './ListObj'

class Listing extends Component {
	constructor(props){
		super(props);
		this.state = {
			user: ''
		}
	}
	ComponentDidMount(){
		this.setState({
			user: this.props.user
		})
	}
  render() {
    return (
      <div>
      	<p> Listings page </p>
        <p> {this.state.user} </p>
      	<Logout/>
        <p> Post a listing </p>
      </div>
    );
  }
}

export default Listing;