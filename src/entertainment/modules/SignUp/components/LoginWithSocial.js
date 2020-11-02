import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
class LoginWithSocial extends Component {
    render(){
        const responseGoogle = (response) => {
            console.log(response);
            var profile = response.getBasicProfile();
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
          }
          const responseFacebook = (response) => {
            console.log(response);
          }
        return(
            <div>
                <FacebookLogin
                    appId="721957904980523" //APP ID NOT CREATED YET
                    buttonText="Facebook"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    textButton="Facebook"
                    className="facebookLogin"
                />
                <GoogleLogin
                    clientId="803783083274-8ap09031kharnrop2ii5mkqh85jvkao4.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                    buttonText="GOOGLE"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    className="googleLogin"
                />
            </div>
        )
    }
}
export default LoginWithSocial;