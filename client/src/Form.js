import React, { Component } from 'react';
import './Form.css'

class Form extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		console.log(e.target.value)
		const formData = new FormData(e.target)
		console.log(formData);
	}

  render() {
    return (
      <div>
        <p> Please provide your search criteria </p>
        <div className= "int-box">
        <form onSubmit={this.handleSubmit}>
        
	        <p><label> Enter zip-code of interest </label>
	        <input type="number" min ="0" max = "99999" name='zip' placeholder='Please Enter Zip'/></p>
	        <p><label> Start Dates for Sublet </label>
	        <input type="number" name='month-start' min="1" max ="12" placeholder='mm' />
	        <input type="number" name='year-start' min="2018" max = "9999" placeholder='yyyy'/></p>
	        <p><label> End Dates for Sublet </label>
	        <input type="number" name='month-end' min="1" max ="12" placeholder='mm'/>
	        <input type="number" name='year-end' min="2018" max = "9999" placeholder='yyyy'/></p>
	        <p><label> Monthly Price Range </label>
		        <label> Low-end </label>
		        <input type="number" name='low-price' placeholder='$'/>
		        <label> High-end </label>
		        <input type="number" name='high-price' placeholder='$$$'/></p>
	    
	    <input type="submit" value="Submit"/>
        </form>
        </div>
      </div>
    );
  }
}

export default Form;