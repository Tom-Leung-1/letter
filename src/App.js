import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./components/Home";
import Contact from "./components/ContactUs";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/contact" component={Contact}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
