import React, { Component } from 'react';

class ReqObj extends Component {
	constructor(props){
		super(props);
		this.onLoadReq = this.onLoadReq.bind(this);
	}

	onLoadReq(reqs) {
		console.log(reqs);
		return reqs.map(function(req){
			console.log(req);
      		return(
        	<li value = {req.address.street} key ={req.address.street}> 
        	<p> Property at {req.address.street} , requested by 
        	{req.contacted.map(function(contact){
        		return(
        			<div> {contact} </div>)
        	})} </p> 
        	</li>
        	)
    	})
	}
  render() {
  	const allReqs = this.props.allReqs;
  	//allReqs.push(this.props.allReqs);
    return (
      <div>
        <p> There are your properties that have been requested </p>
        <ul> {this.onLoadReq(allReqs)} </ul>
      </div>
    );
  }
}

export default ReqObj;