import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import './Loading.css';

const Loading = () => (
  <div className="loading">
    <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" size="5x" />
  </div>
);

export default Loading;
