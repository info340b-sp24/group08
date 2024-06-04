import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon from react-icons library

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <FaSpinner className="spinner" />
      <span className="loading-text">Loading...</span>
    </div>
  );
}

export default LoadingSpinner;
