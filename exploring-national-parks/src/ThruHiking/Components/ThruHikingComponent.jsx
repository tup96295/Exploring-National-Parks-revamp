/**
 * ThruHikingComponent is a React component that displays information about thru hiking trails.
 * It displays three major thru hiking trails: Pacific Crest Trail (PCT), Appalachian Trail (AT), and Continental Divide Trail (CDT).
 * @module ThruHikingComponent
 * @memberof ThruHiking
 * @returns {JSX.Element} The rendered ThruHikingComponent component.
 */
import React, { useState, useEffect } from 'react';
import { ThruHikingInfo } from '../Functionality/ThruHikingInfo';
import '../../Style/thruHiking.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchTrailImages } from '../Functionality/TrailImages.js';

function ThruHikingComponent() {
    const [trailsJSON, setTrails] = useState([]);
    const [trailGallery, setTrailGallery] = useState([]);
    
    var url = new URL(window.location);
    var trailCode = url.searchParams.get("trailCode");
    // var trailImageParam = url.searchParams.get("img");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                var json;
                if(trailCode == null)
                    json = await ThruHikingInfo('', 0);
                else
                    json = await ThruHikingInfo(trailCode, 0);
                console.log(json);
                setTrails(json.data);
            } catch (error) {
                console.error('Error fetching trail data:', error);
            }
        };

        fetchData();
    }, [trailCode]);

    useEffect(() => {
        const loadImages = async () => {
            try {
                if (trailCode) {
                    const selected = trailsJSON && trailsJSON.length === 1 ? trailsJSON[0] : null;
                    const trailName = selected ? selected.fullName : (trailCode === 'PCT' ? 'Pacific Crest Trail' : trailCode === 'AT' ? 'Appalachian Trail' : 'Continental Divide Trail');
                    const imgs = await fetchTrailImages(trailName, 12);
                    setTrailGallery(imgs);
                } else {
                    setTrailGallery([]);
                }
            } catch (e) {
                console.error('Error loading trail gallery:', e);
            }
        };
        loadImages();
    }, [trailCode, trailsJSON]);

    if(trailsJSON.length > 1){ //list all the trails
        return (
            <div className="top-padding-info">
                <div className='all-trails-info-welcome'>
                       <center>
                            <h1 id="trail-info-title">Thru Hiking Trails</h1>
                            <h2>Explore the Big Three Thru Hiking Trails!</h2>
                        </center>
                </div>
                <br></br>
                <div className = 'thruHiking'>
                    <div className="trails">
                        {trailsJSON?.map((trail) => (
                            <div key={trail.id} className="post-card">
                            <a className='trail-info-link' href={'ThruHiking?trailCode='+trail.trailCode+'&img='+encodeURIComponent(trail.images.length !== 0  ? trail.images[0].url : '')}>
                            <div>
                                <div className="learn-more-dropdown">
                                    <div>
                                        <p className="learn-more-name">{trail.fullName}</p>
                                        <p>{trail.states}</p>
                                    </div>
                                </div>
                                    <img src={trail.images.length !== 0  ? trail.images[0].url : ''} alt='' width='100' height='300'/>
                            </div>
                            <p className="description">{trail.description}</p>
                            </a>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    else{ //detail for one trail
        return (
            <div className='trail-info'>
                    {trailsJSON?.map((trail) => (
                        <>
                        <div key={trail.id} className="thruHiking">
                            <div className='trail-info-welcome'>
                                <center>
                                    <h1 id="info-title">{trail.fullName}</h1>
                                    <h2>Trail Information</h2>
                                    <address>
                                        {trail.addresses[0].line1}: {trail.addresses[0].city}, {trail.addresses[0].stateCode}<br></br>
                                        {trail.addresses[1] ? (
                                            <>
                                                {trail.addresses[1].line1}: {trail.addresses[1].city}, {trail.addresses[1].stateCode}
                                            </>
                                        ) : null}
                                        <br></br>
                                    </address>
                                    <br></br>
                                </center>
                            </div>

                            <br></br>

                            <center>
                                <div className='box-1'>
                                    <div className='trail-map'>
                                        {(() => {
                                            const mapUrl = trail.trailCode === 'PCT'
                                                ? 'https://www.plumaspinesresort.com/uploads/1/7/6/4/17642609/pct-map_orig.jpg'
                                                : (trail.trailCode === 'CDT'
                                                    ? 'https://cdn.shopify.com/s/files/1/0384/0233/files/cdt-map.jpg?v=1581264111'
                                                    : 'https://cdn.shopify.com/s/files/1/0705/6755/9463/files/314684-800x1082-appalachian-trail_480x480.webp?v=1694443315');
                                            return (
                                                <div className='square-frame'>
                                                    <img src={mapUrl} alt={trail.fullName + ' map'} />
                                                </div>
                                            );
                                        })()}
                                    </div>
                                    <div className='hours'>
                                        <h1>Trail Details:</h1>
                                        <ul className='hours-list'>
                                            <li>Length: {trail.length}</li>
                                            <li>Highest Point: {trail.highestPoint}</li>
                                            <li>Lowest Point: {trail.lowestPoint}</li>
                                            <li>Difficulty: {trail.difficulty}</li>
                                            <li>Best Season: {trail.bestSeason}</li>
                                        </ul>
                                        <br></br>
                                        <p>{trail.description}</p>
                                        <a href={trail.url} target="_blank" rel="noreferrer">For More Information</a>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <a href='./ThruHiking'><button className="trail-info-button">Return To Trails</button></a>
                                        <br></br>
                                        {trailGallery && trailGallery.length > 0 ? (
                                            <div className='trail-gallery'>
                                                <h2>Trail Photos</h2>
                                                <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} autoplay={true} autoplaySpeed={3000}>
                                                    {trailGallery.map((img, idx) => (
                                                        <div key={idx} className='trail-gallery-slide'>
                                                            <div className='square-frame'>
                                                                <img src={img} alt={'trail-gallery-'+idx} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </Slider>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </center>

                            <br></br>
                            
                            <div className='activities-list'>
                                {trail.activities?.map((activity) =>(<>
                                <div className='activity'><p key={activity.id}>{activity.name}</p></div></>))}
                            </div>
                        </div>
                        </>
                    ))}
            </div>
        );
    }
}

export default ThruHikingComponent;
