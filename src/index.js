import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Details from './Details.jsx';
import Login from './Login.jsx'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
// window.$count=0;

ReactDOM.render(
  
    <Router>
      <Switch>

        <Route path="/details" component={Details} /> 

        <Route path="/Myntra" component={App}/> 
        
        <Route path="/" component={Login} /> 
      
      </Switch>
    </Router>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
