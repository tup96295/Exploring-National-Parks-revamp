/**
 * Fetches random trail images from Unsplash API for thru hiking trails.
 * @async
 * @function fetchTrailImage
 * @param {string} trailName - The name of the trail to search for images.
 * @returns {Promise<string>} - A promise that resolves to a random image URL.
 * @throws {Error} - If an error occurs during the fetch process.
 */

// TrailImages.js - fetch random images for trails

export const fetchTrailImage = async (trailName) => {
  try {
    // Unsplash API endpoint (using demo access key - in production you'd want your own)
    const accessKey = 'demo'; // This is a demo key, replace with your own Unsplash access key
    const query = encodeURIComponent(trailName);
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=${accessKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      // If Unsplash API fails, fall back to a curated list of images
      return getFallbackImage(trailName);
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      // Get a random image from the results
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const imageUrl = data.results[randomIndex].urls.regular;
      return imageUrl;
    } else {
      return getFallbackImage(trailName);
    }
  } catch (error) {
    console.error('Error fetching trail image:', error);
    return getFallbackImage(trailName);
  }
};

/**
 * Provides fallback images when API calls fail
 * @param {string} trailName - The name of the trail
 * @returns {string} - A fallback image URL
 */
const getFallbackImage = (trailName) => {
  const fallbackImages = {
    'Pacific Crest Trail': [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759844-d150baecf5b1?w=800&h=600&fit=crop'
    ],
    'Appalachian Trail': [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759844-d150baecf5b1?w=800&h=600&fit=crop'
    ],
    'Continental Divide Trail': [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1464822759844-d150baecf5b1?w=800&h=600&fit=crop'
    ]
  };
  
  const images = fallbackImages[trailName] || fallbackImages['Pacific Crest Trail'];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

/**
 * Fetches random images for all three major trails
 * @returns {Promise<Object>} - Object with trail codes as keys and image URLs as values
 */
export const fetchAllTrailImages = async () => {
  const trails = [
    { code: 'PCT', name: 'Pacific Crest Trail' },
    { code: 'AT', name: 'Appalachian Trail' },
    { code: 'CDT', name: 'Continental Divide Trail' }
  ];
  
  const imagePromises = trails.map(async (trail) => {
    const imageUrl = await fetchTrailImage(trail.name);
    return { code: trail.code, imageUrl };
  });
  
  const results = await Promise.all(imagePromises);
  
  // Convert array to object for easy lookup
  const imageMap = {};
  results.forEach(result => {
    imageMap[result.code] = result.imageUrl;
  });
  
  return imageMap;
};
