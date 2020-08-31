import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICategory, IEntree, IMenu } from '../../types/types';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './Menu.css';

const TakeoutMenu = (props: {
  menu?: IMenu;
  pdf?: string;
  images?: { [key: string]: string };
}) => {
  const { menu, pdf, images } = props;
  const [showBannerOnMobile, setShowBannerOnMobile] = useState(false);

  useEffect(() => {
    document.title = 'Takeout Menu | Emerald Palace';
  }, []);

  return (
    <div className="menu">
      <Banner
        className={showBannerOnMobile ? 'show' : ''}
        delivery={menu?.discounts.delivery}
        cash={menu?.discounts.cash}
        card={menu?.discounts.card}
      />
      <div className="options">
        <button
          className="deals-toggle"
          onClick={() => setShowBannerOnMobile(!showBannerOnMobile)}
        >
          Deals
        </button>
        <a href={pdf} target="_blank" rel="noopener noreferrer">
          <button>
            <FontAwesomeIcon icon={faExternalLinkAlt} /> PDF
          </button>
        </a>
      </div>
      <div className="left categories-list">
        {menu?.categories.map((category: ICategory, index) => (
          <a key={index} href={`#${category.name}`}>
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
              {category.name}
            </div>
          </a>
        ))}
      </div>
      <div className="right">
        {menu?.categories.map((category, index) => (
          <div key={index}>
            <a id={`${category.name}`} href={`#${category.name}`}>
              <h1>{category.name}</h1>
            </a>
            <table className="menu-items">
              <tbody>
                {category.name === 'Soup' && (
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="item-price">Small</td>
                    <td className="item-price">Large</td>
                  </tr>
                )}
                {category.items.map(
                  ({ number, name, description, price }, index) => (
                    <tr key={index}>
                      {number && <td className="item-number">{number}</td>}
                      <td className="item-name">
                        <div>{name}</div>
                        <div className="item-description">{description}</div>
                      </td>
                      {typeof price === 'string' ? (
                        <td className="item-price">{price}</td>
                      ) : (
                        price.map((p, index) => (
                          <td key={index} className="item-price">
                            {p}
                          </td>
                        ))
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
            {category?.name === 'Dinner Specials' && (
              <>
                <h2>Entrées</h2>
                <table className="menu-items">
                  <tbody>
                    {category?.entrees?.map((entree: IEntree, index) => (
                      <tr key={index}>
                        <td className="item-number">{entree.number}</td>
                        <td className="item-name">{entree.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TakeoutMenu;
