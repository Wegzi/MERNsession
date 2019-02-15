import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getSession } from '../../actions/loginActions'
import { logout } from '../../actions/loginActions'

class Header extends React.Component{

  state = {
    nome: '',
    email: '',
    token: ''
  }

  componentDidMount(){
    this.props.getSession()
  }

  sair = e => {
    e.preventDefault()
    this.props.logout()
  }


  render() {
    const { session } = this.props.login
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/helloworld" className="navbar-brand" href="#">brand</Link>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link to="/" className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/helloworld" className="nav-link active" href="#">Link</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              {
                session.token ?
                <button
                  className="btn btn-danger my-2 my-sm-0"
                  type="submit"
                  onclick
                  onClick={this.sair}
                >Sair</button> :
                null
              }
            </form>
          </div>
        </nav>
      </header>
    )
  }
}
Header.propTypes = {
  login: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  login: state.login
})

export default connect(
  mapStateToProps,
  { getSession, logout }
)(Header)
