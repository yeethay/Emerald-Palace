import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faMoneyBillAlt,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import './Banner.css';

interface IProps {
  delivery?: string;
  cash?: string;
  card?: string;
  info?: string;
}

const Banner = (props: IProps) => {
  const { delivery, cash, card, info } = props;

  return (
    <div className="banner">
      <div>
        <FontAwesomeIcon icon={faCar} /> {delivery}
      </div>
      <div>
        <FontAwesomeIcon icon={faMoneyBillAlt} /> {cash}
      </div>
      <div>
        <FontAwesomeIcon icon={faCreditCard} /> {card}
      </div>
    </div>
  );
};

export default Banner;
