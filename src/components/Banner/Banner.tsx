import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faMoneyBillAlt,
  faCreditCard,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import './Banner.css';
import { IDiscountWithNote } from '../../types/types';

interface IProps {
  className?: string;
  delivery?: string;
  cash?: string | IDiscountWithNote;
  card?: string | IDiscountWithNote;
}

const Banner = (props: IProps) => {
  const { className, delivery, cash, card } = props;

  return (
    <div className={`banner ${className}`}>
      <BannerItem description={delivery} icon={faCar} />
      <BannerItem
        description={
          typeof cash === 'string'
            ? cash
            : (cash as IDiscountWithNote)?.description
        }
        note={
          typeof cash === 'string'
            ? undefined
            : (cash as IDiscountWithNote)?.note
        }
        icon={faMoneyBillAlt}
      />
      <BannerItem
        description={
          typeof card === 'string'
            ? card
            : (card as IDiscountWithNote)?.description
        }
        note={
          typeof card === 'string'
            ? undefined
            : (card as IDiscountWithNote)?.note
        }
        icon={faCreditCard}
      />
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
