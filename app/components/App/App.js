import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from '../../routes'

const App = ({ store }) => (
  <Provider store={store}>
    <Router routes={routes(store)} history={browserHistory} />
  </Provider>
)

App.propTypes = {
  store: PropTypes.object.isRequired, //eslint-disable-line react/forbid-prop-types
}

export default App
