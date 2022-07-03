import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        email: "",
        password: ""
    }
}

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render() { 
    return (
      <article className="pa4 moon-gray br3 ba b--white mv4 w-100 shadow-5 w-50-m w-25-l mw6 center">
          <main className="pa4 black-80">
              <div className="measure">
                  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="moon-gray f2 fw6 ph0 mh0">Register</legend>
                  <div className="mt3">
                      <label className="moon-gray db fw6 lh-copy f3" htmlFor="name">Name</label>
                      <input 
                      className="moon-gray pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                      type="name" 
                      name="email-address"  
                      id="name"
                      onChange={this.onNameChange}
                      />
                  </div>
                  <div className="mt3">
                      <label className="moon-gray db fw6 lh-copy f3" htmlFor="email-address">Email</label>
                      <input 
                      className="moon-gray pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                      type="email" 
                      name="email-address"  
                      id="email-address"
                      onChange={this.onEmailChange}
                      />
                  </div>
                  <div className="mv3">
                      <label className="moon-gray db fw6 lh-copy f3" htmlFor="password">Password</label>
                      <input 
                      className="moon-gray b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                      type="password" 
                      name="password"  
                      id="password"
                      onChange={this.onPasswordChange}
                      />
                  </div>
                  </fieldset>
                  <div className="">
                  <input 
                  className="moon-gray b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f2 dib" 
                  type="submit" 
                  value="Register"
                  onClick={this.onSubmitSignIn}
                  />
                  </div>
              </div>
          </main>
      </article>
    );

  }
}

export default Register;