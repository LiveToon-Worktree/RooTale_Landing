import React from 'react';
import './Loading.css';

const Loading = ({ fadeOut }) => {
  return (
    <div className={`loading-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Loading;
