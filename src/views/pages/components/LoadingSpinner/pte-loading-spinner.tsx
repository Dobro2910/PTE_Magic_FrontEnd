import './pte-loading-spinner.scss';
import React from 'react';

export const PteLoadingSpinner = () => (
  // <div className="loadingSpiner pte-margin-bottom-10 text-center">
  //   <div className="loadingSpinerView">
  //     <div className="cm-spinner" />
  //   </div>
  // </div>

    <div className="background-loading-yellow-spinner">
        <div className="boxes">
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
);
