import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './utils/Routes'
import App from './components/App/App'

import './styles/styles.scss'

render((
    <App>
      <Provider store={store} >
        <Routes/>
      </Provider>
    </App>
), document.getElementById('app'))
