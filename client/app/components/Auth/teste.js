import React, { Component } from 'react'
import { signin } from '../../actions/loginActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

class teste extends Component {

  state = {
    email: '',
    password: '',
    loading: '',
    erro: ''
  }

  onChangeEmail = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onChangePassword = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  logar = e => {
    e.preventDefault()

    const newLogin = {
      email: this.state.email,
      password: this.state.password,
      token: ''
    }

    // Add session via signin action
    this.props.signin(newLogin)

  }

  render() {
     const { session } = this.props.login

    return (
      <div>
      {session.message}
        <input
          type="text"
          placeholder="coco"
          name="email"
          onChange={this.onChangeEmail}
        />
        <input
          type="text"
          placeholder="senha"
          name="password"
          onChange={this.onChangePassword}
        />
        <button onClick={this.logar}>submit</button>
      </div>
    )
  }
}
teste.propTypes = {
  login: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  login: state.login
})

export default connect(
  mapStateToProps,
  { signin }
)(teste)
