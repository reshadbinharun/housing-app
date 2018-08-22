import React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
 
class FBLogin extends React.Component{
 
  constructor (props, context) {
    super(props, context);
    this.responseFacebook = this.responseFacebook.bind(this);
  }
 
  responseFacebook (response) {
    console.log(response);
    //anything else you want to do(save to localStorage)...
    this.props.changeInfo(response);

  }
 
  render () {
    return (
      <div>
        <FacebookLogin socialId="2026285211014823"
                       language="en_US"
                       scope="public_profile,email"
                       responseHandler={this.responseFacebook}
                       xfbml={true}
                       fields="id,email,name"
                       version="v2.5"
                       className="facebook-login"
                       buttonText="Login With Facebook"/>
      </div>
    );
  }
 
}
 
export default FBLogin;