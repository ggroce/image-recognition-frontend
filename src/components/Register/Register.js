import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerEmail: '',
      registerPassword: '',
      registerName: ''
    };
  }

  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ registerPassword: event.target.value });
  };

  onNameChange = (event) => {
    this.setState({ registerName: event.target.value });
  };

  onSubmitRegister = () => {
    fetch('https://localhost:3001/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.registerEmail,
        password: this.state.registerPassword,
        name: this.state.registerName,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          console.log('Make sure the Name, Email, and Password fields are completed.');
        }
      });
  };

  render() {
    return (
      <article className="br2 ba b--white-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 white-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={this.onNameChange}
                  className="white-80 pa2 input-reset ba bg-transparent hover-bg-black w-100"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="white-80 pa2 input-reset ba bg-transparent hover-bg-black w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="white-80 b pa2 input-reset ba bg-transparent hover-bg-black w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={() => this.onSubmitRegister()}
                className="white-80 b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}
export default Register;
