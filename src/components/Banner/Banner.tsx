import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faMoneyBillAlt,
  faCreditCard,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import './Banner.css';
import { IDiscount } from '../../types/types';

interface IProps {
  className?: string;
  discounts?: IDiscount[];
}

const Banner = (props: IProps) => {
  const { className, discounts } = props;
  const icons: { [key: string]: IconDefinition } = {
    delivery: faCar,
    cash: faMoneyBillAlt,
    card: faCreditCard,
  };

  return (
    <div className={`banner ${className}`}>
      {discounts?.map((discount) => (
        <BannerItem
          description={discount.description}
          icon={icons[discount.name]}
          note={discount.note}
        />
      ))}
    </div>
  );
};

const BannerItem = ({
  icon,
  description,
  note,
}: {
  icon: IconDefinition;
  description?: string;
  note?: string;
}) => (
  <div>
    <div>
      <FontAwesomeIcon icon={icon} /> {description}
    </div>
    {note && <div className="note">{`*${note}`}</div>}
  </div>
);

export default Banner;
