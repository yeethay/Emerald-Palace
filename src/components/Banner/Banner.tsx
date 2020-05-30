import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import './Banner.css';

interface IProps {
  message: string;
  tooltipMessages: string[];
}

const Banner = (props: IProps) => {
  const [dismissed, setDismissed] = useState(false);
  const [tooltipHidden, setTooltipHidden] = useState(true);

  return (
    <div className={`banner ${dismissed && 'dismissed'}`}>
      <div
        onMouseEnter={() => setTooltipHidden(false)}
        onMouseLeave={() => setTooltipHidden(true)}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        <div className={`tooltip ${tooltipHidden && 'hidden'}`}>
          {props.tooltipMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </div>
      </div>
      <div className="message">{props.message}</div>
      <div className="close" onClick={() => setDismissed(true)}>
        ✕
      </div>
    </div>
  );
};

export default Banner;
