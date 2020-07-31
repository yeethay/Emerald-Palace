import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';
import TakeoutMenu from './components/Menu/TakeoutMenu';
import Contact from './components/Contact/Contact';
import './App.css';
import FirebaseHelper from './FirebaseHelper';
import { IMenu, IRestaurant } from './types/types';

function App() {
  const [ready, setReady] = useState(false);
  const [menu, setMenu] = useState<IMenu>();
  const [menuPdfUrl, setMenuPdfUrl] = useState<string>();
  const [takeoutMenu, setTakeoutMenu] = useState<IMenu>();
  const [takeoutMenuPdfUrl, setTakeoutMenuPdfUrl] = useState<string>();
  const [restaurant, setRestaurant] = useState<IRestaurant>();

  useEffect(() => {
    const filePaths = {
      menuJson: process.env.REACT_APP_MENU_JSON_PATH as string,
      menuPdf: process.env.REACT_APP_MENU_PDF_PATH as string,
      takeoutMenuJson: process.env.REACT_APP_TAKEOUT_MENU_JSON_PATH as string,
      takeoutMenuPdf: process.env.REACT_APP_TAKEOUT_MENU_PDF_PATH as string,
      restaurantJson: process.env.REACT_APP_RESTAURANT_JSON_PATH as string,
    };

    const getAllFiles = async () => {
      const fh = new FirebaseHelper();
      const menuJson = await fh.getJson(filePaths.menuJson);
      const menuPdf = await fh.getDownloadUrl(filePaths.menuPdf);
      const takeoutMenuJson = await fh.getJson(filePaths.takeoutMenuJson);
      const takeoutMenuPdf = await fh.getDownloadUrl(filePaths.takeoutMenuPdf);
      const restaurantJson = await fh.getJson(filePaths.restaurantJson);
      setMenu(menuJson);
      setMenuPdfUrl(menuPdf);
      setTakeoutMenu(takeoutMenuJson);
      setTakeoutMenuPdfUrl(takeoutMenuPdf);
      setRestaurant(restaurantJson);
      setReady(true);
    };
    getAllFiles();
  }, []);

  return (
    <Router basename="/Emerald-Palace/">
      {ready && (
        <div className="app">
          <Navbar />
          <div className="main">
            <Switch>
              <Route path="/menu">
                <Menu menu={menu} pdf={menuPdfUrl} />
              </Route>
              <Route path="/takeout-menu">
                <TakeoutMenu menu={takeoutMenu} pdf={takeoutMenuPdfUrl} />
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
      )}
    </Router>
  );
}

export default App;
