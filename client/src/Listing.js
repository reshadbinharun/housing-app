import React, { Component } from 'react';
import Logout from './Logout'
import ListObj from './ListObj'
import AddList from './AddList'
import MyListings from './MyListings'

class Listing extends Component {
	constructor(props){
		super(props);
		this.state = {
			user: '',
			school: ''
		}
	}
	ComponentDidMount(){
		this.setState({
			user: this.props.user,
			school: this.props.school
		})
	}
  render() {
    return (
      <div>
      	<p> Listings page </p>
        <p> {this.state.user} </p>
        <p> Post a listing </p>
        <AddList user={this.user} school={this.props.school} />
        <p> Your Listings </p>
        <MyListings user={this.user}/>
      </div>
    );
  }
}

export default Listing;