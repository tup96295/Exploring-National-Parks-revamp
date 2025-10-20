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
    // Unsplash API endpoint
    const accessKey = 'G3N6GQS9CG18fSyF1QKDULKQlPfnatF1Evd79zgSBF4';
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
 * Fetches multiple trail images from Unsplash in a single request
 * @param {string} trailName - The name of the trail to search for images.
 * @param {number} maxImages - Maximum number of images to return.
 * @returns {Promise<string[]>} - A promise that resolves to an array of image URLs.
 */
export const fetchTrailImages = async (trailName, maxImages = 12) => {
  try {
    const accessKey = 'G3N6GQS9CG18fSyF1QKDULKQlPfnatF1Evd79zgSBF4';
    const query = encodeURIComponent(trailName);
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=${accessKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      return getFallbackImages(trailName, maxImages);
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const images = data.results.map(item => item.urls && (item.urls.regular || item.urls.small)).filter(Boolean);
      return images.slice(0, maxImages);
    }
    return getFallbackImages(trailName, maxImages);
  } catch (error) {
    console.error('Error fetching trail images:', error);
    return getFallbackImages(trailName, maxImages);
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
 * Provides multiple fallback images when API calls fail
 * @param {string} trailName - The name of the trail
 * @param {number} maxImages - Max number of images to return
 * @returns {string[]} - Array of fallback image URLs
 */
const getFallbackImages = (trailName, maxImages) => {
  const images = [
    getFallbackImage(trailName),
    'https://images.unsplash.com/photo-1526481280698-8fcc13fd78a1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&h=600&fit=crop'
  ];
  return images.slice(0, Math.max(1, Math.min(maxImages, images.length)));
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
