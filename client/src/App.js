import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Alerts from './components/layouts/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';

// Contact State
import ContactState from './context/contact/ContactState';
// Auth State
import AuthState from './context/auth/AuthState';
// Alert State
import AlertState from './context/alert/AlertState';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar></Navbar>
              <div className='container'>
                <Alerts></Alerts>
                <Switch>
                  <Route exact path='/' component={Home}></Route>
                  <Route exact path='/about' component={About}></Route>
                  <Route exact path='/register' component={Register}></Route>
                  <Route exact path='/login' component={Login}></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
