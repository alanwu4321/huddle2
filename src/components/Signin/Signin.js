import React from 'react';
import './signin.css';


class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  returnUser = () =>{
    this.props.signUpType('Fan'); 
    this.props.onRouteChange('register');
  }
  returnOrganizer = () =>{
    this.props.signUpType('Organizer'); 
    this.props.onRouteChange('register');
  }

  onSubmitSignIn = () => {
    console.log("asdf")
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json',
      'Accept': 'application/json'},
      body: JSON.stringify({  //cannot just send a java script object, so turn it to json 
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json()) //so we can read the response from the server
.then(user => {
if (user.id) {  //if there is an id 
  console.log("this is id"+user)
           this.props.loadUser(user)
           this.props.onRouteChange('home');
       }

  
})
      // .then(response => response.json())
      // .then(user => {
      //   if (user.id) {  //if there is an id 
      //     this.props.loadUser(user)
      //     this.props.onRouteChange('home');
      //   }
      // })
  }

  render() {
    const { onRouteChange } = this.props;  //class thing 
    
    return (
      <div className="outer">
      <article className="outer middle br3 ba b--black-10 mt3 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
          <img className="logosignin" src={require("../../assets/black.png")} />
            <fieldset id="sign_up" className="ba white b--transparent ph0 mh0">
            
              <legend className="f1 fw6 ph0 mh0 signintext">Sign In</legend>
              <div className="mt3">
                <label className="db email fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db pw fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b signinb ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              
            </div>
          </div>
          <hr ></hr>

         <p  onClick={() => onRouteChange('register')} className=" link dim pointer register">Are you...</p>
         <div className="fr w-35 ">
              <input
                onClick={this.returnUser}
                className="b regb ph3 pv2 input-reset ba  bg-transparent grow pointer f6 dib user"
                type="submit"
                value="A Fan"
              />
            </div>
            <div className="fr w-50">
              <input
                onClick={this.returnOrganizer}
                className="b regb ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib owner"
                type="submit"
                value="An Organization"
              />
            </div>
        </main>
      </article>
      </div>
    );
  }
}

export default Signin;