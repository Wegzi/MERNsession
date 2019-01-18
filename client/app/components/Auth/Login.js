import React, { Component } from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import { signin } from '../../actions/loginActions';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  getFromStorage ,
  setInStorage,
  removeInStorage
} from '../../utils/storage';
import ComponentLogin from './Login'

class Home extends Component {

    state = {
      isLoading: false,
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpError: '',
      signUpFirstName: '',
      UpsignUpEmail: '',
      signUpPassword: '',
      createAccount: false
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
        });
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
    } = this.state;
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
          });
        }else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
  }
  onCreateAccount (){
    this.setState({ createAccount: true })
  }
  onSignIn = e =>{
    const {
      signInEmail,
      signInPassword
    } = this.state;
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
    }).then(res => res.json())
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
          });
        }
      });
  }

  logout = () => {
    this.setState({
      isLoading: true,
    })
    const obj = getFromStorage('the_main_app')
    if (obj && obj.token){
      const { token } = obj;
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            removeInStorage('the_main_app', { token: json.token });
            this.setState({
              token: '',
              isLoading: false
            })
          }else{
            this.setState({
              isLoading: false,
            })
          }
        });
    }else {
      this.setState({
        isLoading: false
      })
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassord,
      signUpError,
      signUpFirstName,
      signUpEmail,
      signUpPassword,
      createAccount
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading</p></div>);
    }
    if (!token) {
      return (
        <div>


          /* SIGNUP */

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

    return (
      <div>
        <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
      </div>
    );
  }
}

Home.propTypes = {
  signin: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  login: state.login
})
export default connect(
  mapStateToProps,
  { signin }
)(Home);
