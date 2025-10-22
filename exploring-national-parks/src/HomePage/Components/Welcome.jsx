import React from 'react'

/**
 * Component representing the welcome section of the homepage.
 * @module Welcome
 * @memberof HomePage
 * @returns {JSX.Element} The rendered welcome section.
 */
const Welcome = () => {
    return (
        <div className = "welcome">
            <h1 className = "welcome-title">Explore National Parks</h1>
            <p className = "welcome-text">
                Welcome to Exploring National Parks! This web app is designed to help you find the perfect national park for your next trip. 
                Click on the "Park Search" button to search for a park by activity, click on the "Plan A Trip" button to plan a trip to a park you've already selected, 
                or click on the "Thru Hiking" button to plan a thru hiking trip along one of the three famous long-distance trails.
            </p>
            <div>

            </div>
        </div>
    )
}

export default Welcome