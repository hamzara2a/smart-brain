import React from "react";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: ""
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {
        fetch("http://localhost:3000/signin", 
        {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
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
        const { onRouteChange } = this.props;
        return (
            <article className="moon-gray br3 ba b--white mv4 w-100 shadow-5 w-50-m w-25-l mw6 center">
                <main className="pa5 white-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0 moon-gray">
                        <legend className="f2 fw6 ph0 mh0 white">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f3 moon-gray" htmlFor="email-address">Email</label>
                            <input
                            className="moon-gray pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f3 white" htmlFor="password">Password</label>
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
                            value="Sign-in"
                            onClick={this.onSubmitSignIn}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p 
                            onClick={() => onRouteChange("register")}
                            href="#0" 
                            className="pointer moon-gray f4 link dim white db">
                                Register
                            </p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;