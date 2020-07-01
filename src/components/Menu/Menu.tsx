import React, { useState, useRef, useEffect } from 'react';
import Banner from '../Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import menu from './menu.json';
import './Menu.css';

interface ICategory {
  name: IMultiLanguageString;
  image: string;
  items: IItem[];
  description?: IMultiLanguageString;
}

interface IMultiLanguageString {
  en: string;
  zh: string;
  vi: string;
}

interface IItem {
  number: string;
  name: IMultiLanguageString;
  price: string;
}

enum Languages {
  ENGLISH = 'en',
  CHINESE = 'zh',
  VIETNAMESE = 'vi',
}

const Menu = () => {
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
    document.title = 'Menu | Emerald Palace';
  }, []);

  return (
    <div className="menu">
      <Banner message={menu.delivery} tooltipMessages={menu.discounts} />
      <div className="slider-container">
        <div className="left" onClick={() => scroll(-500)}>
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
              <span>{category.name[Languages.CHINESE]}</span>
              <span>{category.name[Languages.ENGLISH]}</span>
              <span>{category.name[Languages.VIETNAMESE]}</span>
            </div>
          ))}
        </div>
        <div className="right" onClick={() => scroll(500)}>
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </div>
      </div>
      <div className="active-category">
        <div className="flex row">
          <h1>{activeCategory.name[Languages.CHINESE]}</h1>
          <h1>{activeCategory.name[Languages.ENGLISH]}</h1>
          <h1>{activeCategory.name[Languages.VIETNAMESE]}</h1>
        </div>
        {activeCategory.description && (
          <div className="description">
            <span>{activeCategory.description[Languages.CHINESE]}</span>
            <span>{activeCategory.description[Languages.ENGLISH]}</span>
            <span>{activeCategory.description[Languages.VIETNAMESE]}</span>
          </div>
        )}
        <table>
          <tbody>
            {activeCategory.items.map(
              ({ number, name, price }: IItem, index) => (
                <tr key={index}>
                  <td className="number">{number}</td>
                  <td className="name">
                    <span>{name[Languages.CHINESE]}</span>
                    <span>{name[Languages.ENGLISH]}</span>
                    <span>{name[Languages.VIETNAMESE]}</span>
                  </td>
                  <td className="price">{price}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menu;
