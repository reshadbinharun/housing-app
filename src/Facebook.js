import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class Facebook extends Component {
	constructor(props){
		super(props);
		//this.onLoginChange = this.onLoginChange.bind(this);
		this.state = {
			isLoggedIn: false,
			userID: '',
			name: '',
			email: '',
			image: null
		}
	}
	

	componentClicked = () => { console.log("FB button clicked!")}
	responseFacebook = (response) => {
		console.log(response);
		this.setState({
			isLoggedIn:true,
			userID: response.userID,
			name: response.name,
			email: response.email,
			image: response.picture.data.url
		})
	};
  render() {
  	let fbContent;
  	//lifting
  	const loggedIn = this.props.loggedIn, userID = this.props.userID, name = this.props.name, email = this.props.email;
  	//lifting
  	if (this.state.loggedIn){
  		console.log("Log in state changed");
  		fbContent = (
  			<div style = {{
  				width: '400px',
  				margin: 'auto',
  			}}>
  			<img src = {this.state.picture} alt={this.state.name} />
  			<h2> Welcome {this.state.name} </h2>

  			</div>)
  	} else{
  		fbContent = (<FacebookLogin
			    appId="2026285211014823"
			    autoLoad={true}
			    fields="name,email,picture"
			    onClick={this.componentClicked}
			    callback={this.responseFacebook} />)
  	}
    return (
      <div>{fbContent}
      </div>
    );
  }
}

export default Facebook;
