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
  faCar,
  faMoneyBillAlt,
  faCreditCard,
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
    <div className="menu">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="options">
        <button onClick={() => setLanguage(Languages.ENGLISH)}>
          {'en'.toUpperCase()}
        </button>
        <button onClick={() => setLanguage(Languages.CHINESE)}>
          {'zh'.toUpperCase()}
        </button>
        <button onClick={() => setLanguage(Languages.VIETNAMESE)}>
          {'vi'.toUpperCase()}
        </button>
      </div>
      <div className="left categories-list">
        {menu?.categories.map((category: ICategory, index) => (
          <a
            href={`#${(category.name as IMultiLanguageString)[
              language
            ]?.toLowerCase()}`}
          >
            <div
              className="category-selector"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${
                  images?.[category.image]
                })`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '20%',
                borderTop: '1px solid #eee',
              }}
              onClick={() => setActiveCategory(category)}
            >
              {(category.name as IMultiLanguageString)[language]}
            </div>
          </a>
        ))}
      </div>
      <div className="right active-category">
        <table>
          <tbody>
            <tr>
              <td>
                <FontAwesomeIcon icon={faCar} />
              </td>
              <td>{menu?.delivery}</td>
            </tr>
            {menu?.discounts.map((discount) => (
              <tr>
                <td>
                  <FontAwesomeIcon
                    icon={
                      discount.includes('cash') ? faMoneyBillAlt : faCreditCard
                    }
                  />
                </td>
                <td>{discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {menu?.categories.map((category) => (
          <a
            id={`${(category.name as IMultiLanguageString)[
              language
            ]?.toLowerCase()}`}
          >
            <h1>{(category.name as IMultiLanguageString)[language]}</h1>
            <table className="menu-items">
              <tbody>
                {category.items.map(({ number, name, price }) => (
                  <tr>
                    <td style={{ width: '60px' }}>{number}</td>
                    <td>{(name as IMultiLanguageString)[language]}</td>
                    <td style={{ textAlign: 'right' }}>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Menu;
