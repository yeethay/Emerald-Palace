import React, { useState, Dispatch, SetStateAction } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Banner.css';

interface IProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  message?: string;
  tooltipMessages?: string[];
}

const Banner = (props: IProps) => {
  const [tooltipHidden, setTooltipHidden] = useState(true);
  const { show, setShow, message, tooltipMessages } = props;

  const toggleTooltip = () => setTooltipHidden(!tooltipHidden);

  return message ? (
    <div className={`banner ${!show && 'dismissed'}`}>
      <div onMouseEnter={toggleTooltip} onMouseLeave={toggleTooltip}>
        <FontAwesomeIcon icon={faInfoCircle} />
        <div className={`tooltip ${tooltipHidden && 'hidden'}`}>
          {tooltipMessages?.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </div>
      </div>
      <div className="message">{message}</div>
      <div className="close" onClick={() => setShow(false)}>
        ✕
      </div>
    </div>
  ) : null;
};

export default Banner;
