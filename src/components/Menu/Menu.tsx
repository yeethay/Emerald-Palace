import React, { useState, useRef } from 'react';
import menu from './menu.json';
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
}

interface IItem {
  number: string;
  name: string;
  description?: string;
  price: number | number[];
}

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<ICategory>(menu[0]);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (amount: number) =>
    sliderRef.current?.scrollTo({
      left: sliderRef.current.scrollLeft + amount,
      behavior: 'smooth',
    });

  return (
    <div className="menu">
      <div className="slider-container">
        <div className="left" onClick={() => scroll(-300)}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </div>
        <div ref={sliderRef} className="slider">
          {menu.map((category: ICategory) => (
            <div
              key={category.name}
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
            {activeCategory.items.map((item: IItem) => (
              <tr key={item.number}>
                <td>{item.number}</td>
                <td>
                  <div className="name-description">
                    <div>{item.name}</div>
                    <div className="description">{item.description}</div>
                  </div>
                </td>
                {Array.isArray(item.price) ? (
                  item.price.map((p) => <td key={p}>{p}</td>)
                ) : (
                  <td>{item.price}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menu;
