import React, { Component } from 'react';
import GoogleLogin,{GoogleLogout} from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
class LoginWithSocial extends Component {
     responseGoogle = (response) => {
        console.log("google response",response);
        let profile = response.getBasicProfile();
      
        let params = {
            name: profile.getName(),
            email:profile.getEmail()
        }


        this.props.loginWithSocial(params)
      }
       responseFacebook = (response) => {
           console.log("facebook response",response)
        let params = {          
        }
        this.props.loginWithSocial(params)

      }

      onSuccess = () =>{
          console.log("google logout succefully")
      }
    render(){
       
        return(
            <div>
                <FacebookLogin
                    appId="721957904980523" //APP ID NOT CREATED YET
                    buttonText="Facebook"
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    textButton="Facebook"
                    className="facebookLogin"
                />
                <GoogleLogin
                    clientId="803783083274-8ap09031kharnrop2ii5mkqh85jvkao4.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                    buttonText="GOOGLE"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    className="googleLogin"
                />
            </div>
        )
    }
}
export default LoginWithSocial;