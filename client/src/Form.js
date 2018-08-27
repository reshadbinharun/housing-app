import React, { Component } from 'react';
import './Form.css'
import axios from 'axios'
import DateRange from 'react-date-range'

class Form extends Component {
	constructor(props){
		super(props);
		this.state = {
			zip: 0,
			high_price: 0,
			low_price: 0,
			start_m: 0,
			start_y: 0,
			end_m: 0,
			end_y: 0

		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
	}

	//manual input of dates
	handleChange(e){
		console.log(e.target.name)
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	handleSubmit(e){
		e.preventDefault();
		console.log("Form submitted has e", e.target)
		//console.log(this.state)
		axios.post('/search', {
		    zip: this.state.zip,
		    high_price: this.state.high_price,
		    low_price: this.state.low_price,
		    start_m: this.state.start_m,
		    start_y: this.state.start_y,
		    end_m: this.state.end_m,
		    end_y: this.state.end_y

		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

	}
	handleSelect(e){
		console.log(e);
	}

  render() {
    return (
      <div>
        <p> Please provide your search criteria </p>
        <div className= "int-box">
        <form onSubmit={this.handleSubmit}>
        
	        <p><label> Enter zip-code of interest </label>
	        <input type="number" min ="0" max = "99999" name='zip' placeholder='Please Enter Zip' onChange={this.handleChange}/></p>
	        <p><label> Start Dates for Sublet </label>
		        <input type="number" name='start_m' min="1" max ="12" placeholder='mm' onChange={this.handleChange}/>
		        <input type="number" name='start_y' min="2018" max = "9999" placeholder='yyyy' onChange={this.handleChange}/></p>
		    <p><label> End Dates for Sublet </label>
		        <input type="number" name='end_m' min="1" max ="12" placeholder='mm' onChange={this.handleChange}/>
		        <input type="number" name='end_y' min="2018" max = "9999" placeholder='yyyy' onChange={this.handleChange}/></p>

	        <p><label> Monthly Price Range </label>
		        <label> Low-end </label>
		        <input type="number" name='low_price' placeholder='$' onChange={this.handleChange}/>
		        <label> High-end </label>
		        <input type="number" name='high_price' placeholder='$$$' onChange={this.handleChange}/></p>
	    
	    <input type="submit" value="Submit"/>
        </form>
        </div>
      </div>
    );
  }
}

export default Form;