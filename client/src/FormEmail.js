import React, { Component } from 'react';
import './Form.css'
import axios from 'axios'
//import Select from 'react-select-plus'


/*

<Select
  name="form-field-name"
  value="one"
  options={options}
  onChange={this.selectSchool}
/>

for (var i = 0; i < schools.length; i++){
	options.push({'value': schools[i], 'label': schools[i]})
}
console.log(options);
			

*/
export default class FormEmail extends Component {
	constructor(props){
		super(props);
		this.state = {
			school: '',
			allSchools: [],
			email_validate: ''
		}
		this.selectSchool = this.selectSchool.bind(this);
		this.populateSchools = this.populateSchools.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.sanitizeAndValidate = this.sanitizeAndValidate.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);

	}

	//usingglobal ignore regex: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
	sanitizeAndValidate(e){
		e.preventDefault();
		//var regex = '/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi'
		var email_str = this.state.email_validate;
		var email = email_str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		console.log("after replace", email)
		this.setState({
			email_validate: email
		}, console.log("sanitized email is ", this.state.email_validate)).then( () => {
			axios.post('/requestValidationEmail', {email: this.state.email_validate}).then(function(response){
				//handle response after having sent validation email
			}).catch(function (error) {
		    console.log(error);
		  });
		})

	}

	componentWillMount(){
		console.log("component mounted")
		axios.get('/loadUnis').then(res => {
			console.log(res.data[0].supported);
			var school_choices = res.data[0].supported;
			school_choices.unshift('Select School') //adds to beginning of array
			this.setState({
				allSchools: res.data[0].supported
			})
		})
	}

	//ever being used
	selectSchool(e){
		this.setState({
			school: e.target.value
		})
	}


	populateSchools(schools){
		return schools.map(function(school){
			return(
			<option value = {school} key ={school}> {school}</option>)
		})
	}

	handleChange(e){
		e.preventDefault();
		console.log(e.target.value);
		this.setState({
			[e.target.name]: e.target.value
		}, console.log("school changed to" ,this.state.email_validate))
	}


	render(){
		//after school is confirmed as being on the list
		if (this.state.school!= ''){
			return(
		        <div className= "int-box">
			        <form onSubmit={this.sanitizeAndValidate}>
				        <div>
					        <label htmlFor="email"> Institution Email </label>
					        <input id = "email" value={this.state.email_validate} type="text" name="email_validate" onChange={this.handleChange}/>@{this.state.school}.edu
					        
					    </div>
					    <div>
					    	<input type="submit" value="Submit"/>
					    </div>
		        </form>
		        </div>
	        )
		}
		else{
			const schools = this.state.allSchools;
			var options;
			return(
		        <div>
		        	<form onSubmit ={this.handleChange}>
						<label> Select your institution </label>
					    <select name = "school" options= {schools} onChange={this.handleChange}>
					      {this.populateSchools(schools)}
					    </select>
					    <input type="submit" value="Submit"/>
					</form>
		        </div>
	        )
		}
    }
}