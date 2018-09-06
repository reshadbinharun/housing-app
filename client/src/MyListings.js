import React, { Component } from 'react';
import ListObj from './ListObj'
import axios from 'axios'

class MyListings extends Component {
	constructor(props){
		super(props);
		this.state = {
			user: '',
			address: []
		}
		this.LoadListings = this.LoadListings.bind(this);
	}
	ComponentDidMount(){
    console.log("this user is ", this.props.user)
		this.setState({
			user: this.props.user
		}, axios.post('/getUserListings', {email: this.state.user}).then( (response) => {
        console.log(response);
        var myListings = []
        for (var i = 0; i < response.listings.length; i++){
        	var listing = response.listings[i];
        	var address = "";
        	address += "Street: "
        	address += listing.street;
        	address += " , ";
        	address += listing.city;
        	myListings.push(address);
        }
        this.setState({
        	address: address
        })
      })
      .catch(function (error) {
        console.log(error);
      }));
	}
	LoadListings(){
		return(
			this.state.address.map(function(address){
				return(<li value = {address} key ={address}> {address} </li>)
			}))
	}
  render() {
    return (
      <div>
        <ul>
        	{this.LoadListings}
        </ul>
      </div>
    );
  }
}

export default MyListings;