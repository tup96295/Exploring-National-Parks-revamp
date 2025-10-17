import React from 'react';
import ThruHikingComponent from './ThruHiking/Components/ThruHikingComponent.jsx';
import './Style/thruHiking.css';
/**
 * Renders the ThruHiking component page.
 * @component
 * @module ThruHiking
 * 
 * @returns {JSX.Element} The rendered ThruHiking component.
 */
function ThruHiking(){
    return(
        <div className="thru-hiking-parent">
            <ThruHikingComponent />
        </div>
    );
}

export default ThruHiking;
