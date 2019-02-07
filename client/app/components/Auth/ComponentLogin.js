import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signin } from '../../actions/loginActions';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import { setInStorage, getFromStorage } from '../../utils/storage';

class ComponentLogin extends Component {

  state = {
    isLoading: false,
    token: '',
    signInError: '',
    signInEmail: '',
    signInPassword: ''
  };
  componentDidMount() {
    const obj = getFromStorage('the_main_app')
    if (obj && obj.token){
      const { token } = obj;
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            })
          }else{
            this.setState({
              isLoading: false,
            })
          }
        })
    }else {
      this.setState({
        isLoading: false
      })
    }
  }
  onTextBoxChangeSignInEmail = event => {
    this.setState({ signInEmail: event.target.value })
  }
  onTextBoxChangeSignInPassword = event => {
    this.setState({ signInPassword: event.target.value })
  }

  onSignIn = e =>{
    e.preventDefault()
    const {
      signInEmail,
      signInPassword
    } = this.state
    this.setState({
      isLoading: true
    })
    fetch('api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      }),
    })
    .then(res => res.json())
    .then(json => {
      console.log('json', json);
      if (json.success) {
        setInStorage('the_main_app', { token: json.token, email: signInEmail, nome: json.nome});
        const newLogin = {
          email: signInEmail,
          token: json.token
        }

        this.props.signin(newLogin);

        this.setState({
          signInError: json.message,
          isLoading: false,
          token: json.token
        });
      }else {
        this.setState({
          signInError: json.message,
          isLoading: false
        })
      }
    })
  }
  render() {
    const {
      token,
      signInError,
      signInEmail,
      signInPassword
    } = this.state;
    if (!token) {
      return (
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
                        placeholder="Password"
                        value={signInPassword}
                        onChange={this.onTextBoxChangeSignInPassword}
                      />
                    </div>
                    <button className="btn btn-primary float-right" onClick={this.onSignIn}>Submit</button>
                    <button className="btn btn-link float-left" onClick={this.onCreateAccount}>Criar conta</button>
                  </form>
                  </div>
                </div>
              </div>
              <div className='col'></div>
            </div>
          </div>
      )
    }
    return (
      <div>
        <Redirect to="/home" />
      </div>
    );
  }
}

ComponentLogin.propTypes = {
  signin: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(
  mapStateToProps,
  { signin }
)(ComponentLogin)
