import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import User from './User'
import Home from './Home'
import Facebook from './Facebook'
import Requests from './Requests'
import Search from './Search'
import Listing from './Listing'
import logo from './home.png'
import FBLogin from './FBLogin'
//have to encapsulate all of code in <Router>
//passing in props to children component in Router: https://stackoverflow.com/questions/45898789/react-router-pass-param-to-component
class App extends Component {
  //state here
  constructor(props){
    super(props);
    //functionBinding for lifting state
    this.handleLogin = this.handleLogin.bind(this);
     this.state = {
      loggedIn: false,
      userID: '1234',
      name: 'reshad',
      email: 'reshadbinharun',
      //image: response.picture.data.url
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.updateDash = this.updateDash.bind(this);
    this.updateFB = this.updateFB.bind(this);
  }
 
  handleLogin(loggedIn, userID, name, email){
    this.setState({loggedIn, userID, name, email}); //lifting state
  }
  //<Route exact path="/profile" component={User} user={this.state} changeInfo={this.updateDash}/>
  //<Route exact path="/login" component={FBLogin}/>
  //test fucntion to lift state
  //<Route exact path="/requests" component={Requests} email={this.state.email} />
  updateDash(val){
    console.log("update called with info", val)
    this.setState({
      name: val
    })

  }

  updateFB(res){
    console.log("about to update info from facebook", res);
    this.setState({
      name:res.name,
      email: res.email
    })
  }

  render() {
    //lifting
    const loggedIn = this.state.loggedIn, userID = this.state.userID, name = this.state.name, email = this.state.email;
    //lifting
    return (
      <Router>

        <div className="App">
          <div className="row">
            <div className="App-header col-12"> <img src={logo} className="App-logo" alt="logo" /> </div>
          </div>
          <nav className = "row">
            <NavLink className = "col-2" exact to="/"> Home </NavLink>
            <NavLink className = "col-2" exact to="/login"> Login </NavLink>
            <NavLink className = "col-2" exact to="/requests"> Requests </NavLink>
            <NavLink className = "col-2" exact to="/listing"> Listings </NavLink>
            <NavLink className = "col-2" exact to="/search"> Search </NavLink>
            <NavLink className = "col-2" exact to="/profile"> Profile </NavLink>  
          </nav>
          <p> Welcome to your Dashboard, {this.state.name} </p>
          <p> You are logged into your Facebook account under email {this.state.email} </p>
          <Route exact path="/login" render={props => <FBLogin {...props} changeInfo={this.updateFB}/> } />
          <Route exact path="/" component={Home}/>
          
          <Route exact path="/profile" render={props => <User {...props} changeInfo={this.updateDash}/> } /> 
          <Route exact path="/requests" render={props => <Requests {...props} email={this.state.email}/> }/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/listing" component={Listing}/>
        
        </div>

      </Router>
    );
  }
}

export default App;
