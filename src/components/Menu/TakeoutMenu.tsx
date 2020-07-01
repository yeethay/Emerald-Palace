import React, { useState, useRef, useEffect } from 'react';
import Banner from '../Banner/Banner';
import menu from './takeout-menu.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './Menu.css';

interface ICategory {
  name: string;
  image: string;
  items: IItem[];
  entrees?: IEntree[];
}

interface IEntree {
  number: string;
  name: string;
}

interface IItem {
  number?: string;
  name: string;
  description?: string;
  price: string | string[];
}

const TakeoutMenu = () => {
  const [activeCategory, setActiveCategory] = useState<ICategory>(
    menu.categories[0]
  );
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (amount: number) =>
    sliderRef.current?.scrollTo({
      left: sliderRef.current.scrollLeft + amount,
      behavior: 'smooth',
    });

  useEffect(() => {
    document.title = 'Takeout Menu | Emerald Palace';
  }, []);

  return (
    <div className="menu">
      <Banner message={menu.delivery} tooltipMessages={menu.discounts}></Banner>
      <div className="slider-container">
        <div className="left" onClick={() => scroll(-300)}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </div>
        <div ref={sliderRef} className="slider">
          {menu.categories.map((category: ICategory, index) => (
            <div
              key={index}
              className="category"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${category.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={() => setActiveCategory(category)}
            >
              {category.name}
            </div>
          ))}
        </div>
        <div className="right" onClick={() => scroll(300)}>
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </div>
      </div>
      <div className="active-category">
        <h1>{activeCategory.name}</h1>
        <table>
          <tbody>
            {activeCategory.items.some((item) => Array.isArray(item.price)) && (
              <tr>
                <th></th>
                <th></th>
                <th>Small</th>
                <th>Large</th>
              </tr>
            )}
            {activeCategory.items.map((item: IItem, index) => (
              <tr key={index}>
                {item.number && <td className="number">{item.number}</td>}
                <td className="name">
                  <div>
                    <div>{item.name}</div>
                    <div className="description">{item.description}</div>
                  </div>
                </td>
                {Array.isArray(item.price) ? (
                  item.price.map((p, index) => <td key={index}>{p}</td>)
                ) : (
                  <td className="price">{item.price}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {activeCategory.name === 'Dinner Specials' && (
          <>
            <h1>Entrées</h1>
            <table>
              <tbody>
                {activeCategory.entrees?.map((entree: IEntree, index) => (
                  <tr key={index}>
                    <td>{entree.number}</td>
                    <td>{entree.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default TakeoutMenu;
