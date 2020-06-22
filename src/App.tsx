import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';
import TakeoutMenu from './components/Menu/TakeoutMenu';
import Contact from './components/Contact/Contact';
import './App.css';

function App() {
  return (
    <Router basename="/Emerald-Palace/">
      <div className="app">
        <Navbar />
        <div className="main">
          <Switch>
            <Route path="/menu">
              <Menu />
            </Route>
            <Route path="/takeout-menu">
              <TakeoutMenu />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
