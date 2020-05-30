import React, { useState } from 'react';
import './Banner.css';

interface IProps {
  message: string;
}

const Banner = (props: IProps) => {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className={`banner ${dismissed && 'dismissed'}`}>
      {props.message}
      <div className="close" onClick={() => setDismissed(true)}>
        ✕
      </div>
    </div>
  );
};

export default Banner;
