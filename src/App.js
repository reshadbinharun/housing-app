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
      userID: '',
      name: '',
      email: '',
      //image: response.picture.data.url
    }
  }
 
  handleLogin(loggedIn, userID, name, email){
    this.setState({loggedIn, userID, name, email}); //lifting state
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
            <NavLink className = "col-2" exact to="/User:username"> Profile </NavLink>  
          </nav>
          <Facebook/>
          <Route exact path="/login" component={Facebook}/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/User:username" render={(props) => <User user={this.state.user} {...props} /> } />
          <Route exact path="/requests" component={Requests}/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/listing" component={Listing}/>
        
        </div>

      </Router>
    );
  }
}

export default App;
