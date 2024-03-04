import React from 'react'
import './spinner.css'

const SpinnerLoading = () => {
    return (
      <div>
        <p className="loading-par">Loading...</p>
        <div id="loading-bar-spinner" className="spinner">
          <div className="spinner-icon"></div>
        </div>
      </div>
    );
}

export default SpinnerLoading