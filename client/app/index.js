import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import { PrivateRoute } from './components/PrivateRoute';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import teste from './components/Auth/teste';

import HelloWorld from './components/HelloWorld/HelloWorld';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Provider store={store} >
        <Header />
        <Switch>
          <Route exact path="/" component={teste}/>
          <PrivateRoute path="/home" component={Home}/>
          <PrivateRoute path="/helloworld" component={HelloWorld}/>
          <Route component={NotFound}/>
        </Switch>
      <Footer />
      </Provider>
    </App>
  </Router>
), document.getElementById('app'));
