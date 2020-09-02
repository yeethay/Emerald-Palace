import React, { useState, useEffect } from 'react';
import Banner from '../Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ICategory,
  IMenu,
  IMultiLanguageString,
  Languages,
} from '../../types/types';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './Menu.css';

const Menu = (props: {
  menu?: IMenu;
  pdf?: string;
  images?: { [key: string]: string };
}) => {
  const { menu, pdf, images } = props;
  const [language, setLanguage] = useState(Languages.ENGLISH);
  const [showBannerOnMobile, setShowBannerOnMobile] = useState(false);

  useEffect(() => {
    document.title = 'Menu | Emerald Palace';
  }, []);

  interface ILanguageToggle {
    label: string;
    identifier: Languages;
  }

  const LanguageToggle = ({ label, identifier }: ILanguageToggle) => (
    <button
      className={`language-toggle ${language === identifier && 'active'}`}
      onClick={() => setLanguage(identifier)}
    >
      {label}
    </button>
  );

  return (
    <div className="menu">
      <Banner
        className={showBannerOnMobile ? 'show' : ''}
        discounts={menu?.discounts}
      />
      <div className="options">
        <button
          className="deals-toggle"
          onClick={() => setShowBannerOnMobile(!showBannerOnMobile)}
        >
          Deals
        </button>
        <LanguageToggle label="English" identifier={Languages.ENGLISH} />
        <LanguageToggle label="繁體中文" identifier={Languages.CHINESE} />
        <LanguageToggle label="Tiếng Việt" identifier={Languages.VIETNAMESE} />
        <a href={pdf} target="_blank" rel="noopener noreferrer">
          <button>
            <FontAwesomeIcon icon={faExternalLinkAlt} /> PDF
          </button>
        </a>
      </div>
      <div className="left categories-list">
        {menu?.categories.map((category: ICategory, index) => (
          <a
            key={index}
            href={`#${(category.name as IMultiLanguageString)[
              Languages.ENGLISH
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
              }}
            >
              {(category.name as IMultiLanguageString)[language]}
            </div>
          </a>
        ))}
      </div>
      <div className="right">
        {menu?.categories.map((category, index) => (
          <div key={index}>
            <a
              key={index}
              id={`${(category.name as IMultiLanguageString)[
                Languages.ENGLISH
              ]?.toLowerCase()}`}
              href={`#${(category.name as IMultiLanguageString)[
                Languages.ENGLISH
              ]?.toLowerCase()}`}
            >
              <h1>{(category.name as IMultiLanguageString)[language]}</h1>
            </a>
            <table className="menu-items">
              <tbody>
                {category.items.map(({ number, name, price }, index) => (
                  <tr key={index}>
                    <td className="item-number">{number}</td>
                    <td className="item-name">
                      {(name as IMultiLanguageString)[language]}
                    </td>
                    <td className="item-price">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
