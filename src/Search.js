import React, { Component } from 'react';
import Logout from './Logout'
import Form from './Form'
import Results from './Results'

class Search extends Component {

  render() {
    return (
      <div>
      	<Logout />
        <p> Welcome to Search! </p>
        <Form/>
        <Results/>
      </div>
    );
  }
}

export default Search;