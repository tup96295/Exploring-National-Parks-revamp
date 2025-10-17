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

function ThruHikingComponent() {
    const [trailsJSON, setTrails] = useState([]);
    
    var url = new URL(window.location);
    var trailCode = url.searchParams.get("trailCode");
    
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
                            <a className='trail-info-link' href={'ThruHiking?trailCode='+trail.trailCode}>
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
                        <div key={trail.id} className="thruHiking" style={{ backgroundImage: 'url(' + trail.images[0].url + ')', backgroundSize: 'auto' }}>
                            <div className='trail-info-welcome'>
                                <center>
                                    <h1 id="info-title">{trail.fullName}</h1>
                                    <h2>Trail Information</h2>
                                    <address>{trail.addresses[0].line1}<br></br>
                                        {trail.addresses[0].city}, 
                                        {trail.addresses[0].stateCode}<br></br>
                                    </address>
                                    <br></br>
                                </center>
                            </div>

                            <br></br>

                            <center>
                                <div className='box-1'>
                                    <div className='hours'>
                                        <h1>Trail Details:</h1>
                                        <ul className='hours-list'>
                                            <li>Length: {trail.length}</li>
                                            <li>Difficulty: {trail.difficulty}</li>
                                            <li>Best Season: {trail.bestSeason}</li>
                                            <li>Permits Required: {trail.permitsRequired}</li>
                                        </ul>
                                        <br></br>
                                        <p>{trail.description}</p>
                                        <a href={trail.url} target="_blank" rel="noreferrer">For More Information</a>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <a href='./ThruHiking'><button className="trail-info-button">Return To Trails</button></a>
                                        <a href={'./ParkPlan?trailCode='+trail.trailCode}><button className="trail-info-button">Plan A Trip</button></a>
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
