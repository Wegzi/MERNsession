import React, { Component } from 'react';

class ComponentLogin extends Component {
  render() {
    return(
      <div>
        <div className='container'>
          <div className='row mt-5'>
            <div className='col'></div>
            <div className='col-sm-auto'>
              <div className='card shadow border-0'>
                <div className='card-body'>
                <h5 className='card-title m-3 text-center'>Login</h5>
                <form>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={signInEmail}
                      onChange={this.onTextBoxChangeSignInEmail}
                      placeholder="Enter email"
                    />
                    {
                      (signInError) ? (
                        <p>{signInError}</p>
                      ) : (null)
                    }
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      value={signInPassord}
                      onChange={this.onTextBoxChangeSignInPassword}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary float-right" onClick={this.onSignIn}>Submit</button>
                  <button type="submit" className="btn btn-link float-left" onClick={this.onCreateAccount}>Criar conta</button>
                </form>
                </div>
              </div>
            </div>
            <div className='col'></div>
          </div>
        </div>
      </div>
    );
  }
}
export default ComponentLogin;
