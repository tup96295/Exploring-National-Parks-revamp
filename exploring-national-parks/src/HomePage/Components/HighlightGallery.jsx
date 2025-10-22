import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import defaultImage from '../../../src/parkImg-default.png';

/**
 * Renders a gallery of highlighted parks and a Twitter news feed.
 * @module HighlightGallery
 * @memberof HomePage
 * @returns {JSX.Element} The HighlightGallery component.
 */
const HighlightGallery = () => {
  const [highlightedParks, setHighlightedParks] = useState([]);

  useEffect(() => {
    async function fetchParks() {
      try {
        const url = `https://developer.nps.gov/api/v1/parks?api_key=Y7kFnm6SP5SMQhkTvwUSgyjge9buj4DbjrkuV2S0&limit=471`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Unable to fetch parks');
        const data = await response.json();
        const randomParks = getRandomParks(data.data, 20);
        setHighlightedParks(randomParks);
      } catch (error) {
        console.log('Error fetching parks:', error.message);
      }
    }

    fetchParks();
  }, []);

  // Load Twitter script for embedding the feed
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Reload Twitter embed if component updates
  useEffect(() => {
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, [highlightedParks]);

  const getRandomParks = (returnedParks, numParks) =>
    returnedParks.sort(() => 0.5 - Math.random()).slice(0, numParks);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
  };

  return (
    <div className="gallery">
      <h1 className="header">Check Out These Parks & News!</h1>

      <Slider {...sliderSettings} className="slider">
        {/* 🏞 Park slides */}
        {highlightedParks.map((park) => (
          <div key={park.id} className="slide">
            <h2>{park.fullName}</h2>
            {park.images && park.images.length > 0 && (
              <img
                src={park.images.length < 2 ? park.images[0].url : park.images[1].url}
                alt="slide-image"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
            )}
            <Link to={`/ParkInfo?parkCode=${park.parkCode}`}>
              <button className="more-info">Learn More</button>
            </Link>
          </div>
        ))}

        {/* 🐦 Twitter embed timeline */}
        <div className="slide twitter-slide">
          <h2>Latest from Temple University</h2>
          <blockquote
            className="twitter-timeline"
            data-theme="light"
            data-chrome="noheader nofooter noborders transparent"
            data-tweet-limit="1"
            data-height="200"
            href="https://twitter.com/templeuniv"
          >
            Tweets by Temple University
          </blockquote>
        </div>
      </Slider>
    </div>
  );
};

export default HighlightGallery;
