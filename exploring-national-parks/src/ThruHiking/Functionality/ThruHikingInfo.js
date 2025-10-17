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
          difficulty: 'Very Difficult',
          bestSeason: 'April - October',
          permitsRequired: 'Yes - Long-distance permit required',
          url: 'https://www.pcta.org/',
          images: [
            { url: trailImages.PCT }
          ],
          activities: [
            { id: 1, name: 'Hiking' },
            { id: 2, name: 'Backpacking' },
            { id: 3, name: 'Wildlife Viewing' },
            { id: 4, name: 'Photography' }
          ],
          addresses: [
            {
              line1: 'Southern Terminus: Campo, CA',
              city: 'Campo',
              stateCode: 'CA'
            }
          ]
        },
        {
          id: 2,
          trailCode: 'AT',
          fullName: 'Appalachian Trail',
          states: 'Georgia, North Carolina, Tennessee, Virginia, West Virginia, Maryland, Pennsylvania, New Jersey, New York, Connecticut, Massachusetts, Vermont, New Hampshire, Maine',
          description: 'The Appalachian Trail is a 2,190-mile long public footpath that traverses the scenic, wooded, pastoral, wild, and culturally resonant lands of the Appalachian Mountains.',
          length: '2,190 miles',
          difficulty: 'Very Difficult',
          bestSeason: 'March - October',
          permitsRequired: 'Yes - Some sections require permits',
          url: 'https://www.appalachiantrail.org/',
          images: [
            { url: trailImages.AT }
          ],
          activities: [
            { id: 1, name: 'Hiking' },
            { id: 2, name: 'Backpacking' },
            { id: 3, name: 'Wildlife Viewing' },
            { id: 4, name: 'Photography' }
          ],
          addresses: [
            {
              line1: 'Southern Terminus: Springer Mountain, GA',
              city: 'Springer Mountain',
              stateCode: 'GA'
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
          difficulty: 'Extremely Difficult',
          bestSeason: 'May - September',
          permitsRequired: 'Yes - Multiple permits required',
          url: 'https://continentaldividetrail.org/',
          images: [
            { url: trailImages.CDT }
          ],
          activities: [
            { id: 1, name: 'Hiking' },
            { id: 2, name: 'Backpacking' },
            { id: 3, name: 'Wildlife Viewing' },
            { id: 4, name: 'Photography' }
          ],
          addresses: [
            {
              line1: 'Southern Terminus: Crazy Cook Monument, NM',
              city: 'Crazy Cook Monument',
              stateCode: 'NM'
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
