import React, { Component } from 'react'
import 'whatwg-fetch'
import { connect } from 'react-redux'
import { signin } from '../../actions/loginActions'
import PropTypes from 'prop-types'
import {
  getFromStorage,
  removeInStorage
} from '../../utils/storage'
import { Redirect } from 'react-router-dom'

class ComponentLogout extends Component {

  state = {
    isLoading: false,
    token: ''
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
        });
    }else {
      this.setState({
        isLoading: false
      })
    }
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
      token,
    } = this.state;
    if (token) {
      return (
        <button
          className="btn btn-danger float-right"
          onClick={this.logout}
        >
          logout
        </button>
      )
    }
    return(
      <div>
        <Redirect to='/home' />
      </div>
    )
  }
}
ComponentLogout.propTypes = {
  signin: PropTypes.func.isRequired,
  login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(
  mapStateToProps,
  { signin }
)(ComponentLogout)
