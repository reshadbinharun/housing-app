import React, { Component } from 'react';
import './Form.css'
import axios from 'axios'

export default class FormEmail extends Component {
	constructor(props){
		super(props);
		this.state = {
			school: '',
			allSchools: []
		}
		this.selectSchool = this.selectSchool.bind(this);
		this.populateSchools = this.populateSchools.bind(this);
		this.handleChange = this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);

	}

	componentWillMount(){
		console.log("component mounted")
		axios.get('/loadUnis').then(res => {
			console.log(res.data[0].supported);
			this.setState({
				allSchools: res.data[0].supported
			})
		})
	}

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
		console.log(e.target);
		this.setState({
			school: e.target.value
		}, console.log("school changed to" ,this.state.school))
	}


	render(){
		if (this.state.school!= ''){
			return(
		        <div className= "int-box">
			        <form onSubmit={this.handleSubmit}>
			        
				        <p><label> Institution Email </label></p>
				    
				    <input type="submit" value="Submit"/>
		        </form>
		        </div>
	        )
		}
		else{
			const schools = this.state.allSchools;
			console.log(schools);
			return(
		        <div className= "int-box">
		        <p> Select your institution </p>
		        <form onSubmit = {this.handleChange}>
				    <select>
			          {this.populateSchools(schools)}
			        </select>
			        <input type = "submit" value="Submit"> </input>
			    </form>
		        </div>
	        )
		}
    }
}