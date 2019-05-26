import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
import Dashboard from './containers/Dashboard';

import reducers from './reducers';
import sagas from './sagas';
import history from './helpers/history';

import './App.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas)

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { isAuthenticated: false };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if(token) {
      this.setState({ isAuthenticated: true });
      history.push('/dashboard')
    } else {
      this.setState({ isAuthenticated: false });
    }
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute
              exact 
              path="/dashboard" 
              component={Dashboard}
              isAuthenticated={isAuthenticated} 
            />
            <PrivateRoute
              exact 
              path="/pokemons" 
              component={Dashboard}
              isAuthenticated={isAuthenticated} 
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        (isAuthenticated || localStorage.getItem('token')) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default App;
