import React, { Component } from 'react';
import Logout from './Logout'
import ReqObj from './ReqObj'
import axios from 'axios'

class Requests extends Component {
	constructor(props){
		super(props);
		this.state = {
			reqs:[]
		}

	}
	componentDidMount(){
		const email = this.props.email;
		console.log("about to send axios")
		axios.post('/getRequests', {email})
	      .then(res => {
	        //console.log(res);
	        console.log(res.data);
	        this.setState({
	        	reqs: res.data
	        })
	      })

	}

  render() {
    return (
      <div>
      	<Logout />
        <p> Here are your requests </p>
        <ReqObj allReqs = {this.state.reqs} />
      </div>
    );
  }
}

export default Requests;