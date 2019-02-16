import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NotFound from '../components/App/NotFound'
import Home from '../components/Home/Home'
import teste from '../components/Auth/teste'
import HelloWorld from '../components/HelloWorld/HelloWorld'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { PrivateRoute } from './PrivateRoute'

class Routes extends Component {

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={teste}/>
            <PrivateRoute exact path="/home" component={Home} authed={this.props.login} />
            <Route exact path="/helloworld" component={HelloWorld}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }

}
const mapStateToProps = state => ({ login: state.login })
export default connect(mapStateToProps)(Routes)
