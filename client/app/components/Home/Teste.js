import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signin } from '../../actions/loginActions';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import {
  getFromStorage ,
  setInStorage
} from '../../utils/storage'

class Teste extends Component {

  state = {
    email: '',
    token:'coco'
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSignIn = e => {
    console.log('here')
    e.preventDefault();

    var token = setInStorage('the_main_app', { token: 'json.token' });
    const newLogin = {
      email: this.state.email,
      token: token
    }
    console.log(newLogin)
    this.props.signin(newLogin);
  }

  render() {
    return (
      <div>
        <div>
          <p>Sign in</p>
          <label>Email:</label><br />
          <input name='email' type='email' onChange={this.onChange} />
          <br />
          <label>Password</label><br />
          <input type='password' />
          <br />
          <button onClick={this.onSignIn}>Sign in</button>
        </div>
      </div>
    );
  }
}

Teste.propTypes = {
  signin: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  login: state.login
})
export default connect(
  mapStateToProps,
  { signin }
)(Teste);
