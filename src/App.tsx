import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';
import TakeoutMenu from './components/Menu/TakeoutMenu';
import Contact from './components/Contact/Contact';
import './App.css';
import storageRetriever from './storageRetriever';
import { IMenu, IRestaurant } from './types/types';

function App() {
  const [menu, setMenu] = useState<IMenu>();
  const [takeoutMenu, setTakeoutMenu] = useState<IMenu>();
  const [restaurant, setRestaurant] = useState<IRestaurant>();

  useEffect(() => {
    const getAllFiles = async () => {
      const menuJson = await storageRetriever('menu.json');
      const takeoutMenuJson = await storageRetriever('takeout-menu.json');
      const restaurantJson = await storageRetriever('restaurant.json');
      setMenu(menuJson);
      setTakeoutMenu(takeoutMenuJson);
      setRestaurant(restaurantJson);
    };
    getAllFiles();
  }, []);

  return (
    <Router basename="/Emerald-Palace/">
      <div className="app">
        <Navbar />
        <div className="main">
          <Switch>
            <Route path="/menu">
              <Menu menu={menu} />
            </Route>
            <Route path="/takeout-menu">
              <TakeoutMenu menu={takeoutMenu} />
            </Route>
            <Route path="/contact">
              <Contact restaurant={restaurant} />
            </Route>
            <Route path="/">
              <Home restaurant={restaurant} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
