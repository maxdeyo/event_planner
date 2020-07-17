import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import MyEvents from './routes/MyEvents.js'
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Route exact path='/' component={App} />
    <Route path='/myevents' component={MyEvents} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
