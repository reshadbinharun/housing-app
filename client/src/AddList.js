import React, { Component } from 'react';
import axios from 'axios'

class AddList extends Component {
	constructor(props){
		super(props);
		this.state = {
			zip: 0,
			street: '',
			city: '',
			price: 0,
			start_m: 0,
			start_y: 0,
			end_m: 0,
			end_y: 0,
			parking: false

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleSubmit(e){
		e.preventDefault();
			axios.post('/addList', {
			user: this.props.user,
			school: this.props.school,
			street: this.state.street,
		    zip: this.state.zip,
		    city: this.state.city,
		    price: this.state.price,
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

	handleChange(e){
		console.log(e.target.name)
		this.setState({
			[e.target.name] : e.target.value
		})
	} 
  render() {
    return (
      <div>
      	<form onSubmit={this.handleSubmit}>
      		<p><label> Enter the address of your Listing </label>
	        <input type="number" min ="0" max = "99999" name='zip' placeholder='Please Enter Zip' onChange={this.handleChange}/>
	        <input type="text" name="street" placeholder="Street Name"/>
	        <input type="text" name="city" placeholder="City"/></p>
	        <p><label> Start Dates for Sublet </label>
		        <input type="number" name='start_m' min="1" max ="12" placeholder='mm' onChange={this.handleChange}/>
		        <input type="number" name='start_y' min="2018" max = "9999" placeholder='yyyy' onChange={this.handleChange}/></p>
		    <p><label> End Dates for Sublet </label>
		        <input type="number" name='end_m' min="1" max ="12" placeholder='mm' onChange={this.handleChange}/>
		        <input type="number" name='end_y' min="2018" max = "9999" placeholder='yyyy' onChange={this.handleChange}/></p>
		    <p><label> Off-street Parking Available? </label>
		        <input type="checkbox" checked="false" /> </p>
	        <p><label> Monthly Price </label>
		        <input type="number" name='price' placeholder='$' onChange={this.handleChange}/></p>
		    <input type="submit" value="Submit"/>
      	</form>
      </div>
    );
  }
}

export default AddList;