/**
 * Fetches thru hiking trail information from a local data source.
 * Returns information about the three major thru hiking trails: PCT, AT, and CDT.
 * @async
 * @function ThruHikingInfo
 * @param {string} trailCode - The code of the trail to fetch information for.
 * @param {number} page - The page number of the results to fetch (not used for trails).
 * @returns {Promise<Object>} - A promise that resolves to the trail information as an object.
 * @throws {Error} - If an error occurs during the process.
 */

// ThruHikingInfo.js, fetch the list of trails and return info
import { fetchAllTrailImages } from './TrailImages.js';

export const ThruHikingInfo = async (trailCode, page) => {
  try {
    await trailCode;
    await page;
    
    // Fetch random images for all trails
    const trailImages = await fetchAllTrailImages();
    
    // Static data for the three major thru hiking trails
    const trailsData = {
      data: [
        {
          id: 1,
          trailCode: 'PCT',
          fullName: 'Pacific Crest Trail',
          states: 'California, Oregon, Washington',
          description: 'The Pacific Crest Trail spans 2,650 miles from Mexico to Canada through California, Oregon, and Washington. It traverses some of the most spectacular and diverse terrain in the United States.',
          length: '2,650 miles',
          highestPoint: 'Forester Pass, 13,153 feet',
          lowestPoint: 'Cascade Locks, 140 feet',
          difficulty: 'Very Difficult',
          bestSeason: 'April - October',
          url: 'https://www.pcta.org/',
          images: [
            { url: trailImages.PCT }
          ],
          activities: [
            { id: 1, name: 'Hiking' },
            { id: 2, name: 'Backpacking' },
            { id: 3, name: 'Wildlife Viewing' },
            { id: 4, name: 'Photography' },
            { id: 5, name: 'Sierra Snow Travel' }
          ],
          addresses: [
            {
              line1: 'Southern Terminus',
              city: 'Campo',
              stateCode: 'CA'
            },
            {
              line1: 'Northern Terminus',
              city: 'Manning Park',
              stateCode: 'BC'
            }
          ]
        },
        {
          id: 2,
          trailCode: 'AT',
          fullName: 'Appalachian Trail',
          states: 'Georgia, North Carolina, Tennessee, Virginia, West Virginia, Maryland, Pennsylvania, New Jersey, New York, Connecticut, Massachusetts, Vermont, New Hampshire, Maine',
          description: 'The Appalachian Trail is a 2,190-mile long public footpath that traverses the mountains, forests, and rivers of the Eastern United States.',
          length: '2,190 miles',
          highestPoint: 'Kuwohi, 6,643 feet',
          lowestPoint: 'Bear Mountain State Park, 124 feet',
          difficulty: 'Difficult',
          bestSeason: 'March - October',
          url: 'https://www.appalachiantrail.org/',
          images: [
            { url: trailImages.AT }
          ],
          activities: [
            { id: 1, name: 'Hiking' },
            { id: 2, name: 'Backpacking' },
            { id: 3, name: 'Wildlife Viewing' },
            { id: 4, name: 'Photography' },
          ],
          addresses: [
            {
              line1: 'Southern Terminus',
              city: 'Springer Mountain',
              stateCode: 'GA'
            },
            {
              line1: 'Northern Terminus',
              city: 'Mount Katahdin',
              stateCode: 'ME'
            }
          ]
        },
        {
          id: 3,
          trailCode: 'CDT',
          fullName: 'Continental Divide Trail',
          states: 'New Mexico, Colorado, Wyoming, Idaho, Montana',
          description: 'The Continental Divide Trail is a 3,100-mile long trail that follows the Continental Divide of the Americas along the Rocky Mountains. It is the highest, most challenging, and most remote of the three major long-distance trails.',
          length: '3,100 miles',
          highestPoint: 'Grays Peak, 14,278 feet',
          lowestPoint: 'Lordsburg, 4,189 feet',
          difficulty: 'Extremely Difficult',
          bestSeason: 'May - September',
          url: 'https://continentaldividetrail.org/',
          images: [
            { url: trailImages.CDT }
          ],
          activities: [
            { id: 1, name: 'Hiking' },
            { id: 2, name: 'Backpacking' },
            { id: 3, name: 'Wildlife Viewing' },
            { id: 4, name: 'Photography' },
            { id: 5, name: 'High-Altitude Trekking' }
          ],
          addresses: [
            {
              line1: 'Southern Terminus',
              city: 'Crazy Cook Monument',
              stateCode: 'NM'
            },
            {
              line1: 'Northern Terminus',
              city: 'Chief Mountain',
              stateCode: 'MT'
            }
          ]
        }
      ]
    };

    // If a specific trail code is requested, filter the data
    if (trailCode && trailCode !== '') {
      const filteredTrail = trailsData.data.find(trail => trail.trailCode === trailCode);
      if (filteredTrail) {
        return { data: [filteredTrail] };
      }
    }

    return trailsData;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
