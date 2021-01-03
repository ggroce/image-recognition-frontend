import React from 'react';

const SignIn = ({ onRouteChange }) => {
    return(
        <article className="br2 ba b--white-10 mv4 w-100 w-50-m w-25-l mw5 center">
            <main className="pa4 white-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="white-80 pa2 input-reset ba bg-transparent hover-bg-black w-100" 
                            type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="white-80 b pa2 input-reset ba bg-transparent hover-bg-black w-100" 
                            type="password" name="password"  id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={() => onRouteChange('home')} className="white-80 b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib" 
                        type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 link dim white db pointer">Register</p>
                    </div>
                </div>
            </main>
        </article>
    );
}
export default SignIn;