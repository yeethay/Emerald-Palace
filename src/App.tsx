import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Menu from './components/Menu/Menu';
import TakeoutMenu from './components/Menu/TakeoutMenu';
import Contact from './components/Contact/Contact';
import './App.css';
import FirebaseHelper from './FirebaseHelper';
import { IMenu, IRestaurant, ICategory } from './types/types';

function App() {
  const [ready, setReady] = useState(false);
  const [menu, setMenu] = useState<IMenu>();
  const [menuPdfUrl, setMenuPdfUrl] = useState<string>();
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [takeoutMenu, setTakeoutMenu] = useState<IMenu>();
  const [takeoutMenuPdfUrl, setTakeoutMenuPdfUrl] = useState<string>();
  const [restaurant, setRestaurant] = useState<IRestaurant>();
  const [backgroundUrl, setBackgroundUrl] = useState<string>();

  useEffect(() => {
    const filePaths = {
      menuJson: 'menu.json',
      menuPdf: 'pdfs/traditional-menu.pdf',
      takeoutMenuJson: 'takeout-menu.json',
      takeoutMenuPdf: 'pdfs/takeout-menu.pdf',
      restaurantJson: 'restaurant.json',
      backgroundImage: 'images/background.jpg',
    };

    const getAllFiles = async () => {
      const fh = new FirebaseHelper();
      try {
        const menuJson = await fh.getJson(filePaths.menuJson);
        setMenu(menuJson);
      } catch (err) {
        console.error(err);
      }
      try {
        const menuPdf = await fh.getDownloadUrl(filePaths.menuPdf);
        setMenuPdfUrl(menuPdf);
      } catch (err) {
        console.error(err);
      }
      try {
        const takeoutMenuJson = await fh.getJson(filePaths.takeoutMenuJson);
        setTakeoutMenu(takeoutMenuJson);
      } catch (err) {
        console.error(err);
      }
      try {
        const takeoutMenuPdf = await fh.getDownloadUrl(
          filePaths.takeoutMenuPdf
        );
        setTakeoutMenuPdfUrl(takeoutMenuPdf);
      } catch (err) {
        console.error(err);
      }
      try {
        const restaurantJson = await fh.getJson(filePaths.restaurantJson);
        setRestaurant(restaurantJson);
      } catch (err) {
        console.error(err);
      }
      try {
        const background = await fh.getDownloadUrl(filePaths.backgroundImage);
        setBackgroundUrl(background);
      } catch (err) {
        console.error(err);
      }
      setReady(true);
    };
    getAllFiles();
  }, []);

  useEffect(() => {
    const getImagesFromMenuJson = async () => {
      const fh = new FirebaseHelper();
      const updateImageMap = async (category: ICategory) => {
        try {
          const imageUrl = await fh.getDownloadUrl(category.image);
          setImages((prev) => {
            return { ...prev, [category.image]: imageUrl };
          });
        } catch (err) {
          console.error(err);
        }
      };
      menu?.categories.forEach(updateImageMap);
      takeoutMenu?.categories.forEach(updateImageMap);
    };
    try {
      getImagesFromMenuJson();
    } catch (err) {
      console.error(err);
    }
  }, [menu, takeoutMenu]);

  return (
    <Router basename="/Emerald-Palace/">
      {ready && (
        <div className="app">
          <Navbar />
          <div className="main">
            <Switch>
              <Route path="/menu">
                <Menu menu={menu} pdf={menuPdfUrl} images={images} />
              </Route>
              <Route path="/takeout-menu">
                <TakeoutMenu
                  menu={takeoutMenu}
                  pdf={takeoutMenuPdfUrl}
                  images={images}
                />
              </Route>
              <Route path="/contact">
                <Contact restaurant={restaurant} />
              </Route>
              <Route path="/">
                <Home restaurant={restaurant} background={backgroundUrl} />
              </Route>
            </Switch>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
