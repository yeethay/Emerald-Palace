import React, { useState, useRef, useEffect } from 'react';
import Banner from '../Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ICategory,
  IItem,
  IMenu,
  IMultiLanguageString,
  Languages,
} from '../../types/types';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './Menu.css';

const Menu = (props: {
  menu?: IMenu;
  pdf?: string;
  images?: { [key: string]: string };
}) => {
  const { menu, pdf, images } = props;
  const [language, setLanguage] = useState(Languages.ENGLISH);
  const [showBanner, setShowBanner] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ICategory>();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (amount: number) =>
    sliderRef.current?.scrollTo({
      left: sliderRef.current.scrollLeft + amount,
      behavior: 'smooth',
    });

  useEffect(() => {
    setActiveCategory(menu?.categories[0]);
  }, [menu]);

  useEffect(() => {
    document.title = 'Menu | Emerald Palace';
  }, []);

  return (
    <div className={`menu ${showBanner && 'lower'}`}>
      <Banner
        show={showBanner}
        setShow={setShowBanner}
        message={menu?.delivery}
        tooltipMessages={menu?.discounts}
      />
      <div className="options">
        <button
          className={`${language === Languages.ENGLISH && 'active'}`}
          onClick={() => setLanguage(Languages.ENGLISH)}
        >
          English
        </button>
        <button
          className={`${language === Languages.CHINESE && 'active'}`}
          onClick={() => setLanguage(Languages.CHINESE)}
        >
          繁體中文
        </button>
        <button
          className={`${language === Languages.VIETNAMESE && 'active'}`}
          onClick={() => setLanguage(Languages.VIETNAMESE)}
        >
          Tiếng Việt
        </button>
        <div className="separator"></div>
        <a href={pdf}>
          <button>PDF Version</button>
        </a>
      </div>
      <div className="slider-container">
        <div className="left" onClick={() => scroll(-500)}>
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </div>
        <div ref={sliderRef} className="slider">
          {menu?.categories.map((category: ICategory, index) => {
            return (
              <div
                key={index}
                className="category"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${
                    images![category.image]
                  })`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
                onClick={() => setActiveCategory(category)}
              >
                <span>{(category.name as IMultiLanguageString)[language]}</span>
              </div>
            );
          })}
        </div>
        <div className="right" onClick={() => scroll(500)}>
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </div>
      </div>
      <div className="active-category">
        <div className="flex row">
          {activeCategory && (
            <h1>{(activeCategory?.name as IMultiLanguageString)[language]}</h1>
          )}
        </div>
        {activeCategory?.description && (
          <div className="description">
            <span>{activeCategory?.description[language]}</span>
          </div>
        )}
        <table>
          <tbody>
            {activeCategory?.items.map(
              ({ number, name, price }: IItem, index) => (
                <tr key={index}>
                  <td className="number">{number}</td>
                  <td className="name">
                    <span>{(name as IMultiLanguageString)[language]}</span>
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
