import React, { Component } from 'react'
import 'whatwg-fetch'
import { connect } from 'react-redux'
import { signin } from '../../actions/loginActions'
import PropTypes from 'prop-types'
import ComponentLogin from './ComponentLogin'
import { getFromStorage } from '../../utils/storage'

class Autenticate extends Component {

    state = {
      isLoading: false,
      token: '',
      signUpError: '',
      signUpFirstName: '',
      signUpEmail: '',
      UpsignUpEmail: '',
      signUpPassword: '',
      createAccount: false
    }

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


  onTextBoxChangeSignUpFirstName = event => {
    this.setState({ signUpFirstName: event.target.value })
  }
  onTextBoxChangeSignUpEmail = event => {
    this.setState({ signUpEmail: event.target.value })
  }
  onTextBoxChangeSignUpPassword = event => {
    this.setState({ signUpPassword: event.target.value })
  }

  onSignUp(){
    //post request to backend
    const {
      signUpFirstName,
      signUpEmail,
      signUpPassword
    } = this.state
    this.setState({
      isLoading: true
    })
    fetch('api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        email: signUpEmail,
        password: signUpPassword
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false
          })
        }else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          })
        }
      })
  }
  onCreateAccount = e =>{
    e.preventDefault();
    this.setState({ createAccount: true })
  }

  render() {
    const {
      isLoading,
      signUpError,
      signUpFirstName,
      signUpEmail,
      signUpPassword,
      createAccount
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading</p></div>);
    }
    if (!createAccount) {
      return(
        <div>
          <ComponentLogin />
        </div>
      );
    }
    return (
      <div>
        <div>
        {
          (signUpError) ? (
            <p>{signUpError}</p>
          ) : (null)
        }
          <p>Sign Up</p>
          <label>Nome:</label><br />
          <input
            type='text'
            value={signUpFirstName}
            onChange={this.onTextBoxChangeSignUpFirstName}
          />
          <br />
          <label>Email:</label><br />
          <input
            type='email'
            value={signUpEmail}
            onChange={this.onTextBoxChangeSignUpEmail}
          />
          <br />
          <label>Password</label><br />
          <input
            type='password'
            value={signUpPassword}
            onChange={this.onTextBoxChangeSignUpPassword}
          />
          <br />
          <button onClick={this.onSignUp}>Sign up</button>
        </div>
      </div>
    );
  }
}

Autenticate.propTypes = {
  signin: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  login: state.login
})
export default connect(
  mapStateToProps,
  { signin }
)(Autenticate);
